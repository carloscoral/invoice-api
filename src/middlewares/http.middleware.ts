import { Application } from 'express';
import * as bodyParser from 'body-parser';
import { Logger } from '../interfaces/logger';
import { Mountable } from '../interfaces/mountable';

export class HttpMiddleware extends Mountable<Application> {

  constructor(private logger: Logger) {
    super();
  }

  mount(app: Application): Application {
    this.logger.info('Mounting HttpMiddleware');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
      extended: false
    }));
    return app;
  }
}