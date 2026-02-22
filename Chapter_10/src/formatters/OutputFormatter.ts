import type { Record } from "../models/types";

export interface OutputFormatter {
    format(records: Record[]): string;
}
