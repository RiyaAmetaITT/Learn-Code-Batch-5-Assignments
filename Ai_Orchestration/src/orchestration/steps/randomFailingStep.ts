import type { StepConfig, WorkflowContext } from "../types";
import type { StepExecutor } from "../registry";

function readFailRate(config: StepConfig): number {
    const failRate = config.failRate;
    return typeof failRate === "number" ? failRate : 0.5;
}

function shouldFail(failRate: number): boolean {
    if (failRate >= 1) return true;
    if (failRate <= 0) return false;
    return Math.random() < failRate;
}

export class RandomFailingStep implements StepExecutor {
    async execute(input: string, _ctx: WorkflowContext, config: StepConfig): Promise<string> {
        const failRate = readFailRate(config);
        if (shouldFail(failRate)) {
            throw new Error("Simulated transient model failure");
        }
        return `Succeeded after possible retries. Output: ${input}`;
    }
}
