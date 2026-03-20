import { CreatorAnalytics } from "../../interfaces/CreatorAnalytics";
import { RevenueStream } from "../../interfaces/RevenueStream";
import {
  DEFAULT_SUBSCRIPTION_PRICE,
  ENGAGEMENT_BONUS_FACTOR,
} from "../../constants/revenueConstants";

export class SubscriptionRevenue implements RevenueStream {
  readonly streamName = "Subscription";
  private readonly pricePerSubscriber: number;

  constructor(pricePerSubscriber: number = DEFAULT_SUBSCRIPTION_PRICE) {
    this.pricePerSubscriber = pricePerSubscriber;
  }

  calculateRevenue(analytics: CreatorAnalytics): number {
    const engagementBonusMultiplier =
      1 + analytics.engagementRate * ENGAGEMENT_BONUS_FACTOR;
    return (
      analytics.activeSubscribers *
      this.pricePerSubscriber *
      engagementBonusMultiplier
    );
  }
}
