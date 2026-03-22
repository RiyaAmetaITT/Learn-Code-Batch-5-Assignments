import { CreatorAnalytics } from "../interfaces/CreatorAnalytics";
import { ContentCreator } from "../models/ContentCreator";
import { RevenueReportFormatter } from "./RevenueReportFormatter";

const formatter = new RevenueReportFormatter();

function printLinesToConsole(lines: readonly string[]): void {
  for (const line of lines) {
    console.log(line);
  }
}

export function printCreatorRevenueReport(
  creator: ContentCreator,
  analytics: CreatorAnalytics
): void {
  console.log(`\nCreator: ${creator.name}`);
  printLinesToConsole(
    formatter.formatLines(creator.generateRevenueReport(analytics))
  );
}
