import type { Logger, ErrorReporter } from './interfaces';

export class ConsoleLogger implements Logger {
  log(message: string): void {
    console.log(`[ConsoleLogger] ${message}`);
  }
}

export class FileLogger implements Logger {
  log(message: string): void {
    console.log(`[FileLogger] (writing to file) ${message}`);
  }
}

export class LoggingErrorReporter implements ErrorReporter {
  constructor(private readonly logger: Logger) {}

  report(error: Error): void {
    this.logger.log(`ERROR: ${error.message}`);
  }
}

export class DataProcessingService {
  constructor(
    private readonly logger: Logger,
    private readonly errorReporter: ErrorReporter
  ) {}

  processData(inputData: string): void {
    this.logger.log(`Starting process for data: ${inputData}`);
    try {
      if (!inputData.trim()) {
        throw new Error('Data cannot be empty');
      }

      const processedResult = inputData.toUpperCase();
      this.logger.log(`Successfully processed data: ${processedResult}`);
    } catch (error) {
      this.errorReporter.report(error as Error);
    }
  }
}

