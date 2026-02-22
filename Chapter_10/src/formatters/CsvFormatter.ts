import type { Record } from "../models/types";
import type { OutputFormatter } from "./OutputFormatter";

export class CsvFormatter implements OutputFormatter {
    private static readonly CSV_HEADER = "ID,NAME,VALUE,DATE,DOUBLED_VALUE,SQUARED_VALUE";

    format(records: Record[]): string {
        const lines = [CsvFormatter.CSV_HEADER];
        for (const record of records) {
            lines.push(this.formatRecord(record));
        }
        return lines.join("\n");
    }

    private formatRecord(record: Record): string {
        return `${record["id"]},${record["name"]},${record["value"]},${record["date"]},${record["doubled_value"]},${record["squared_value"]}`;
    }
}
