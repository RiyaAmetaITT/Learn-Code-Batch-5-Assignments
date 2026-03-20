import { Vehicle } from "./Vehicle";
import { MIN_FUEL_LEVEL } from "../constants/vehicleConstants";

export abstract class FuelVehicle extends Vehicle {
  protected _fuelTankLevel: number;
  protected _isEngineRunning: boolean = false;

  constructor(
    manufacturerName: string,
    modelName: string,
    manufacturingYear: number,
    listingPrice: number,
    fuelTankLevel: number,
  ) {
    super(manufacturerName, modelName, manufacturingYear, listingPrice);
    this._fuelTankLevel = fuelTankLevel;
  }

  get fuelTankLevel(): number {
    return this._fuelTankLevel;
  }

  get isEngineRunning(): boolean {
    return this._isEngineRunning;
  }

  refuel(fuelAmount: number): void {
    this._fuelTankLevel += fuelAmount;
    console.log(`Refuelled. Fuel level: ${this._fuelTankLevel}%`);
  }

  start(): void {
    const isFuelTankEmpty = this._fuelTankLevel <= MIN_FUEL_LEVEL;
    if (isFuelTankEmpty) {
      console.log("Cannot start – no fuel!");
      return;
    }
    this._isEngineRunning = true;
    console.log(`${this.manufacturerName} ${this.modelName} started.`);
  }

  stop(): void {
    this._isEngineRunning = false;
    console.log(`${this.manufacturerName} ${this.modelName} stopped.`);
  }
}
