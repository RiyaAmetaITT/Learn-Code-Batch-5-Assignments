import type { Logger } from "../../observability/logger";
import { ConsoleLogger } from "../../observability/logger";
import type { ConditionEvaluator } from "../conditions";
import { StepConditionService } from "./stepConditionService";
import type {
  StepDefinition,
  TraceEvent,
  WorkflowContext,
  WorkflowDefinition,
} from "../types";
import { TraceRecorder } from "./traceRecorder";
import type { StepRegistry } from "../registry";
import type { StepExecutor } from "../registry";
import { RetryPolicyService } from "./retryPolicyService";

type StepRunnerDeps = {
  registry: StepRegistry;
  logger?: Logger;
  traceRecorder: TraceRecorder;
  conditionEvaluator?: ConditionEvaluator;
  retryPolicyService?: RetryPolicyService;
  fallbackMaxRecursionDepth?: number;
};

export class StepRunner {
  private readonly registry: StepRegistry;
  private readonly logger: Logger;
  private readonly traceRecorder: TraceRecorder;
  private readonly stepConditionService: StepConditionService;
  private readonly retryPolicyService: RetryPolicyService;
  private readonly fallbackMaxRecursionDepth: number;

  constructor(deps: StepRunnerDeps) {
    this.registry = deps.registry;
    this.logger = deps.logger ?? new ConsoleLogger();
    this.traceRecorder = deps.traceRecorder;
    this.stepConditionService = new StepConditionService({
      conditionEvaluator: deps.conditionEvaluator,
    });
    this.retryPolicyService =
      deps.retryPolicyService ?? new RetryPolicyService();
    this.fallbackMaxRecursionDepth = deps.fallbackMaxRecursionDepth ?? 3;
  }

  async executeStep(
    workflow: WorkflowDefinition,
    stepDef: StepDefinition,
    ctx: WorkflowContext,
    recursionDepth: number,
  ): Promise<string> {
    if (this.shouldSkipStep(workflow, stepDef, ctx)) {
      return ctx.current;
    }

    const result = await this.executeWithRetry(workflow, stepDef, ctx);

    if (result.success) {
      return result.output;
    }

    return this.handleStepFailure(
      workflow,
      stepDef,
      ctx,
      recursionDepth,
      result.error,
    );
  }

  private shouldSkipStep(
    workflow: WorkflowDefinition,
    stepDef: StepDefinition,
    ctx: WorkflowContext,
  ): boolean {
    if (this.stepConditionService.shouldSkip(stepDef, ctx)) {
      this.traceRecorder.record({
        type: "step_skipped",
        workflowId: workflow.id,
        stepName: stepDef.name,
      });
      this.logger.info("Step skipped", {
        workflowId: workflow.id,
        step: stepDef.name,
      });
      return true;
    }
    return false;
  }

  private async executeWithRetry(
    workflow: WorkflowDefinition,
    stepDef: StepDefinition,
    ctx: WorkflowContext,
  ): Promise<
    { success: true; output: string } | { success: false; error: Error }
  > {
    const maxAttempts = this.retryPolicyService.getMaxAttempts(stepDef);
    const canRetry = this.retryPolicyService.shouldRetry(stepDef);

    let lastError: Error | undefined;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        const output = await this.executeSingleAttempt(
          workflow,
          stepDef,
          ctx,
          attempt,
        );
        return { success: true, output };
      } catch (err) {
        lastError = err instanceof Error ? err : new Error(String(err));
        if (!canRetry) break;
      }
    }

    return { success: false, error: lastError! };
  }

  private async executeSingleAttempt(
    workflow: WorkflowDefinition,
    stepDef: StepDefinition,
    ctx: WorkflowContext,
    attempt: number,
  ): Promise<string> {
    this.traceRecorder.record({
      type: "step_start",
      workflowId: workflow.id,
      stepName: stepDef.name,
      attempt,
    });
    this.logger.info("Step started", {
      workflowId: workflow.id,
      step: stepDef.name,
      attempt,
    });

    try {
      const executor = this.registry.get(stepDef.type) as StepExecutor;
      const output = await executor.execute(
        ctx.current,
        ctx,
        stepDef.config ?? {},
      );

      ctx.current = output;
      this.traceRecorder.record({
        type: "step_success",
        workflowId: workflow.id,
        stepName: stepDef.name,
        attempt,
      });
      this.logger.info("Step success", {
        workflowId: workflow.id,
        step: stepDef.name,
        attempt,
      });
      return output;
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);

      this.traceRecorder.record({
        type: "step_failed",
        workflowId: workflow.id,
        stepName: stepDef.name,
        attempt,
        errorMessage: message,
      });
      this.logger.warn("Step failed", {
        workflowId: workflow.id,
        step: stepDef.name,
        attempt,
        error: message,
      });

      throw err;
    }
  }

  private async handleStepFailure(
    workflow: WorkflowDefinition,
    stepDef: StepDefinition,
    ctx: WorkflowContext,
    recursionDepth: number,
    error: Error,
  ): Promise<string> {
    if (!stepDef.fallback) {
      throw error;
    }

    return this.executeFallback(workflow, stepDef, ctx, recursionDepth, error);
  }

  private async executeFallback(
    workflow: WorkflowDefinition,
    stepDef: StepDefinition,
    ctx: WorkflowContext,
    recursionDepth: number,
    lastError: unknown,
  ): Promise<string> {
    if (recursionDepth > this.fallbackMaxRecursionDepth) {
      const lastMessage =
        lastError instanceof Error ? lastError.message : String(lastError);
      throw new Error(
        `Fallback recursion exceeded for step "${stepDef.name}". Last error: ${lastMessage}`,
      );
    }

    this.traceRecorder.record({
      type: "step_fallback_start",
      workflowId: workflow.id,
      stepName: stepDef.name,
    });
    this.logger.warn("Executing fallback step", {
      workflowId: workflow.id,
      step: stepDef.name,
    });

    try {
      const output = await this.executeStep(
        workflow,
        stepDef.fallback!,
        ctx,
        recursionDepth + 1,
      );
      this.traceRecorder.record({
        type: "step_fallback_success",
        workflowId: workflow.id,
        stepName: stepDef.name,
      });
      this.logger.info("Fallback step success", {
        workflowId: workflow.id,
        step: stepDef.name,
      });
      return output;
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      this.traceRecorder.record({
        type: "step_fallback_failed",
        workflowId: workflow.id,
        stepName: stepDef.name,
        errorMessage: message,
      });
      this.logger.error("Fallback step failed", {
        workflowId: workflow.id,
        step: stepDef.name,
        error: message,
      });
      throw err;
    }
  }
}
