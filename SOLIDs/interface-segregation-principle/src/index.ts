import type { Printer, Scanner } from './interfaces';
import { SimplePrinter, MultiFunctionPrinter, PremiumPrinter } from './devices';

function printDocument(printer: Printer, doc: string): void {
  printer.print(doc);
}

function scanAndEmail(scanner: Scanner, doc: string): void {
  scanner.scan(doc);
  console.log('Emailing scanned document...');
}

const simple = new SimplePrinter();
const multi = new MultiFunctionPrinter();
const premium = new PremiumPrinter();

printDocument(simple, 'Report from simple printer');
printDocument(multi, 'Report from multi-function printer');
printDocument(premium, 'Invoice from premium printer');

scanAndEmail(multi, 'Contract to scan and email');
scanAndEmail(premium, 'Premium contract to scan and email');

scanAndEmail(simple, 'This will not compile');
