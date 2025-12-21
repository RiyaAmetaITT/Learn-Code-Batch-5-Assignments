/**
 * BookMetadata - Handles book information storage
 * Single Responsibility: Managing book metadata (title, author)
 */
export class BookMetadata {
    private title: string;
    private author: string;

    constructor(title: string, author: string) {
        this.title = title;
        this.author = author;
    }

    getTitle(): string {
        return this.title;
    }

    getAuthor(): string {
        return this.author;
    }
}

