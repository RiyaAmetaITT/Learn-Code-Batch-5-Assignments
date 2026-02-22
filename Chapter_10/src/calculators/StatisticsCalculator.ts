import type { Record } from "../models/types";

export class StatisticsCalculator {
    calculate(records: Record[], errorCount: number): { [key: string]: number } {
        let totalValue = 0;
        for (const record of records) {
            if (record["value"]) {
                totalValue += Number(record["value"]);
            }
        }
        const count = records.length;
        return {
            total_records: count,
            error_count: errorCount,
            total_value: Math.floor(totalValue),
            average_value: count > 0 ? Math.floor(totalValue / count) : 0
        };
    }
}
