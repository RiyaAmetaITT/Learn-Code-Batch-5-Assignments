import type { StepConfig, WorkflowContext } from "../types";
import type { StepExecutor } from "../registry";

export class EnrichWithContextStep implements StepExecutor {
    async execute(input: string, ctx: WorkflowContext, config: StepConfig): Promise<string> {
        const contextKey = (config.contextKey as string | undefined) ?? "enrichment";
        ctx.data[contextKey] = `Extra context derived from: ${input}`;
        return `${input}\n[Context: ${ctx.data[contextKey]}]`;
    }
}
