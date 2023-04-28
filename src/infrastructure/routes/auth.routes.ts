import { Application, Router } from 'express';
import { Routes } from './routes';
import { Logger } from '../../domain/models/logger';
import { AuthController } from '../controllers.ts/auth.controller';

export class AuthRoutes extends Routes {
  constructor(private authController: AuthController, logger: Logger) {
    super(logger);
  }

  mount(app: Application): Application {
    this.logger.info('Mounting AuthRoutes');

    const router = Router();

    router.post('/sign-in', (req, res, next) => this.authController.signIn(req, res, next));

    app.use('/auth', router);
    return app;
  }
}
