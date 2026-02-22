import * as fs from "fs";

export class Logger {
    private static readonly DEFAULT_LOG_FILE = "processing.log";

    private _logFilePath: string;
    private _logBuffer: string[] = [];

    constructor(logFilePath: string = Logger.DEFAULT_LOG_FILE) {
        this._logFilePath = logFilePath;
    }

    log(message: string): void {
        const timestamp = new Date().toISOString().replace("T", " ").substring(0, 19);
        this._logBuffer.push(`[${timestamp}] ${message}`);
    }

    flush(): void {
        fs.writeFileSync(this._logFilePath, this._logBuffer.join("\n"));
    }
}
