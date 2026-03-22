import { marchAnalytics } from "./constants/analyticsFixtures";
import { createDemoCreators } from "./constants/creatorDemoFixtures";
import { printCreatorRevenueReport } from "./presentation/printRevenueReport";

for (const creator of createDemoCreators()) {
  printCreatorRevenueReport(creator, marchAnalytics);
}
