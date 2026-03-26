import type { RetryPolicy, StepDefinition } from "../types";

function validateMaxAttempts(maxAttempts: number, stepName: string): void {
  if (!Number.isInteger(maxAttempts) || maxAttempts < 1) {
    throw new Error(`Invalid retry.maxAttempts for step "${stepName}"`);
  }
}

export class RetryPolicyService {
  getMaxAttempts(stepDef: StepDefinition): number {
    const policy = stepDef.retry;
    if (!policy) return 1;

    validateMaxAttempts(policy.maxAttempts, stepDef.name);
    return policy.maxAttempts;
  }

  shouldRetry(stepDef: StepDefinition): boolean {
    const retryOnAllErrors = stepDef.retry?.retryOnAllErrors ?? true;
    return retryOnAllErrors;
  }

  static toDebug(policy: RetryPolicy | undefined): string {
    if (!policy) return "none";
    return `maxAttempts=${policy.maxAttempts}, retryOnAllErrors=${policy.retryOnAllErrors ?? true}`;
  }
}
