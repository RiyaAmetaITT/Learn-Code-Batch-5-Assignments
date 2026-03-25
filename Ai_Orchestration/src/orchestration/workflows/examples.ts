import type { WorkflowDefinition } from "../types";

export function exampleWorkflow_ProductDescription(): WorkflowDefinition {
    return {
        id: "product_description_pipeline",
        steps: [
            {
                name: "generate",
                type: "GENERATE_PRODUCT_DESCRIPTION",
                config: { productName: "Acme Smart Mug" },
            },
            {
                name: "refine_tone",
                type: "REFINE_TONE",
                config: { tone: "premium" },
            },
            {
                name: "summarize",
                type: "SUMMARIZE",
                config: { maxChars: 70 },
            },
            {
                name: "translate",
                type: "TRANSLATE",
                config: { language: "French" },
            },
        ],
    };
}

export function exampleWorkflow_WithRetryAndFallback(): WorkflowDefinition {
    return {
        id: "retry_fallback_pipeline",
        steps: [
            {
                name: "possibly_failing_step",
                type: "RANDOM_FAILING",
                config: { failRate: 0.9 },
                retry: { maxAttempts: 3, retryOnAllErrors: true },
                fallback: {
                    name: "fallback_step",
                    type: "SUMMARIZE",
                    config: { maxChars: 40 },
                },
            },
            {
                name: "translate_after",
                type: "TRANSLATE",
                config: { language: "German" },
                when: { kind: "input_contains", substring: "Output" },
            },
        ],
    };
}
