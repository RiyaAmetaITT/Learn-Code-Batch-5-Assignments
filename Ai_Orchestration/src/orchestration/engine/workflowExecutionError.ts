import type { TraceEvent } from "../types";

export class WorkflowExecutionError extends Error {
  public readonly trace: TraceEvent[];
  public readonly cause: unknown;

  constructor(params: {
    workflowId: string;
    message: string;
    cause: unknown;
    trace: TraceEvent[];
  }) {
    super(params.message);
    this.name = "WorkflowExecutionError";
    this.cause = params.cause;
    this.trace = params.trace;
  }
}
