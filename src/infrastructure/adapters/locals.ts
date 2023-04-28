import { Application } from 'express';
import * as dotenv from 'dotenv';
import { Initializable } from '../interfaces/initializable';

export class Locals extends Initializable<Application> {
  init(express: Application): Application {
    express.locals.app = Locals.getConfig();
    return express;
  }

  static getConfig() {
    dotenv.config();

    const mongoUrl = process.env.MONGO_URL || '';
    const mongoDatabase = process.env.MONGO_DATABASE || 'billing';
    const loggerLevel = process.env.LOGGER_LEVEL || 'off';
    const port = process.env.PORT || 3000;
    const corsUrl = process.env.CORS_URL || '';

    return {
      mongoUrl,
      mongoDatabase,
      loggerLevel,
      port,
      corsUrl,
    };
  }
}
