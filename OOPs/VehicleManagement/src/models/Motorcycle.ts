import { FuelVehicle } from "../abstract/FuelVehicle";

export class Motorcycle extends FuelVehicle {
  private _hasSidecarAttached: boolean;

  constructor(
    manufacturerName: string,
    modelName: string,
    manufacturingYear: number,
    listingPrice: number,
    fuelTankLevelPercent: number,
    hasSidecarAttached: boolean,
  ) {
    super(
      manufacturerName,
      modelName,
      manufacturingYear,
      listingPrice,
      fuelTankLevelPercent,
    );
    this._hasSidecarAttached = hasSidecarAttached;
  }

  get hasSidecarAttached(): boolean {
    return this._hasSidecarAttached;
  }
}
