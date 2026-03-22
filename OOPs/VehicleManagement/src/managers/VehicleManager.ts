import { Vehicle } from "../abstract/Vehicle";
import type { VehicleStartResult } from "../types/VehicleStartResult";

export type VehicleStartOutcome = {
  vehicle: Vehicle;
  result: VehicleStartResult;
};

export class VehicleManager {
  private _registeredVehicles: Vehicle[] = [];

  addVehicle(vehicleToRegister: Vehicle): void {
    this._registeredVehicles.push(vehicleToRegister);
  }

  get registeredVehicles(): readonly Vehicle[] {
    return this._registeredVehicles;
  }

  startAllVehicles(): VehicleStartOutcome[] {
    return this._registeredVehicles.map((vehicle) => ({
      vehicle,
      result: vehicle.start(),
    }));
  }

  calculateTotalFleetValue(): number {
    return this._registeredVehicles.reduce(
      (accumulatedValue, registeredVehicle) =>
        accumulatedValue + registeredVehicle.listingPrice,
      0,
    );
  }
}
