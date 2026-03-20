import { Vehicle } from "../abstract/Vehicle";
import { MAX_BATTERY_LEVEL } from "../constants/vehicleConstants";

export class ElectricCar extends Vehicle {
  private _batteryChargeLevel: number;
  private _isMotorRunning: boolean = false;

  constructor(
    manufacturerName: string,
    modelName: string,
    manufacturingYear: number,
    listingPrice: number,
    batteryChargeLevel: number,
  ) {
    super(manufacturerName, modelName, manufacturingYear, listingPrice);
    this._batteryChargeLevel = batteryChargeLevel;
  }

  get batteryChargeLevel(): number {
    return this._batteryChargeLevel;
  }

  get isMotorRunning(): boolean {
    return this._isMotorRunning;
  }

  chargeBattery(chargeAmount: number): void {
    this._batteryChargeLevel = Math.min(MAX_BATTERY_LEVEL, this._batteryChargeLevel + chargeAmount);
    console.log(`Charged. Battery level: ${this._batteryChargeLevel}%`);
  }

  start(): void {
    const isBatteryDead = this._batteryChargeLevel <= 0;
    if (isBatteryDead) {
      console.log("Cannot start – battery dead!");
      return;
    }
    this._isMotorRunning = true;
    console.log(`${this.manufacturerName} ${this.modelName} electric motor started.`);
  }

  stop(): void {
    this._isMotorRunning = false;
    console.log(`${this.manufacturerName} ${this.modelName} stopped.`);
  }

  displayInfo(): void {
    console.log(`Electric Car: ${this.manufacturingYear} ${this.manufacturerName} ${this.modelName}, Price: $${this.listingPrice}`);
  }
}
