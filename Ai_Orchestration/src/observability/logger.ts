export interface Logger {
  info(message: string, meta?: Record<string, unknown>): void;
  warn(message: string, meta?: Record<string, unknown>): void;
  error(message: string, meta?: Record<string, unknown>): void;
}

export class ConsoleLogger implements Logger {
  info(message: string, meta: Record<string, unknown> = {}): void {
    console.log(`[INFO] ${message}`, meta);
  }

  warn(message: string, meta: Record<string, unknown> = {}): void {
    console.warn(`[WARN] ${message}`, meta);
  }

  error(message: string, meta: Record<string, unknown> = {}): void {
    console.error(`[ERROR] ${message}`, meta);
  }
}
