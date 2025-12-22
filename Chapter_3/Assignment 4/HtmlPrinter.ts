import { Printer } from './Printer';

export class HtmlPrinter implements Printer {
    printPage(page: string): void {
        console.log(`<div style="single-page">${page}</div>`);
    }
}

