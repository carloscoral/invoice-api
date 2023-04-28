import * as jwt from 'jsonwebtoken';
import { UseCase } from '../use-case';
import { Logger } from '../../../domain/models/logger';
import { UserRepository } from '../../../domain/repositories/user.repository';
import { Credentials } from '../../../domain/models/credentials';

export class SignInUseCase extends UseCase<string | null> {
  constructor(private userRepository: UserRepository, logger: Logger) {
    super(logger);
    logger.info('Init SignInUseCase');
  }

  async execute(credentials: Credentials): Promise<string | null> {
    this.logger.debug('Execute SignInUseCase');
    const user = await this.userRepository.findByUsernameAndPassword(credentials.username, credentials.password);
    if (user) {
      return jwt.sign(
        {
          sub: user.id,
          username: user.username,
        },
        credentials.secret,
        { expiresIn: 86400 },
      );
    }
    return null;
  }
}
