import { Controller } from './controller';
import { Logger } from '../../domain/models/logger';
import { NextFunction, Request, Response } from 'express';
import { SignInUseCase } from '../../application/use-cases/auth/sign-in.use-case';
import { signInValidator } from '../validators/sign-in.validator';
import { Locals } from '../adapters/locals';

export class AuthController extends Controller {
  constructor(
    private signInUseCase: SignInUseCase,
    logger: Logger,
  ) {
    super(logger);
    logger.info('Init AuthController');
  }

  async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const credentials = signInValidator.validateSync(req.body, { abortEarly: false, stripUnknown: true });
      const { jwtSecret } = Locals.getConfig();
      const token = await this.signInUseCase.execute({ ...credentials, secret: jwtSecret });
      if (token) {
        return res.json({
          type: 'Bearer',
          token
        });
      }
      return res.status(401).json({ error: 'Not Authorized' });
    } catch (e) {
      next(e);
    }
  }
}
