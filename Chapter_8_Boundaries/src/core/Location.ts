export interface Location {
  readonly formattedAddress: string;
  readonly latitude: number;
  readonly longitude: number;
  readonly type: string;
  readonly placeId: string;
}
