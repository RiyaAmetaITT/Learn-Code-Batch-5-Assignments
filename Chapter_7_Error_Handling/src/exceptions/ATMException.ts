export abstract class ATMException extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ATMException";
    }

    public abstract getLogMessage(): string;
}

