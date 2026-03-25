import type { StepConfig, WorkflowContext } from "../types";
import type { StepExecutor } from "../registry";

export class SummarizeStep implements StepExecutor {
    async execute(input: string, _ctx: WorkflowContext, config: StepConfig): Promise<string> {
        const maxChars = (config.maxChars as number | undefined) ?? 60;
        const trimmed = input.length > maxChars ? input.slice(0, maxChars) + "..." : input;
        return `Summary: ${trimmed}`;
    }
}
