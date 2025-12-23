import type { Printer, Scanner, FaxMachine, Stapler } from './interfaces';

export class SimplePrinter implements Printer {
  print(document: string): void {
    console.log(`Printing: ${document}`);
  }
}

export class MultiFunctionPrinter implements Printer, Scanner, FaxMachine {
  print(document: string): void {
    console.log(`Printing: ${document}`);
  }

  scan(document: string): void {
    console.log(`Scanning: ${document}`);
  }

  fax(document: string): void {
    console.log(`Faxing: ${document}`);
  }
}

export class PremiumPrinter implements Printer, Scanner, FaxMachine, Stapler {
  print(document: string): void {
    console.log(`Printing: ${document}`);
  }

  scan(document: string): void {
    console.log(`Scanning: ${document}`);
  }

  fax(document: string): void {
    console.log(`Faxing: ${document}`);
  }

  staple(document: string): void {
    console.log(`Stapling: ${document}`);
  }
}
