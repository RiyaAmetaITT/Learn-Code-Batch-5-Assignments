import { BookMetadata } from './BookMetadata';

/**
 * BookFileNameGenerator - Handles file name generation
 * Single Responsibility: Generating file names for book persistence
 */
export class BookFileNameGenerator {
    generateFileName(metadata: BookMetadata): string {
        const title = metadata.getTitle();
        const author = metadata.getAuthor();
        return `/documents/${title} - ${author}`;
    }
}

