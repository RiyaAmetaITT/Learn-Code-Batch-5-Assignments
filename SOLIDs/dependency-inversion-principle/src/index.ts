import { ConsoleLogger, FileLogger, LoggingErrorReporter, DataProcessingService } from './services';

const consoleLogger = new ConsoleLogger();
const fileLogger = new FileLogger();

const consoleErrorReporter = new LoggingErrorReporter(consoleLogger);
const consoleDataService = new DataProcessingService(consoleLogger, consoleErrorReporter);

const fileErrorReporter = new LoggingErrorReporter(fileLogger);
const fileDataService = new DataProcessingService(fileLogger, fileErrorReporter);

console.log('--- Using console-based logging ---');
consoleDataService.processData('Hello Dependency Inversion');
consoleDataService.processData('');

console.log('--- Using file-based logging (simulated) ---');
fileDataService.processData('Another request');
