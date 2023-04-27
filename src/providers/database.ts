import mongoose from 'mongoose';
import { Initializable } from '../interfaces/initializable';
import { Logger } from '../interfaces/logger';

export class Database extends Initializable<void> {
  constructor(private url: string, private db: string, private logger: Logger) {
    super();
  }

  async init() {
    this.logger.info('Connecting to mongo database...');
    await mongoose.connect(this.url, {
      dbName: this.db
    });
    this.logger.info('Mongo database connected');
  }
}
