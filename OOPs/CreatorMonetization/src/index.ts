import { marchAnalytics } from "./constants/analyticsFixtures";
import { ContentCreator } from "./models/ContentCreator";
import { AdRevenue } from "./models/revenue/AdRevenue";
import { BrandSponsorship } from "./models/revenue/BrandSponsorship";
import { LiveTipping } from "./models/revenue/LiveTipping";
import { SubscriptionRevenue } from "./models/revenue/SubscriptionRevenue";

const techVlogger = new ContentCreator("Tech Vlogger");
techVlogger.registerRevenueStream(new AdRevenue());
techVlogger.registerRevenueStream(new SubscriptionRevenue(2.5));
techVlogger.registerRevenueStream(new BrandSponsorship(10_000));

console.log(`\nCreator: ${techVlogger.name}`);
techVlogger.generateRevenueReport(marchAnalytics).displayReport();

const gamingStreamer = new ContentCreator("Gaming Streamer");
gamingStreamer.registerRevenueStream(new AdRevenue());
gamingStreamer.registerRevenueStream(new LiveTipping(3_500));

console.log(`\nCreator: ${gamingStreamer.name}`);
gamingStreamer.generateRevenueReport(marchAnalytics).displayReport();

const lifestyleInfluencer = new ContentCreator("Lifestyle Influencer");
lifestyleInfluencer.registerRevenueStream(new AdRevenue());
lifestyleInfluencer.registerRevenueStream(new SubscriptionRevenue());
lifestyleInfluencer.registerRevenueStream(new BrandSponsorship(25_000));
lifestyleInfluencer.registerRevenueStream(new LiveTipping(8_200));

console.log(`\nCreator: ${lifestyleInfluencer.name}`);
lifestyleInfluencer.generateRevenueReport(marchAnalytics).displayReport();
