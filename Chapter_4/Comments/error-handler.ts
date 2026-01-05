export function getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
        return error.message;
    }
    return String(error);
}

export function throwErrorWithContext(error: unknown, context?: string): never {
    const message = context 
        ? `${context}: ${getErrorMessage(error)}`
        : getErrorMessage(error);
    throw new Error(message);
}

export function logErrorAndExit(error: unknown): never {
    console.error(`Error: ${getErrorMessage(error)}`);
    process.exit(1);
}

