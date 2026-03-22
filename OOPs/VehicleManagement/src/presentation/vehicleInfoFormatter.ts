import { Vehicle } from "../abstract/Vehicle";
import { Car } from "../models/Car";
import { ElectricCar } from "../models/ElectricCar";
import { Motorcycle } from "../models/Motorcycle";

export function formatVehicleInfo(vehicle: Vehicle): string {
  if (vehicle instanceof ElectricCar) {
    return `Electric Car: ${vehicle.manufacturingYear} ${vehicle.manufacturerName} ${vehicle.modelName}, Price: $${vehicle.listingPrice}`;
  }
  if (vehicle instanceof Motorcycle) {
    return `Motorcycle: ${vehicle.manufacturingYear} ${vehicle.manufacturerName} ${vehicle.modelName}, Sidecar: ${vehicle.hasSidecarAttached}, Price: $${vehicle.listingPrice}`;
  }
  if (vehicle instanceof Car) {
    return `Car: ${vehicle.manufacturingYear} ${vehicle.manufacturerName} ${vehicle.modelName}, Price: $${vehicle.listingPrice}`;
  }
  return `${vehicle.manufacturerName} ${vehicle.modelName}`;
}
