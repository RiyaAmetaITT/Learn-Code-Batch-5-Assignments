import { FuelVehicle } from "../abstract/FuelVehicle";

export class Motorcycle extends FuelVehicle {
  private _hasSidecarAttached: boolean;

  constructor(
    manufacturerName: string,
    modelName: string,
    manufacturingYear: number,
    listingPrice: number,
    fuelTankLevel: number,
    hasSidecarAttached: boolean,
  ) {
    super(manufacturerName, modelName, manufacturingYear, listingPrice, fuelTankLevel);
    this._hasSidecarAttached = hasSidecarAttached;
  }

  get hasSidecarAttached(): boolean {
    return this._hasSidecarAttached;
  }

  displayInfo(): void {
    console.log(
      `Motorcycle: ${this.manufacturingYear} ${this.manufacturerName} ${this.modelName}, Sidecar: ${this._hasSidecarAttached}, Price: $${this.listingPrice}`,
    );
  }
}
