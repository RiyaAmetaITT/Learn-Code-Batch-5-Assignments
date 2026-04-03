import { IDeviceValidator, IAccountValidator, ICashDispenser, IErrorHandler } from "../interfaces";

export class ATMDeviceController {
    private readonly deviceValidator: IDeviceValidator;
    private readonly accountValidator: IAccountValidator;
    private readonly cashDispenser: ICashDispenser;
    private readonly errorHandler: IErrorHandler;

    constructor(
        deviceValidator: IDeviceValidator,
        accountValidator: IAccountValidator,
        cashDispenser: ICashDispenser,
        errorHandler: IErrorHandler
    ) {
        this.deviceValidator = deviceValidator;
        this.accountValidator = accountValidator;
        this.cashDispenser = cashDispenser;
        this.errorHandler = errorHandler;
    }

    public withdraw(accountId: string, amount: number): void {
        try {
            this.processWithdrawal(accountId, amount);
        } catch (error) {
            this.errorHandler.handle(error);
        }
    }

    private processWithdrawal(accountId: string, amount: number): void {
        const handle = this.deviceValidator.validateAndGetHandle();
        
        this.accountValidator.ensureSufficientFunds(accountId, amount);
        
        this.cashDispenser.dispense(handle, amount);
    }
}
