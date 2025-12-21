/**
 * Printer - Interface for printing operations
 * Single Responsibility: Defining contract for printing pages
 */
export interface Printer {
    printPage(page: string): void;
}

