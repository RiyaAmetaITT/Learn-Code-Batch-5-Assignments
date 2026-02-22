import type { Record } from "../models/types";

export class DataValidator {
    validate(records: Record[]): { valid: Record[]; errors: { message: string }[] } {
        const valid: Record[] = [];
        const errors: { message: string }[] = [];

        for (const record of records) {
            const recordErrors = this.validateRecord(record);
            if (recordErrors.length === 0) {
                valid.push(record);
            } else {
                errors.push(...recordErrors);
            }
        }
        return { valid, errors };
    }

    private validateRecord(record: Record): { message: string }[] {
        const errors: { message: string }[] = [];

        if (!record["id"]) {
            errors.push({ message: "Record missing ID" });
        }
        if (!record["name"]) {
            errors.push({ message: `Record ${record["id"]} missing name` });
        }
        if (record["value"] && isNaN(Number(record["value"]))) {
            errors.push({ message: `Record ${record["id"]} has invalid value` });
        }
        return errors;
    }
}
