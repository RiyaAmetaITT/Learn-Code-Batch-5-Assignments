export interface Printer {
  print(document: string): void;
}

export interface Scanner {
  scan(document: string): void;
}

export interface FaxMachine {
  fax(document: string): void;
}

export interface Stapler {
  staple(document: string): void;
}
