import { Initializable } from '../interfaces/initializable';
import { Logger } from '../interfaces/logger';

export interface AppInitializables {
  database: Initializable;
  server: Initializable;
}

export class App implements Initializable {
  constructor(private initializables: AppInitializables, private logger: Logger) {}

  async init() {
    try {
      await this.initializables.database.init();
      await this.initializables.server.init();
    } catch (e) {
      this.logger.fatal(e);
    }
  }
}
