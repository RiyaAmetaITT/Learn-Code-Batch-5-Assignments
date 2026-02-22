import type { Record } from "../models/types";
import { Logger } from "../services/Logger";

export class DataFilter {
    private _logger: Logger;

    constructor(logger: Logger) {
        this._logger = logger;
    }

    filterByValue(records: Record[], minValue: number): Record[] {
        const filtered: Record[] = [];
        for (const record of records) {
            if (record["value"] && Number(record["value"]) >= minValue) {
                filtered.push(record);
            }
        }
        this._logger.log(`Filtered ${filtered.length} records with value >= ${minValue}`);
        return filtered;
    }
}
