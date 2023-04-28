export abstract class Logger {
  constructor(protected level: string) {}
  abstract debug(message: unknown, ...args: unknown[]): void;
  abstract info(message: unknown, ...args: unknown[]): void;
  abstract warn(message: unknown, ...args: unknown[]): void;
  abstract error(message: unknown, ...args: unknown[]): void;
  abstract fatal(message: unknown, ...args: unknown[]): void;
}
