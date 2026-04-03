import { ATMException } from "./ATMException";

export class InsufficientFundsException extends ATMException {
    constructor() {
        super("Account has insufficient funds.");
        this.name = "InsufficientFundsException";
    }

    public getLogMessage(): string {
        return "Withdrawal Failed: Insufficient funds in the account.";
    }
}
