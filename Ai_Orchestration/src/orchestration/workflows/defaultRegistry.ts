import { StepRegistry } from "../registry";
import { EnrichWithContextStep } from "../steps/enrichWithContextStep";
import { GenerateProductDescriptionStep } from "../steps/generateProductDescriptionStep";
import { RandomFailingStep } from "../steps/randomFailingStep";
import { RefineToneStep } from "../steps/refineToneStep";
import { SummarizeStep } from "../steps/summarizeStep";
import { TranslateStep } from "../steps/translateStep";

export function buildDefaultRegistry(): StepRegistry {
    const registry = new StepRegistry();

    registry.register("GENERATE_PRODUCT_DESCRIPTION", () => new GenerateProductDescriptionStep());
    registry.register("REFINE_TONE", () => new RefineToneStep());
    registry.register("SUMMARIZE", () => new SummarizeStep());
    registry.register("TRANSLATE", () => new TranslateStep());
    registry.register("ENRICH_WITH_CONTEXT", () => new EnrichWithContextStep());
    registry.register("RANDOM_FAILING", () => new RandomFailingStep());

    return registry;
}
