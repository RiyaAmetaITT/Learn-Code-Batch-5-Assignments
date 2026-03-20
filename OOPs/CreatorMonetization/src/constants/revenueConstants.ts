import { CreatorAnalytics } from "../interfaces/CreatorAnalytics";

export const REGIONAL_CPM_RATES: Record<CreatorAnalytics["viewerRegion"], number> = {
  US: 5.0,
  EU: 3.5,
  INDIA: 0.8,
  OTHER: 1.0,
};

export const PEAK_SEASON_AD_MULTIPLIER = 1.3;

export const PEAK_SEASON_SPONSORSHIP_MULTIPLIER = 1.15;

export const DEFAULT_SUBSCRIPTION_PRICE = 2.0;

export const ENGAGEMENT_BONUS_FACTOR = 0.5;

export const CREATOR_TIP_REVENUE_SHARE = 0.7;

export const REPORT_LABEL_COLUMN_WIDTH = 22;
