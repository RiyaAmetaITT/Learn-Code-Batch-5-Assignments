import { CreatorAnalytics } from "../../interfaces/CreatorAnalytics";
import { RevenueStream } from "../../interfaces/RevenueStream";
import {
  PEAK_SEASON_AD_MULTIPLIER,
  REGIONAL_CPM_RATES,
} from "../../constants/revenueConstants";

export class AdRevenue implements RevenueStream {
  readonly streamName = "Ad Revenue";

  calculateRevenue(analytics: CreatorAnalytics): number {
    const regionalCpm = REGIONAL_CPM_RATES[analytics.viewerRegion];
    const seasonalMultiplier =
      analytics.contentSeason === "PEAK" ? PEAK_SEASON_AD_MULTIPLIER : 1.0;
    return (analytics.totalViews / 1000) * regionalCpm * seasonalMultiplier;
  }
}
