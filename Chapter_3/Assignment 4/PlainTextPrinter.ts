import { Printer } from './Printer';

export class PlainTextPrinter implements Printer {
    printPage(page: string): void {
        console.log(page);
    }
}

