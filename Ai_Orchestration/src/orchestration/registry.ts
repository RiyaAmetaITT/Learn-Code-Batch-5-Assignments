import type { StepConfig, WorkflowContext } from "./types";

export interface StepExecutor {
  execute(
    input: string,
    ctx: WorkflowContext,
    config: StepConfig,
  ): Promise<string>;
}

export type StepExecutorFactory = () => StepExecutor;

export class StepRegistry {
  private readonly factories = new Map<string, StepExecutorFactory>();

  register(type: string, factory: StepExecutorFactory): void {
    if (!type) throw new Error("StepRegistry.register: type is required");
    this.factories.set(type, factory);
  }

  get(type: string): StepExecutor {
    const factory = this.factories.get(type);
    if (!factory) throw new Error(`Unknown step type: ${type}`);
    return factory();
  }
}
