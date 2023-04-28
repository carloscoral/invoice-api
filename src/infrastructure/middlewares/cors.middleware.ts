import { Application } from 'express';
import cors, { CorsOptions } from 'cors';
import { Mountable } from '../interfaces/mountable';
import { Locals } from '../adapters/locals';
import { Logger } from '../../domain/models/logger';

export class CorsMiddleware extends Mountable<Application> {
  constructor(private logger: Logger) {
    super();
  }

  mount(app: Application): Application {
    this.logger.info('Mounting CorsMiddlware');
    const options: CorsOptions = {
      optionsSuccessStatus: 200,
      origin: Locals.getConfig().corsUrl,
      credentials: true,
    };
    app.use(cors(options));
    return app;
  }
}
