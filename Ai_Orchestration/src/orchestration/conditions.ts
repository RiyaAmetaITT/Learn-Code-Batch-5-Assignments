import type { ConditionDefinition, WorkflowContext } from "./types";

export class ConditionEvaluator {
  evaluate(condition: ConditionDefinition, ctx: WorkflowContext): boolean {
    switch (condition.kind) {
      case "always":
        return true;
      case "input_contains":
        return ctx.current.includes(condition.substring);
      case "data_equals":
        return ctx.data[condition.key] === condition.expected;
      case "data_truthy":
        return Boolean(ctx.data[condition.key]);
      default: {
        const _exhaustive: never = condition;
        return _exhaustive;
      }
    }
  }
}
