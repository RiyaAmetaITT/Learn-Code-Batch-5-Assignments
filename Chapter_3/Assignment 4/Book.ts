import { BookMetadata } from './BookMetadata';
import { BookPageManager } from './BookPageManager';
import { BookLocation } from './BookLocation';
import { BookFileSaver } from './BookFileSaver';

export class Book {
    private metadata: BookMetadata;
    private pageManager: BookPageManager;
    private location: BookLocation;
    private fileSaver: BookFileSaver;

    constructor(
        metadata: BookMetadata,
        pageManager: BookPageManager,
        location: BookLocation,
        fileSaver: BookFileSaver
    ) {
        this.metadata = metadata;
        this.pageManager = pageManager;
        this.location = location;
        this.fileSaver = fileSaver;
    }

    getTitle(): string {
        return this.metadata.getTitle();
    }

    getAuthor(): string {
        return this.metadata.getAuthor();
    }

    turnPage(): void {
        this.pageManager.turnPage();
    }

    getCurrentPage(): string {
        return this.pageManager.getCurrentPage();
    }

    getLocation(): string {
        return this.location.getLocation();
    }

    save(): void {
        const bookData = {
            title: this.metadata.getTitle(),
            author: this.metadata.getAuthor(),
            location: this.location.getLocation(),
            currentPage: this.pageManager.getCurrentPage()
        };
        this.fileSaver.save(this.metadata, bookData);
    }
}
