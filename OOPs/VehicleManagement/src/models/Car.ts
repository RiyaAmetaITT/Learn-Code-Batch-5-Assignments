import { FuelVehicle } from "../abstract/FuelVehicle";

export class Car extends FuelVehicle {
  constructor(
    manufacturerName: string,
    modelName: string,
    manufacturingYear: number,
    listingPrice: number,
    fuelTankLevelPercent: number,
  ) {
    super(
      manufacturerName,
      modelName,
      manufacturingYear,
      listingPrice,
      fuelTankLevelPercent,
    );
  }
}
