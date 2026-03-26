import type { StepConfig, WorkflowContext } from "../types";
import type { StepExecutor } from "../registry";

export class RefineToneStep implements StepExecutor {
  async execute(
    input: string,
    _ctx: WorkflowContext,
    config: StepConfig,
  ): Promise<string> {
    const tone = (config.tone as string | undefined) ?? "friendly";
    return `Tone(${tone}): ${input}`;
  }
}
