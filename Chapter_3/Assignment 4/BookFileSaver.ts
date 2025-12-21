import { BookFileNameGenerator } from './BookFileNameGenerator';
import { BookMetadata } from './BookMetadata';

/**
 * FileSystem - Interface for file operations
 * Single Responsibility: Defining contract for file I/O operations
 */
export interface FileSystem {
    writeFileSync(filename: string, data: string): void;
}

/**
 * BookFileSaver - Handles file persistence operations
 * Single Responsibility: File I/O and serialization
 */
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

