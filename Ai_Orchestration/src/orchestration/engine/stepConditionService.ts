import { ConditionEvaluator } from "../conditions";
import type { StepDefinition, WorkflowContext } from "../types";

export class StepConditionService {
    private readonly conditionEvaluator: ConditionEvaluator;

    constructor(deps?: { conditionEvaluator?: ConditionEvaluator }) {
        this.conditionEvaluator = deps?.conditionEvaluator ?? new ConditionEvaluator();
    }

    shouldSkip(stepDef: StepDefinition, ctx: WorkflowContext): boolean {
        if (!stepDef.when) return false;
        return !this.conditionEvaluator.evaluate(stepDef.when, ctx);
    }
}

