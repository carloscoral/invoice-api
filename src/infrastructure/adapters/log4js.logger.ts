import * as log4js from 'log4js';
import { Logger } from '../../domain/models/logger';

export class Log4jsLogger extends Logger {
  static logger?: log4js.Logger;

  constructor(level: string) {
    super(level);
  }

  getLogger(): log4js.Logger {
    if (Log4jsLogger.logger) return Log4jsLogger.logger;
    log4js.configure({
      appenders: {
        out: { type: 'stdout' },
      },
      categories: {
        default: { appenders: ['out'], level: this.level },
      },
    });
    Log4jsLogger.logger = log4js.getLogger();
    return Log4jsLogger.logger;
  }

  debug(message: unknown, ...args: unknown[]): void {
    this.getLogger().debug(message, ...args);
  }

  info(message: unknown, ...args: unknown[]): void {
    this.getLogger().info(message, ...args);
  }

  warn(message: unknown, ...args: unknown[]): void {
    this.getLogger().warn(message, ...args);
  }

  error(message: unknown, ...args: unknown[]): void {
    this.getLogger().error(message, ...args);
  }

  fatal(message: unknown, ...args: unknown[]): void {
    this.getLogger().fatal(message, ...args);
  }
}
