import { CreatorAnalytics } from "../../interfaces/CreatorAnalytics";
import { RevenueStream } from "../../interfaces/RevenueStream";
import { CREATOR_TIP_REVENUE_SHARE } from "../../constants/revenueConstants";

export class LiveTipping implements RevenueStream {
  readonly streamName = "Live Tipping";
  private readonly grossGiftRevenue: number;

  constructor(grossGiftRevenue: number) {
    this.grossGiftRevenue = grossGiftRevenue;
  }

  calculateRevenue(_analytics: CreatorAnalytics): number {
    return this.grossGiftRevenue * CREATOR_TIP_REVENUE_SHARE;
  }
}
