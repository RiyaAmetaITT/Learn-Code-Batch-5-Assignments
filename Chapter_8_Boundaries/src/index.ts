import { appConfig } from './config/appConfig';
import { GeocodingApiClient } from './infrastructure/GeocodingApiClient';
import { GeoLocatorApp } from './GeoLocatorApp';

async function bootstrap() {
  try {
    const apiClient = new GeocodingApiClient(appConfig);
    const app = new GeoLocatorApp(apiClient);
    await app.start();
  } catch (error) {
    console.error('Fatal error:', error);
    process.exit(1);
  }
}

bootstrap();
