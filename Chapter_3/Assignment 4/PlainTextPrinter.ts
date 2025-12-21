import { Printer } from './Printer';

/**
 * PlainTextPrinter - Handles plain text page printing
 * Single Responsibility: Plain text output formatting and printing
 */
export class PlainTextPrinter implements Printer {
    printPage(page: string): void {
        console.log(page);
    }
}

