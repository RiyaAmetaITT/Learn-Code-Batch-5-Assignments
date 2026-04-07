import { ATMException } from "./ATMException";

export class DeviceLockedException extends ATMException {
    constructor() {
        super("Device is currently locked or suspended.");
        this.name = "DeviceLockedException";
    }

    public getLogMessage(): string {
        return "Withdrawal Failed: The ATM device is currently locked.";
    }
}

