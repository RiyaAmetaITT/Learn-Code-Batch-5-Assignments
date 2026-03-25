export type AppConfig = {
    serviceName: string;
};

export function buildAppConfig(): AppConfig {
    return { serviceName: "ai-orchestration" };
}
