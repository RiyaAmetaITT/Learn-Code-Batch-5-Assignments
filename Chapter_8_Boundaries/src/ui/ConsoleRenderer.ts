import { TerminalStyler as Style } from './TerminalStyler';
import { Location } from '../core/Location';

export class ConsoleRenderer {
  static printHeader(title: string): void {
    const line = Style.colorize('═'.repeat(60), Style.CYAN);
    console.log(`\n${line}`);
    console.log(Style.colorize(`  ${title}`, Style.CYAN, true));
    console.log(`${line}\n`);
  }

  static printLocation(loc: Location, index: number, total: number): void {
    console.log(Style.colorize(`  Result ${index + 1}/${total}`, Style.BLUE, true));
    console.log(`  Address: ${loc.formattedAddress}`);
    console.log(`  Coords : ${Style.colorize(`${loc.latitude}, ${loc.longitude}`, Style.GREEN)}`);
    console.log(`  Type   : ${Style.colorize(loc.type, Style.YELLOW)}\n`);
  }

  static printError(message: string): void {
    console.log(Style.colorize(`\n  ✖  Error: ${message}\n`, Style.RED));
  }

  static printInfo(message: string): void {
    console.log(Style.colorize(`  ℹ  ${message}`, Style.CYAN));
  }
}
