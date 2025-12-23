export class BookPageManager {
    private currentPageNumber: number = 0;
    private pages: string[] = [];

    constructor(pages: string[] = []) {
        this.pages = pages;
    }

    turnPage(): void {
        if (this.currentPageNumber < this.pages.length - 1) {
            this.currentPageNumber++;
        }
    }

    getCurrentPage(): string {
        if (this.pages.length === 0) {
            return "current page content";
        }
        return this.pages[this.currentPageNumber] || "current page content";
    }
}

