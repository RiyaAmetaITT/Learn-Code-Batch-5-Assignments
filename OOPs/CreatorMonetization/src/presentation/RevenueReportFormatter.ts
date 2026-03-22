import { RevenueReport } from "../services/RevenueReport";
import { REPORT_LABEL_COLUMN_WIDTH } from "../constants/revenueConstants";

export class RevenueReportFormatter {
  formatLines(report: RevenueReport): string[] {
    const lines: string[] = ["\nCreator Revenue Report"];
    for (const entry of report.entries) {
      lines.push(
        `  ${this.padLabel(entry.sourceName)} $${entry.earnedAmount.toFixed(2)}`
      );
    }
    lines.push(
      `  ${this.padLabel("TOTAL REVENUE")} $${report.totalRevenue.toFixed(2)}`
    );
    return lines;
  }

  private padLabel(text: string): string {
    let padded = text;
    while (padded.length < REPORT_LABEL_COLUMN_WIDTH) {
      padded += " ";
    }
    return padded;
  }
}
