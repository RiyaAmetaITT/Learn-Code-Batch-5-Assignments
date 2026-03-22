import { CreatorAnalytics } from "./CreatorAnalytics";

export interface RevenueStream {
  readonly streamName: string;
  calculateRevenue(analytics: CreatorAnalytics): number;
}
