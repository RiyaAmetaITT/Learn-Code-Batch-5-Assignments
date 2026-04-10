export class TerminalStyler {
  static readonly RESET = '\x1b[0m';
  static readonly BOLD = '\x1b[1m';
  static readonly CYAN = '\x1b[36m';
  static readonly RED = '\x1b[31m';
  static readonly GREEN = '\x1b[32m';
  static readonly YELLOW = '\x1b[33m';
  static readonly BLUE = '\x1b[34m';

  static colorize(text: string, color: string, bold = false): string {
    return `${bold ? this.BOLD : ''}${color}${text}${this.RESET}`;
  }
}
