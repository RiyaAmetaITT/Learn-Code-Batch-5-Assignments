import readlineSync from 'readline-sync';
import { GeocodingService } from './core/GeocodingService';
import { ConsoleRenderer } from './ui/ConsoleRenderer';
import { validateLocationInput } from './validators/inputValidator';
import { AppError } from './core/Errors';

export class GeoLocatorApp {
  constructor(private readonly geoService: GeocodingService) {}

  public async start(): Promise<void> {
    ConsoleRenderer.printHeader('GEO LOCATOR CLI');
    ConsoleRenderer.printInfo('Type "exit" to quit.\n');

    while (true) {
      const input = readlineSync.question('  Enter location › ');
      if (['exit', 'quit', 'q'].includes(input.trim().toLowerCase())) break;

      const validation = validateLocationInput(input);
      if (!validation.isValid) {
        ConsoleRenderer.printError(validation.errorMessage || 'Invalid');
        continue;
      }

      try {
        const results = await this.geoService.search(validation.sanitized!);
        results.forEach((r, i) => ConsoleRenderer.printLocation(r, i, results.length));
      } catch (error) {
        const msg = error instanceof AppError ? error.message : 'Unexpected Error';
        ConsoleRenderer.printError(msg);
      }
    }
  }
}
