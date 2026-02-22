import type { Record } from "../models/types";
import { ProcessorConfig } from "../config/ProcessorConfig";
import { ProcessingResult } from "../models/ProcessingResult";
import { Logger } from "../services/Logger";
import { FileOperations } from "../services/FileOperations";
import { DataParser } from "../parsers/DataParser";
import { DataValidator } from "../validators/DataValidator";
import { DataTransformer } from "../transformers/DataTransformer";
import { StatisticsCalculator } from "../calculators/StatisticsCalculator";
import { CsvFormatter } from "../formatters/CsvFormatter";

export class DataProcessor {
    public static readonly DEFAULT_INPUT = "input.csv";
    public static readonly DEFAULT_OUTPUT = "output.csv";

    private _inputFilePath: string;
    private _outputFilePath: string;
    private _config: ProcessorConfig;
    private _result: ProcessingResult;
    private _logger: Logger;

    constructor(inputFile: string, outputFile: string, logger: Logger = new Logger()) {
        this._inputFilePath = inputFile;
        this._outputFilePath = outputFile;
        this._config = new ProcessorConfig();
        this._result = new ProcessingResult();
        this._logger = logger;

        FileOperations.ensureFileExists(inputFile);
        this._logger.log("DataProcessor initialized");
    }

    get config(): ProcessorConfig {
        return this._config;
    }

    get result(): ProcessingResult {
        return this._result;
    }

    get logger(): Logger {
        return this._logger;
    }

    get recordsProcessed(): number {
        return this._result.recordsProcessed;
    }

    get errorCount(): number {
        return this._result.errorCount;
    }

    get errorMessages(): string[] {
        return this._result.errorMessages;
    }

    processData(): void {
        this._logger.log("Starting data processing");

        try {
            this.readAndParse();
            let records = this._result.parsedRecords;

            if (this._config.validateData) {
                records = this.validateRecords(records);
            }
            if (this._config.transformData) {
                const transformer = new DataTransformer();
                records = transformer.transform(records);
                this._result.setRecords(records);
            }

            const statsCalculator = new StatisticsCalculator();
            const stats = statsCalculator.calculate(records, this._result.errorCount);
            this._result.setStatistics(stats);

            this.writeOutput(records);
            this._logger.flush();

            this.reportCompletion();
        } catch (ex: unknown) {
            this.handleFatalError(ex);
        }
    }

    private readAndParse(): void {
        this._logger.log(`Reading input file: ${this._inputFilePath}`);
        const lines = FileOperations.readLines(this._inputFilePath);
        this._logger.log(`Read ${lines.length} lines`);

        this._logger.log("Parsing data...");
        const parser = new DataParser();
        const { records, errors } = parser.parse(lines);

        for (const err of errors) {
            this._result.addError(err.message);
            this._logger.log(`ERROR: ${err.message}`);
        }
        this._result.setRecords(records);
        this._logger.log(`Parsed ${records.length} records`);
    }

    private validateRecords(records: Record[]): Record[] {
        this._logger.log("Validating data...");
        const validator = new DataValidator();
        const { valid, errors } = validator.validate(records);

        for (const err of errors) {
            this._result.addError(err.message);
        }
        this._result.setRecords(valid);
        this._logger.log(`Validation complete. ${valid.length} valid records`);
        return valid;
    }

    private writeOutput(records: Record[]): void {
        this._logger.log(`Writing output to: ${this._outputFilePath}`);
        const formatter = new CsvFormatter();
        FileOperations.write(this._outputFilePath, formatter.format(records));
        this._logger.log(`Output written. ${records.length} records processed`);
    }

    private reportCompletion(): void {
        console.log("Processing complete!");
        console.log(`Records processed: ${this._result.recordsProcessed}`);
        console.log(`Errors: ${this._result.errorCount}`);
    }

    private handleFatalError(ex: unknown): void {
        const message = ex instanceof Error ? ex.message : String(ex);
        this._result.addError(`Fatal error: ${message}`);
        this._logger.log(`FATAL ERROR: ${message}`);
        console.log(`Processing failed: ${message}`);
    }

    updateConfiguration(
        dateFormat: string,
        batchSize: number,
        validate: boolean,
        transform: boolean
    ): void {
        this._config.update(dateFormat, batchSize, validate, transform);
        this._logger.log(
            `Configuration updated: dateFormat=${this._config.dateFormat}, batchSize=${this._config.batchSize}`
        );
    }
}
