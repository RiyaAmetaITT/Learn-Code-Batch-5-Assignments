import type { Record } from "../models/types";

export class DataParser {
    parse(lines: string[]): { records: Record[]; errors: { message: string }[] } {
        const records: Record[] = [];
        const errors: { message: string }[] = [];

        for (const line of lines) {
            if (!line.trim()) continue;

            const parts = line.split(",");
            if (parts.length >= 3) {
                const record: Record = {
                    id: parts[0].trim(),
                    name: parts[1].trim(),
                    value: parts[2].trim()
                };
                if (parts.length >= 4) {
                    record["date"] = parts[3].trim();
                }
                records.push(record);
            } else {
                errors.push({ message: `Invalid line format: ${line}` });
            }
        }
        return { records, errors };
    }
}
