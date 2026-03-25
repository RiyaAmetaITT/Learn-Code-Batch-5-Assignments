export type StepConfig = Record<string, unknown>;

export type ConditionDefinition =
    | { kind: "always" }
    | { kind: "input_contains"; substring: string }
    | { kind: "data_equals"; key: string; expected: unknown }
    | { kind: "data_truthy"; key: string };

export type RetryPolicy = {
    maxAttempts: number;
    retryOnAllErrors?: boolean;
};

export type StepDefinition = {
    name: string;
    type: string;
    config?: StepConfig;
    when?: ConditionDefinition;
    retry?: RetryPolicy;
    fallback?: StepDefinition;
};

export type WorkflowDefinition = {
    id: string;
    steps: StepDefinition[];
};

export type TraceEventType =
    | "workflow_start"
    | "workflow_end"
    | "step_skipped"
    | "step_start"
    | "step_success"
    | "step_failed"
    | "step_fallback_start"
    | "step_fallback_success"
    | "step_fallback_failed";

export type TraceEvent = {
    type: TraceEventType;
    atMs: number;
    workflowId: string;
    stepName?: string;
    attempt?: number;
    errorMessage?: string;
};

export type EngineRunResult = {
    output: string;
    trace: TraceEvent[];
};

export interface WorkflowContext {
    input: string;
    current: string;
    data: Record<string, unknown>;
}
