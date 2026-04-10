import axios from 'axios';
import { AppConfig } from '../config/appConfig';
import { GeocodingErrorHandler } from './GeocodingErrorHandler';
import { GeocodingResponseMapper } from './GeocodingResponseMapper';
import { Location } from '../core/Location';
import { GeocodingService } from '../core/GeocodingService';
import { AppError, ErrorCode } from '../core/Errors';

export class GeocodingApiClient implements GeocodingService {
  constructor(private readonly config: AppConfig) {}

  async search(address: string): Promise<Location[]> {
    try {
      const { data } = await axios.get(this.config.geocodingBaseUrl, {
        params: { address, key: this.config.googleGeocodingApiKey },
      });

      GeocodingErrorHandler.handleStatus(data.status, data.error_message);
      return data.results.map(GeocodingResponseMapper.toDomain);
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError('Network error', ErrorCode.NETWORK_FAILURE);
    }
  }
}
