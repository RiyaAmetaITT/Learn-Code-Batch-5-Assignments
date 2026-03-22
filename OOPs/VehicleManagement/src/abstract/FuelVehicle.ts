import { Vehicle } from "./Vehicle";
import {
  MAX_FUEL_TANK_PERCENT,
  MIN_FUEL_LEVEL,
} from "../constants/vehicleConstants";
import type { VehicleStartResult } from "../types/VehicleStartResult";

export abstract class FuelVehicle extends Vehicle {
  protected _fuelTankLevel: number;
  protected _isEngineRunning: boolean = false;

  constructor(
    manufacturerName: string,
    modelName: string,
    manufacturingYear: number,
    listingPrice: number,
    fuelTankLevelPercent: number,
  ) {
    super(manufacturerName, modelName, manufacturingYear, listingPrice);
    this._fuelTankLevel = this.validateFuelTankPercent(fuelTankLevelPercent);
  }

  get fuelTankLevel(): number {
    return this._fuelTankLevel;
  }

  get isEngineRunning(): boolean {
    return this._isEngineRunning;
  }

  refuel(fuelPercentPointsToAdd: number): void {
    if (fuelPercentPointsToAdd < 0) {
      throw new RangeError(
        `Refuel amount cannot be negative (got ${fuelPercentPointsToAdd}).`,
      );
    }
    this._fuelTankLevel = Math.min(
      MAX_FUEL_TANK_PERCENT,
      this._fuelTankLevel + fuelPercentPointsToAdd,
    );
  }

  start(): VehicleStartResult {
    const isFuelTankEmpty = this._fuelTankLevel <= MIN_FUEL_LEVEL;
    if (isFuelTankEmpty) {
      return { success: false, reason: "no_fuel" };
    }
    this._isEngineRunning = true;
    return { success: true };
  }

  stop(): void {
    this._isEngineRunning = false;
  }

  private validateFuelTankPercent(level: number): number {
    if (level < MIN_FUEL_LEVEL || level > MAX_FUEL_TANK_PERCENT) {
      throw new RangeError(
        `Fuel tank level must be ${MIN_FUEL_LEVEL}–${MAX_FUEL_TANK_PERCENT} percent of tank (got ${level}).`,
      );
    }
    return level;
  }
}
