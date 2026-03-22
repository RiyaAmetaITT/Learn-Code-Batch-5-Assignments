import { Car } from "../models/Car";
import { ElectricCar } from "../models/ElectricCar";
import { Motorcycle } from "../models/Motorcycle";

export const DEMO_HONDA_MANUFACTURER = "Honda";
export const DEMO_HONDA_MODEL = "Accord";
export const DEMO_HONDA_YEAR = 2023;
export const DEMO_HONDA_LISTING_PRICE_USD = 28_000;
export const DEMO_HONDA_FUEL_TANK_PERCENT = 100;

export const DEMO_HARLEY_MANUFACTURER = "Harley-Davidson";
export const DEMO_HARLEY_MODEL = "Street 750";
export const DEMO_HARLEY_YEAR = 2022;
export const DEMO_HARLEY_LISTING_PRICE_USD = 7_500;
export const DEMO_HARLEY_FUEL_TANK_PERCENT = 80;
export const DEMO_HARLEY_HAS_SIDECAR = false;

export const DEMO_TESLA_MANUFACTURER = "Tesla";
export const DEMO_TESLA_MODEL = "Model 3";
export const DEMO_TESLA_YEAR = 2023;
export const DEMO_TESLA_LISTING_PRICE_USD = 42_000;
export const DEMO_TESLA_BATTERY_CHARGE_PERCENT = 100;

export function createDemoHondaAccord(): Car {
  return new Car(
    DEMO_HONDA_MANUFACTURER,
    DEMO_HONDA_MODEL,
    DEMO_HONDA_YEAR,
    DEMO_HONDA_LISTING_PRICE_USD,
    DEMO_HONDA_FUEL_TANK_PERCENT,
  );
}

export function createDemoHarleyMotorcycle(): Motorcycle {
  return new Motorcycle(
    DEMO_HARLEY_MANUFACTURER,
    DEMO_HARLEY_MODEL,
    DEMO_HARLEY_YEAR,
    DEMO_HARLEY_LISTING_PRICE_USD,
    DEMO_HARLEY_FUEL_TANK_PERCENT,
    DEMO_HARLEY_HAS_SIDECAR,
  );
}

export function createDemoTeslaModel3(): ElectricCar {
  return new ElectricCar(
    DEMO_TESLA_MANUFACTURER,
    DEMO_TESLA_MODEL,
    DEMO_TESLA_YEAR,
    DEMO_TESLA_LISTING_PRICE_USD,
    DEMO_TESLA_BATTERY_CHARGE_PERCENT,
  );
}
