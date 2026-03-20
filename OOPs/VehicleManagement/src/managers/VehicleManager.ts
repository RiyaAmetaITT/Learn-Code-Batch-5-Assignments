import { Vehicle } from "../abstract/Vehicle";

export class VehicleManager {
  private _registeredVehicles: Vehicle[] = [];

  addVehicle(vehicleToRegister: Vehicle): void {
    this._registeredVehicles.push(vehicleToRegister);
    console.log(`${vehicleToRegister.constructor.name} added.`);
  }

  startAllVehicles(): void {
    this._registeredVehicles.forEach((registeredVehicle) => registeredVehicle.start());
  }

  displayAllVehicles(): void {
    console.log("\n=== Vehicles ===");
    this._registeredVehicles.forEach((registeredVehicle) => registeredVehicle.displayInfo());
  }

  calculateTotalFleetValue(): number {
    return this._registeredVehicles.reduce(
      (accumulatedValue, registeredVehicle) => accumulatedValue + registeredVehicle.listingPrice,
      0,
    );
  }
}
