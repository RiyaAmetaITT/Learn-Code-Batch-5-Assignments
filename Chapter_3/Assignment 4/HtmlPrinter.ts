import { Printer } from './Printer';

/**
 * HtmlPrinter - Handles HTML page printing
 * Single Responsibility: HTML output formatting and printing
 */
export class HtmlPrinter implements Printer {
    printPage(page: string): void {
        console.log(`<div style="single-page">${page}</div>`);
    }
}

