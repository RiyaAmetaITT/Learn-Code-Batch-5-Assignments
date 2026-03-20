import { CreatorAnalytics } from "../interfaces/CreatorAnalytics";
import { RevenueStream } from "../interfaces/RevenueStream";
import { RevenueReport } from "../services/RevenueReport";

export class ContentCreator {
  private readonly creatorName: string;
  private readonly activeRevenueStreams: RevenueStream[];

  constructor(creatorName: string) {
    this.creatorName = creatorName;
    this.activeRevenueStreams = [];
  }

  get name(): string {
    return this.creatorName;
  }

  registerRevenueStream(stream: RevenueStream): void {
    this.activeRevenueStreams.push(stream);
  }

  generateRevenueReport(analytics: CreatorAnalytics): RevenueReport {
    const revenueEntries = this.activeRevenueStreams.map((stream) => ({
      sourceName: stream.streamName,
      earnedAmount: stream.calculateRevenue(analytics),
    }));
    return new RevenueReport(revenueEntries);
  }
}
