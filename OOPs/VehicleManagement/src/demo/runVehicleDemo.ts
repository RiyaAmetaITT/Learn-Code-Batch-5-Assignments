import {
  DEMO_LABEL_PRICE_AFTER_INVALID_SET,
  DEMO_LABEL_TOTAL_FLEET_VALUE,
  DEMO_MSG_REJECTED_INVALID_PRICE,
  DEMO_SECTION_COMPLETE,
  DEMO_SECTION_ENCAPSULATION,
  DEMO_SECTION_FLEET_VEHICLES,
  DEMO_SECTION_STARTING_ALL,
  DEMO_SECTION_TESTING_VEHICLES,
  DEMO_TITLE_MAIN,
} from "../constants/vehicleConstants";
import { VehicleManager } from "../managers/VehicleManager";
import { formatVehicleInfo } from "../presentation/vehicleInfoFormatter";
import {
  logVehicleStartResult,
  logVehicleStopped,
} from "../presentation/vehicleLifecyclePresenter";
import {
  createDemoHondaAccord,
  createDemoHarleyMotorcycle,
  createDemoTeslaModel3,
} from "./vehicleFixtures";

export function runVehicleDemo(): void {
  console.log(`${DEMO_TITLE_MAIN}\n`);

  const hondaAccord = createDemoHondaAccord();
  const harleyDavidson = createDemoHarleyMotorcycle();
  const teslaModel3 = createDemoTeslaModel3();

  console.log(DEMO_SECTION_TESTING_VEHICLES);
  logVehicleStartResult(hondaAccord, hondaAccord.start());
  console.log(formatVehicleInfo(hondaAccord));
  logVehicleStopped(hondaAccord);

  console.log();
  logVehicleStartResult(harleyDavidson, harleyDavidson.start());
  console.log(formatVehicleInfo(harleyDavidson));

  console.log();
  logVehicleStartResult(teslaModel3, teslaModel3.start());
  console.log(formatVehicleInfo(teslaModel3));

  const fleetManager = new VehicleManager();
  fleetManager.addVehicle(hondaAccord);
  fleetManager.addVehicle(harleyDavidson);
  fleetManager.addVehicle(teslaModel3);

  console.log(`\n${DEMO_SECTION_FLEET_VEHICLES}`);
  for (const fleetVehicle of fleetManager.registeredVehicles) {
    console.log(formatVehicleInfo(fleetVehicle));
  }
  console.log(
    `\n${DEMO_LABEL_TOTAL_FLEET_VALUE} $${fleetManager.calculateTotalFleetValue()}`,
  );

  console.log(`\n${DEMO_SECTION_STARTING_ALL}`);
  for (const { vehicle, result } of fleetManager.startAllVehicles()) {
    logVehicleStartResult(vehicle, result);
  }

  console.log(`\n${DEMO_SECTION_ENCAPSULATION}`);
  try {
    hondaAccord.listingPrice = -1000;
  } catch {
    console.log(DEMO_MSG_REJECTED_INVALID_PRICE);
  }
  console.log(
    `${DEMO_LABEL_PRICE_AFTER_INVALID_SET} $${hondaAccord.listingPrice}`,
  );

  console.log(`\n${DEMO_SECTION_COMPLETE}`);
}
