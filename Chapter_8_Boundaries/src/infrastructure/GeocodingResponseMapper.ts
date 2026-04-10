import { Location } from '../core/Location';

export class GeocodingResponseMapper {
  static toDomain(raw: any): Location {
    return {
      formattedAddress: raw.formatted_address,
      latitude: raw.geometry.location.lat,
      longitude: raw.geometry.location.lng,
      type: raw.geometry.location_type,
      placeId: raw.place_id,
    };
  }
}
