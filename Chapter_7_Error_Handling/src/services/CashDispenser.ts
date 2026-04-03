import { DeviceHandle } from "../types/device";
import { ICashDispenser, IHardwareDispenser } from "../interfaces";

export class CashDispenser implements ICashDispenser {
    private readonly hardwareDispenser: IHardwareDispenser;

    constructor(hardwareDispenser: IHardwareDispenser) {
        this.hardwareDispenser = hardwareDispenser;
    }

    public dispense(handle: DeviceHandle, amount: number): void {
        this.hardwareDispenser.dispenseCash(handle, amount);
    }
}
