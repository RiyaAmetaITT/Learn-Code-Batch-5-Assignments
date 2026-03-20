import { RevenueBreakdownEntry } from "../interfaces/RevenueBreakdownEntry";
import { REPORT_LABEL_COLUMN_WIDTH } from "../constants/revenueConstants";

export class RevenueReport {
  private readonly breakdownEntries: RevenueBreakdownEntry[];

  constructor(breakdownEntries: RevenueBreakdownEntry[]) {
    this.breakdownEntries = breakdownEntries;
  }

  get totalRevenue(): number {
    return this.breakdownEntries.reduce(
      (total, entry) => total + entry.earnedAmount,
      0
    );
  }

  displayReport(): void {
    console.log("\nCreator Revenue Report");
    for (const entry of this.breakdownEntries) {
      console.log(
        `  ${this.formatStringPadding(entry.sourceName, REPORT_LABEL_COLUMN_WIDTH)} $${entry.earnedAmount.toFixed(2)}`
      );
    }
    console.log(
      `  ${this.formatStringPadding("TOTAL REVENUE", REPORT_LABEL_COLUMN_WIDTH)} $${this.totalRevenue.toFixed(2)}`
    );
  }

  private formatStringPadding(text: string, targetLength: number): string {
    let paddedText = text;
    while (paddedText.length < targetLength) {
      paddedText += " ";
    }
    return paddedText;
  }
}
