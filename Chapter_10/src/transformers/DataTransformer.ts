import type { Record } from "../models/types";

export class DataTransformer {
    transform(records: Record[]): Record[] {
        return records.map((record) => this.transformRecord(record));
    }

    private transformRecord(record: Record): Record {
        const transformed = { ...record };

        if (transformed["name"]) {
            transformed["name"] = transformed["name"].toUpperCase();
        }
        if (transformed["date"]) {
            const date = new Date(transformed["date"]);
            if (!isNaN(date.getTime())) {
                transformed["date"] = date.toISOString().split("T")[0];
            }
        }
        if (transformed["value"]) {
            const value = Number(transformed["value"]);
            transformed["doubled_value"] = value * 2;
            transformed["squared_value"] = value * value;
        }
        return transformed;
    }
}
