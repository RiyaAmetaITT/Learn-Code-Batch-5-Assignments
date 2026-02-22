import { FileOperations } from "../services/FileOperations";

export class SampleDataGenerator {
    static generateSampleData(filePath: string, recordCount: number): void {
        const lines: string[] = [];
        for (let i = 1; i <= recordCount; i++) {
            const id = `ID${i.toString().padStart(4, "0")}`;
            const name = `Item${i}`;
            const value = Math.floor(Math.random() * (1000 - 10) + 10);
            const date = new Date(Date.now() - Math.floor(Math.random() * 365) * 86400000);
            lines.push(`${id},${name},${value},${date.toISOString().split("T")[0]}`);
        }
        FileOperations.write(filePath, lines.join("\n"));
        console.log(`Generated ${recordCount} sample records in ${filePath}`);
    }
}
