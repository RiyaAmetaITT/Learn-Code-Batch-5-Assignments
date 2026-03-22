import { RevenueBreakdownEntry } from "../interfaces/RevenueBreakdownEntry";

export class RevenueReport {
  private readonly breakdownEntries: RevenueBreakdownEntry[];

  constructor(breakdownEntries: RevenueBreakdownEntry[]) {
    this.breakdownEntries = breakdownEntries;
  }

  get entries(): readonly RevenueBreakdownEntry[] {
    return this.breakdownEntries;
  }

  get totalRevenue(): number {
    return this.breakdownEntries.reduce(
      (total, entry) => total + entry.earnedAmount,
      0
    );
  }
}
