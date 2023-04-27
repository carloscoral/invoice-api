import { Initializable } from '../interfaces/initializable';
import { Logger } from '../../domain/models/logger';

export interface AppInitializables {
  database: Initializable<void>;
  server: Initializable<void>;
}

export class App implements Initializable<void> {
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
