import type { Record } from "../models/types";
import { FileOperations } from "../services/FileOperations";
import { JsonFormatter } from "../formatters/JsonFormatter";
import { XmlFormatter } from "../formatters/XmlFormatter";
import { OutputFormatRegistry } from "../formatters/OutputFormatRegistry";
import { Logger } from "../services/Logger";

export class DataExporter {
    private _logger: Logger;

    constructor(logger: Logger) {
        this._logger = logger;
    }

    exportToJson(records: Record[], jsonFilePath: string): void {
        this._logger.log(`Exporting to JSON: ${jsonFilePath}`);
        const formatter = new JsonFormatter();
        FileOperations.write(jsonFilePath, formatter.format(records));
        this._logger.log("JSON export complete");
    }

    exportToXml(records: Record[], xmlFilePath: string): void {
        this._logger.log(`Exporting to XML: ${xmlFilePath}`);
        const formatter = new XmlFormatter();
        FileOperations.write(xmlFilePath, formatter.format(records));
        this._logger.log("XML export complete");
    }

    exportByFormat(records: Record[], filePath: string, format: string): void {
        const formatter = OutputFormatRegistry.getFormatter(format);
        const content =
            format.toLowerCase() === "csv"
                ? "ID,NAME,VALUE"
                : formatter.format(records);
        FileOperations.write(filePath, content);
    }
}
