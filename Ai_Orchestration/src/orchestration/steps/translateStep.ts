import type { StepConfig, WorkflowContext } from "../types";
import type { StepExecutor } from "../registry";

export class TranslateStep implements StepExecutor {
    async execute(input: string, _ctx: WorkflowContext, config: StepConfig): Promise<string> {
        const language = (config.language as string | undefined) ?? "Spanish";
        return `Translated(${language}): ${input}`;
    }
}
