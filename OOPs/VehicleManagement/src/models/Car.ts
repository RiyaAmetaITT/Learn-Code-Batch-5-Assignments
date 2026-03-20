import { FuelVehicle } from "../abstract/FuelVehicle";

export class Car extends FuelVehicle {
  constructor(
    manufacturerName: string,
    modelName: string,
    manufacturingYear: number,
    listingPrice: number,
    fuelTankLevel: number,
  ) {
    super(manufacturerName, modelName, manufacturingYear, listingPrice, fuelTankLevel);
  }

  displayInfo(): void {
    console.log(`Car: ${this.manufacturingYear} ${this.manufacturerName} ${this.modelName}, Price: $${this.listingPrice}`);
  }
}
