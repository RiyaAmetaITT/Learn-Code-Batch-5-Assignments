import type { TraceEvent } from "../types";

export type TraceEventInput = Omit<TraceEvent, "atMs">;

export class TraceRecorder {
    private readonly trace: TraceEvent[];

    constructor(trace: TraceEvent[]) {
        this.trace = trace;
    }

    record(event: TraceEventInput): void {
        this.trace.push({ ...event, atMs: Date.now() });
    }
}

