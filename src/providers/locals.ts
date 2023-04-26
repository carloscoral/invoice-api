import { Application } from 'express';
import * as dotenv from 'dotenv';
import { Initializable } from '../interfaces/initializable';

export class Locals extends Initializable {
  init(express: Application): Application {
    express.locals.app = Locals.getConfig();
    return express;
  }

  static getConfig() {
    dotenv.config();

    const mongoUrl = process.env.MONGO_URL || '';
    const loggerLevel = process.env.LOGGER_LEVEL || 'off';
    const port = process.env.PORT || 3000;
    const corsUrl = process.env.CORS_URL || '';

    return {
      mongoUrl,
      loggerLevel,
      port,
      corsUrl
    };
  }
}
