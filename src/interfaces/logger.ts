export abstract class Logger {
  constructor(protected level: string) {}
  abstract debug(message: any, ...args: any[]): void;
  abstract info(message: any, ...args: any[]): void;
  abstract warn(message: any, ...args: any[]): void;
  abstract error(message: any, ...args: any[]): void;
  abstract fatal(message: any, ...args: any[]): void;
}
