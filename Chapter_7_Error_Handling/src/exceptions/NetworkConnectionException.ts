import { ATMException } from "./ATMException";

export class NetworkConnectionException extends ATMException {
    constructor() {
        super("Device network connection failed.");
        this.name = "NetworkConnectionException";
    }

    public getLogMessage(): string {
        return "Withdrawal Failed: No network connection to the server.";
    }
}

