import { IErrorHandler } from "../interfaces";
import { ATMException } from "../exceptions/ATMException";

export class ErrorHandler implements IErrorHandler {
    public handle(error: unknown): void {
        if (error instanceof ATMException) {
            console.error(error.getLogMessage());
        } else if (error instanceof Error) {
            console.error("Withdrawal Failed: An unexpected error occurred.", error.message);
            throw error;
        } else {
            console.error("Withdrawal Failed: An unknown system error occurred.", error);
            throw error;
        }
    }
}

