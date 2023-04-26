import { Application } from 'express';
import cors, { CorsOptions } from 'cors';
import { Mountable } from '../interfaces/mountable';
import { Locals } from '../providers/locals';
import { Logger } from '../interfaces/logger';

export class CorsMiddleware extends Mountable {
  
  constructor(private logger: Logger) {
    super();
  }

  mount(app: Application): Application {
    this.logger.info('Mounting CorsMiddlware');
    const options: CorsOptions = {
      optionsSuccessStatus: 200,
      origin: Locals.getConfig().corsUrl,
      credentials: true
    };
    app.use(cors(options));
    return app;
  }

}