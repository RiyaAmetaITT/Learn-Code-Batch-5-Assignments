import { BookMetadata } from './BookMetadata';

export class BookFileNameGenerator {
    generateFileName(metadata: BookMetadata): string {
        const title = metadata.getTitle();
        const author = metadata.getAuthor();
        return `/documents/${title} - ${author}`;
    }
}

