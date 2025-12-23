import { BookFileNameGenerator } from './BookFileNameGenerator';
import { BookMetadata } from './BookMetadata';

export interface FileSystem {
    writeFileSync(filename: string, data: string): void;
}

export class BookFileSaver {
    private fileNameGenerator: BookFileNameGenerator;
    private fileSystem: FileSystem;

    constructor(fileNameGenerator: BookFileNameGenerator, fileSystem: FileSystem) {
        this.fileNameGenerator = fileNameGenerator;
        this.fileSystem = fileSystem;
    }

    save(metadata: BookMetadata, bookData: object): void {
        const filename = this.fileNameGenerator.generateFileName(metadata);
        const serializedData = JSON.stringify(bookData);
        this.fileSystem.writeFileSync(filename, serializedData);
    }
}

