import { Location } from './Location';

export interface GeocodingService {
  search(address: string): Promise<Location[]>;
}
