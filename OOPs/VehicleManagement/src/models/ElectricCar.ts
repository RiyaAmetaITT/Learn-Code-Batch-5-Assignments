import { Vehicle } from "../abstract/Vehicle";
import {
  MAX_BATTERY_LEVEL,
  MIN_BATTERY_CHARGE_LEVEL,
} from "../constants/vehicleConstants";
import type { VehicleStartResult } from "../types/VehicleStartResult";

export class ElectricCar extends Vehicle {
  private _batteryChargeLevel: number;
  private _isMotorRunning: boolean = false;

  constructor(
    manufacturerName: string,
    modelName: string,
    manufacturingYear: number,
    listingPrice: number,
    batteryChargeLevelPercent: number,
  ) {
    super(manufacturerName, modelName, manufacturingYear, listingPrice);
    this._batteryChargeLevel = this.validateBatteryChargePercent(
      batteryChargeLevelPercent,
    );
  }

  get batteryChargeLevel(): number {
    return this._batteryChargeLevel;
  }

  get isMotorRunning(): boolean {
    return this._isMotorRunning;
  }

  chargeBattery(chargePercentPointsToAdd: number): void {
    if (chargePercentPointsToAdd < 0) {
      throw new RangeError(
        `Charge amount cannot be negative (got ${chargePercentPointsToAdd}).`,
      );
    }
    this._batteryChargeLevel = Math.min(
      MAX_BATTERY_LEVEL,
      this._batteryChargeLevel + chargePercentPointsToAdd,
    );
  }

  start(): VehicleStartResult {
    const isBatteryDead = this._batteryChargeLevel <= MIN_BATTERY_CHARGE_LEVEL;
    if (isBatteryDead) {
      return { success: false, reason: "battery_dead" };
    }
    this._isMotorRunning = true;
    return { success: true };
  }

  stop(): void {
    this._isMotorRunning = false;
  }

  private validateBatteryChargePercent(level: number): number {
    if (level < MIN_BATTERY_CHARGE_LEVEL || level > MAX_BATTERY_LEVEL) {
      throw new RangeError(
        `Battery charge must be ${MIN_BATTERY_CHARGE_LEVEL}–${MAX_BATTERY_LEVEL} percent (got ${level}).`,
      );
    }
    return level;
  }
}
