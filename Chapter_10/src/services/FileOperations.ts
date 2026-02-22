import * as fs from "fs";

export class FileOperations {
    static ensureFileExists(filePath: string): void {
        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, "");
        }
    }

    static readLines(filePath: string): string[] {
        return fs.readFileSync(filePath, "utf-8").split("\n");
    }

    static write(filePath: string, content: string): void {
        fs.writeFileSync(filePath, content);
    }
}
