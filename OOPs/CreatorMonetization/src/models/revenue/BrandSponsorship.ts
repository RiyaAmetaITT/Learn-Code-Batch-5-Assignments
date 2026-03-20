import { CreatorAnalytics } from "../../interfaces/CreatorAnalytics";
import { RevenueStream } from "../../interfaces/RevenueStream";
import { PEAK_SEASON_SPONSORSHIP_MULTIPLIER } from "../../constants/revenueConstants";

export class BrandSponsorship implements RevenueStream {
  readonly streamName = "Brand Sponsorship";
  private readonly baseSponsorshipFee: number;

  constructor(baseSponsorshipFee: number) {
    this.baseSponsorshipFee = baseSponsorshipFee;
  }

  calculateRevenue(analytics: CreatorAnalytics): number {
    const seasonalBoostMultiplier =
      analytics.contentSeason === "PEAK"
        ? PEAK_SEASON_SPONSORSHIP_MULTIPLIER
        : 1.0;
    return this.baseSponsorshipFee * seasonalBoostMultiplier;
  }
}
