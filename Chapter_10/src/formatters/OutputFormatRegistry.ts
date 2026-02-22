import type { OutputFormatter } from "./OutputFormatter";
import { CsvFormatter } from "./CsvFormatter";
import { JsonFormatter } from "./JsonFormatter";
import { XmlFormatter } from "./XmlFormatter";

export class OutputFormatRegistry {
    private static readonly FORMATTERS: Map<string, OutputFormatter> = new Map([
        ["json", new JsonFormatter()],
        ["xml", new XmlFormatter()],
        ["csv", new CsvFormatter()]
    ]);

    static getFormatter(format: string): OutputFormatter {
        const formatter = OutputFormatRegistry.FORMATTERS.get(format.toLowerCase());
        if (!formatter) {
            throw new Error(`Unsupported format: ${format}`);
        }
        return formatter;
    }
}
