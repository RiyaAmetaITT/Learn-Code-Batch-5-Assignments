import { CreatorAnalytics } from "../../interfaces/CreatorAnalytics";
import { RevenueStream } from "../../interfaces/RevenueStream";
import {
  DEFAULT_MONTHLY_SUBSCRIPTION_USD_PER_SUBSCRIBER,
  engagementRevenueMultiplier,
} from "../../constants/revenueConstants";

export class SubscriptionRevenue implements RevenueStream {
  readonly streamName = "Subscription";
  private readonly monthlyUsdPerSubscriber: number;

  constructor(
    monthlyUsdPerSubscriber: number = DEFAULT_MONTHLY_SUBSCRIPTION_USD_PER_SUBSCRIBER,
  ) {
    this.monthlyUsdPerSubscriber = monthlyUsdPerSubscriber;
  }

  calculateRevenue(analytics: CreatorAnalytics): number {
    const multiplier = engagementRevenueMultiplier(analytics.engagementRate);
    return (
      analytics.activeSubscribers * this.monthlyUsdPerSubscriber * multiplier
    );
  }
}
