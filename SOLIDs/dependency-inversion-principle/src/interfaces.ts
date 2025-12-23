export interface Logger {
  log(message: string): void;
}

export interface ErrorReporter {
  report(error: Error): void;
}
