import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export interface AppConfig {
  googleGeocodingApiKey: string;
  geocodingBaseUrl: string;
}

function loadConfig(): AppConfig {
  const apiKey = process.env.GOOGLE_GEOCODING_API_KEY;

  if (!apiKey) {
    throw new Error('[Config Error] GOOGLE_GEOCODING_API_KEY is not set.');
  }

  return {
    googleGeocodingApiKey: apiKey.trim(),
    geocodingBaseUrl: 'https://maps.googleapis.com/maps/api/geocode/json',
  };
}

export const appConfig: AppConfig = loadConfig();
