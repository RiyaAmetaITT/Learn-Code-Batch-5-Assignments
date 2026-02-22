import type { Record } from "./types";

export class ProcessingResult {
    private _recordsProcessed: number = 0;
    private _errorCount: number = 0;
    private _errorMessages: string[] = [];
    private _parsedRecords: Record[] = [];
    private _statistics: { [key: string]: number } = {};

    get recordsProcessed(): number {
        return this._recordsProcessed;
    }
    get errorCount(): number {
        return this._errorCount;
    }
    get errorMessages(): string[] {
        return [...this._errorMessages];
    }
    get parsedRecords(): Record[] {
        return this._parsedRecords;
    }
    get statistics(): { [key: string]: number } {
        return { ...this._statistics };
    }

    setRecords(records: Record[]): void {
        this._parsedRecords = records;
        this._recordsProcessed = records.length;
    }

    addError(message: string): void {
        this._errorCount++;
        this._errorMessages.push(message);
    }

    setStatistics(stats: { [key: string]: number }): void {
        this._statistics = { ...stats };
    }
}
