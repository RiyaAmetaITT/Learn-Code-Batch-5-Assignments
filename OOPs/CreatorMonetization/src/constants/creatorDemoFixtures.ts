import { ContentCreator } from "../models/ContentCreator";
import { AdRevenue } from "../models/revenue/AdRevenue";
import { BrandSponsorship } from "../models/revenue/BrandSponsorship";
import { LiveTipping } from "../models/revenue/LiveTipping";
import { SubscriptionRevenue } from "../models/revenue/SubscriptionRevenue";


export const DEMO_TECH_MONTHLY_SUBSCRIPTION_USD_PER_SUBSCRIBER = 2.5;
export const DEMO_TECH_BRAND_SPONSORSHIP = 10_000;

export const DEMO_GAMING_LIVE_TIPPING = 3_500;

export const DEMO_LIFESTYLE_BRAND_SPONSORSHIP = 25_000;
export const DEMO_LIFESTYLE_LIVE_TIPPING = 8_200;

function buildTechVlogger(): ContentCreator {
  const creator = new ContentCreator("Tech Vlogger");
  creator.registerRevenueStream(new AdRevenue());
  creator.registerRevenueStream(
    new SubscriptionRevenue(DEMO_TECH_MONTHLY_SUBSCRIPTION_USD_PER_SUBSCRIBER),
  );
  creator.registerRevenueStream(new BrandSponsorship(DEMO_TECH_BRAND_SPONSORSHIP));
  return creator;
}

function buildGamingStreamer(): ContentCreator {
  const creator = new ContentCreator("Gaming Streamer");
  creator.registerRevenueStream(new AdRevenue());
  creator.registerRevenueStream(new LiveTipping(DEMO_GAMING_LIVE_TIPPING));
  return creator;
}

function buildLifestyleInfluencer(): ContentCreator {
  const creator = new ContentCreator("Lifestyle Influencer");
  creator.registerRevenueStream(new AdRevenue());
  creator.registerRevenueStream(new SubscriptionRevenue());
  creator.registerRevenueStream(new BrandSponsorship(DEMO_LIFESTYLE_BRAND_SPONSORSHIP));
  creator.registerRevenueStream(new LiveTipping(DEMO_LIFESTYLE_LIVE_TIPPING));
  return creator;
}

export function createDemoCreators(): ContentCreator[] {
  return [buildTechVlogger(), buildGamingStreamer(), buildLifestyleInfluencer()];
}
