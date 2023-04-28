import { Logger } from '../../domain/models/logger';
import { Application, NextFunction, Request, Response } from 'express';
import { Mountable } from '../interfaces/mountable';
import { ValidationError } from 'yup';

export class ErrorHandlingMiddleware extends Mountable<Application> {
  constructor(private logger: Logger) {
    super();
  }

  handleError(error: Error, req: Request, res: Response, _: NextFunction) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ error: error.errors });
    } else {
      this.logger.error(error);
      return res.status(500).json({ error: 'Something went wrong' });
    }
  }

  mount(app: Application): Application {
    this.logger.info('Mounting ErrorHandlingMiddleware');
    app = app.use((error: Error, req: Request, res: Response, next: NextFunction) =>
      this.handleError(error, req, res, next),
    );
    return app;
  }
}
