import { InsufficientFundsException } from "../exceptions/InsufficientFundsException";
import { IAccountValidator, IAccountService } from "../interfaces";

export class AccountValidator implements IAccountValidator {
    private readonly accountService: IAccountService;

    constructor(accountService: IAccountService) {
        this.accountService = accountService;
    }

    public ensureSufficientFunds(accountId: string, amount: number): void {
        if (this.accountService.getBalance(accountId) < amount) {
            throw new InsufficientFundsException();
        }
    }
}
