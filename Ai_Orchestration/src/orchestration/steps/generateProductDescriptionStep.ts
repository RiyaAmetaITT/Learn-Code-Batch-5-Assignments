import type { StepConfig, WorkflowContext } from "../types";
import type { StepExecutor } from "../registry";

export class GenerateProductDescriptionStep implements StepExecutor {
    async execute(input: string, _ctx: WorkflowContext, config: StepConfig): Promise<string> {
        const productName = (config.productName as string | undefined) ?? "Product";
        return `Product: ${productName}. Description based on: ${input}`;
    }
}
