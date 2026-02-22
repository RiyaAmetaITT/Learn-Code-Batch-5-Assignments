import { DataProcessor } from "./src/processor/DataProcessor";
import { SampleDataGenerator } from "./src/utils/SampleDataGenerator";
import { DataExporter } from "./src/exporters/DataExporter";
import { DataFilter } from "./src/analyzers/DataFilter";
import { StatisticsReporter } from "./src/analyzers/StatisticsReporter";

SampleDataGenerator.generateSampleData("input.csv", 50);

const processor = new DataProcessor("input.csv", "output.csv");

processor.config.validateData = true;
processor.config.transformData = true;
processor.config.dateFormat = "MM/dd/yyyy";
processor.config.batchSize = 50;

processor.processData();

StatisticsReporter.displayStatistics(processor.result);

const exporter = new DataExporter(processor.logger);
exporter.exportToJson(processor.result.parsedRecords, "output.json");
exporter.exportToXml(processor.result.parsedRecords, "output.xml");

try {
    exporter.exportByFormat(processor.result.parsedRecords, "output_test.json", "json");
    exporter.exportByFormat(processor.result.parsedRecords, "output_test.xml", "xml");
} catch (ex: unknown) {
    const message = ex instanceof Error ? ex.message : String(ex);
    console.log(`Export error: ${message}`);
}

const filter = new DataFilter(processor.logger);
const filtered = filter.filterByValue(processor.result.parsedRecords, 100);
console.log(`\nFiltered records: ${filtered.length}`);

console.log(`\nRecords processed: ${processor.recordsProcessed}`);
console.log(`Errors: ${processor.errorCount}`);
