import type { Record } from "../models/types";
import type { OutputFormatter } from "./OutputFormatter";

export class JsonFormatter implements OutputFormatter {
    format(records: Record[]): string {
        return JSON.stringify(records, null, 2);
    }
}
