import { Vehicle } from "../abstract/Vehicle";
import { ElectricCar } from "../models/ElectricCar";
import type { VehicleStartResult } from "../types/VehicleStartResult";

export function logVehicleStartResult(
  vehicle: Vehicle,
  result: VehicleStartResult,
): void {
  if (!result.success) {
    const message =
      result.reason === "no_fuel"
        ? "Cannot start – no fuel!"
        : "Cannot start – battery dead!";
    console.log(message);
    return;
  }
  if (vehicle instanceof ElectricCar) {
    console.log(
      `${vehicle.manufacturerName} ${vehicle.modelName} electric motor started.`,
    );
  } else {
    console.log(`${vehicle.manufacturerName} ${vehicle.modelName} started.`);
  }
}

export function logVehicleStopped(vehicle: Vehicle): void {
  console.log(`${vehicle.manufacturerName} ${vehicle.modelName} stopped.`);
}
