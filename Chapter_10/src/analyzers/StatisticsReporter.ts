import { ProcessingResult } from "../models/ProcessingResult";

export class StatisticsReporter {
    static displayStatistics(result: ProcessingResult): void {
        console.log("\n=== Processing Statistics ===");
        const stats = result.statistics;
        for (const key in stats) {
            console.log(`${key}: ${stats[key]}`);
        }
        const errors = result.errorMessages;
        if (errors.length > 0) {
            console.log("\n=== Errors ===");
            for (const error of errors) {
                console.log(`- ${error}`);
            }
        }
    }
}
