import express, { Application } from 'express';
import { Initializable } from '../interfaces/initializable';
import { Logger } from '../interfaces/logger';
import { Locals } from './locals';
import { Mountable } from '../interfaces/mountable';
import { CorsMiddleware } from '../middlewares/cors.middleware';
import { MiddlewareBootstrap } from '../middlewares/middleware-bootstrap';
import { HttpMiddleware } from '../middlewares/http.middleware';
import { InvoiceModel } from '../models/invoice.model';
import mongoose from 'mongoose';

export class Express extends Initializable<void> {
  public express: express.Application;

  constructor(private locals: Locals, private logger: Logger) {
    super();
    this.express = express();
    this.mountMiddlewares();
    this.mountRoutes();
  }

  loadEnv() {
    this.logger.info('Loading express env');
    this.express = this.locals.init(this.express);
  }

  mountMiddlewares() {
    this.logger.info('Mounting middlewares');
    const middlewares: Mountable<Application>[] = [
      new CorsMiddleware(this.logger),
      new HttpMiddleware(this.logger)
    ];
    const bootstrap = new MiddlewareBootstrap(middlewares);
    this.express = bootstrap.init(this.express);
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
