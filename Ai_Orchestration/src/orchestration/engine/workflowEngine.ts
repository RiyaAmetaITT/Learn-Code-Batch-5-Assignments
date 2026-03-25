import type { Logger } from "../../observability/logger";
import { ConsoleLogger } from "../../observability/logger";
import type { EngineRunResult, TraceEvent, WorkflowContext, WorkflowDefinition } from "../types";
import { WorkflowExecutionError } from "./workflowExecutionError";
import type { StepRegistry } from "../registry";
import { TraceRecorder } from "./traceRecorder";
import { StepRunner } from "./stepRunner";

type EngineDeps = {
    registry: StepRegistry;
    logger?: Logger;
};

export class WorkflowEngine {
    private readonly registry: StepRegistry;
    private readonly logger: Logger;

    constructor(deps: EngineDeps) {
        this.registry = deps.registry;
        this.logger = deps.logger ?? new ConsoleLogger();
    }

    async run(workflow: WorkflowDefinition, input: string): Promise<EngineRunResult> {
        const trace: TraceEvent[] = [];
        const traceRecorder = new TraceRecorder(trace);
        const ctx: WorkflowContext = { input, current: input, data: {} };

        traceRecorder.record({ type: "workflow_start", workflowId: workflow.id });
        this.logger.info("Workflow started", { workflowId: workflow.id });

        const stepRunner = new StepRunner({
            registry: this.registry,
            logger: this.logger,
            traceRecorder,
        });

        try {
            for (const stepDef of workflow.steps) {
                ctx.current = await stepRunner.executeStep(workflow, stepDef, ctx, 0);
            }
        } catch (err) {
            const message = err instanceof Error ? err.message : String(err);
            this.logger.error("Workflow failed", { workflowId: workflow.id, error: message });
            throw new WorkflowExecutionError({
                workflowId: workflow.id,
                message: `Workflow "${workflow.id}" failed: ${message}`,
                cause: err,
                trace,
            });
        } finally {
            traceRecorder.record({ type: "workflow_end", workflowId: workflow.id });
        }

        this.logger.info("Workflow finished", { workflowId: workflow.id });
        return { output: ctx.current, trace };
    }
}
