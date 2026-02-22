import type { Record } from "../models/types";
import type { OutputFormatter } from "./OutputFormatter";

export class XmlFormatter implements OutputFormatter {
    format(records: Record[]): string {
        let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<records>\n`;
        for (const record of records) {
            xml += "  <record>\n";
            for (const key in record) {
                xml += `    <${key}>${record[key]}</${key}>\n`;
            }
            xml += "  </record>\n";
        }
        return xml + "</records>";
    }
}
