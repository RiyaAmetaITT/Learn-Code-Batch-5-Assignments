import { Car } from "./models/Car";
import { Motorcycle } from "./models/Motorcycle";
import { ElectricCar } from "./models/ElectricCar";
import { VehicleManager } from "./managers/VehicleManager";

class Program {
  static main(): void {
    console.log("=== Vehicle Management Demo ===\n");

    const hondaAccord = new Car("Honda", "Accord", 2023, 28000, 100);
    const harleyDavidson = new Motorcycle("Harley-Davidson", "Street 750", 2022, 7500, 80, false);
    const teslaModel3 = new ElectricCar("Tesla", "Model 3", 2023, 42000, 100);

    console.log("Testing Vehicles:");
    hondaAccord.start();
    hondaAccord.displayInfo();
    hondaAccord.stop();

    console.log();
    harleyDavidson.start();
    harleyDavidson.displayInfo();

    console.log();
    teslaModel3.start();
    teslaModel3.displayInfo();

    const fleetManager = new VehicleManager();
    fleetManager.addVehicle(hondaAccord);
    fleetManager.addVehicle(harleyDavidson);
    fleetManager.addVehicle(teslaModel3);

    fleetManager.displayAllVehicles();
    console.log(`\nTotal Fleet Value: $${fleetManager.calculateTotalFleetValue()}`);

    console.log("\nStarting all vehicles:");
    fleetManager.startAllVehicles();

    console.log("\n=== Encapsulation Demo ===");
    hondaAccord.listingPrice = -1000;
    console.log(`Honda Accord price after invalid set: $${hondaAccord.listingPrice}`);

    console.log("\n=== Demo Complete ===");
  }
}

Program.main();
