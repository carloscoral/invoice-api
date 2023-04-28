import * as jwt from 'jsonwebtoken';
import { Logger } from '../../domain/models/logger';
import { Application, NextFunction, Request, Response } from 'express';
import { Mountable } from '../interfaces/mountable';
import { Locals } from '../adapters/locals';

export class AuthMiddleware extends Mountable<Application> {
  constructor(private logger: Logger) {
    super();
  }

  static verifyAuth(req: Request, res: Response, next: NextFunction) {
    const { jwtSecret } = Locals.getConfig();
    const { authorization } = req.headers;
    if (authorization) {
      const [type, token] = authorization.split(' ');
      if (type === 'Bearer' && token) {
        try {
          jwt.verify(token, jwtSecret);
          return next();
        } catch (e) {
          return res.status(401).json({ error: 'Not Authorized' });
        }
      }
    }
    return res.status(401).json({ error: 'Not Authorized' });
  }

  mount(app: Application): Application {
    this.logger.info('Mounting AuthMiddleware');
    app = app.use((req: Request, res: Response, next: NextFunction) => AuthMiddleware.verifyAuth(req, res, next));
    return app;
  }
}
