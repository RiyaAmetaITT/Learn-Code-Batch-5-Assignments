export class ProcessorConfig {
    private static readonly DEFAULT_DATE_FORMAT = "yyyy-MM-dd";
    private static readonly DEFAULT_BATCH_SIZE = 100;

    private _dateFormat: string;
    private _batchSize: number;
    private _validateData: boolean;
    private _transformData: boolean;

    constructor(
        dateFormat: string = ProcessorConfig.DEFAULT_DATE_FORMAT,
        batchSize: number = ProcessorConfig.DEFAULT_BATCH_SIZE,
        validateData: boolean = true,
        transformData: boolean = true
    ) {
        this._dateFormat = dateFormat;
        this._batchSize = batchSize;
        this._validateData = validateData;
        this._transformData = transformData;
    }

    get dateFormat(): string {
        return this._dateFormat;
    }
    set dateFormat(value: string) {
        this._dateFormat = value;
    }
    get batchSize(): number {
        return this._batchSize;
    }
    set batchSize(value: number) {
        this._batchSize = value;
    }
    get validateData(): boolean {
        return this._validateData;
    }
    set validateData(value: boolean) {
        this._validateData = value;
    }
    get transformData(): boolean {
        return this._transformData;
    }
    set transformData(value: boolean) {
        this._transformData = value;
    }

    update(dateFormat: string, batchSize: number, validate: boolean, transform: boolean): void {
        this._dateFormat = dateFormat;
        this._batchSize = batchSize;
        this._validateData = validate;
        this._transformData = transform;
    }
}
