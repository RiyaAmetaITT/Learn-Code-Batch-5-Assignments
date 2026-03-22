export type VehicleStartResult =
  | { success: true }
  | { success: false; reason: "no_fuel" | "battery_dead" };
