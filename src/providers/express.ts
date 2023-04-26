import express from 'express';
import { Initializable } from '../interfaces/initializable';
import { Logger } from '../interfaces/logger';
import { Locals } from './locals';

export class Express extends Initializable {
  public express: express.Application;

  constructor(private locals: Locals, private logger: Logger) {
    super();
    this.express = express();
    this.mountMiddlewares();
    this.mountRoutes();
  }

  loadEnv() {
    this.logger.info('Loading express env');
    const express = this.locals.init(this.express);
    this.express = express || this.express;
  }

  mountMiddlewares() {
    this.logger.info('Mounting middlewares');
  }

  mountRoutes() {
    this.logger.info('Mounting routes');
  }

  init(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.logger.info('Express init');
      const port = Locals.getConfig().port;
      const server = this.express.listen(port, () => {
        this.logger.info('Server running on port', port);
        resolve();
      });
      server.on('error', (error) => {
        reject(error);
      });
    });
  }
}
