
import { Logger } from '../../../domain/models/logger';
import { UserRepositoryImpl } from '../../../infrastructure/repositories/user.repository';
import { SignInUseCase } from './sign-in.use-case';
import * as jwt from 'jsonwebtoken';

jest.mock('jsonwebtoken');
jest.mock('../../../infrastructure/repositories/user.repository');


class LoggerStub extends Logger {
  debug(message: unknown, ...args: unknown[]): void {}
  info(message: unknown, ...args: unknown[]): void {}
  warn(message: unknown, ...args: unknown[]): void {}
  error(message: unknown, ...args: unknown[]): void {}
  fatal(message: unknown, ...args: unknown[]): void {}
}

describe('Sign in use case tests', () => {
  const logger = new LoggerStub('');
  const userRepository = new UserRepositoryImpl(logger);

  it('Must generate jwt', async () => {
    (jwt.sign as jest.Mock).mockReturnValue('Token');
    (userRepository.findByUsernameAndPassword as jest.Mock).mockReturnValue({
      id: 1,
      username: 'Admin'
    });

    const useCase = new SignInUseCase(userRepository, logger);
    const result = await useCase.execute({ username: 'admin', password: 'admin', secret: 'Secret' });
    expect(result).toBeDefined();
    expect(result).toBe('Token');
    expect(jwt.sign).toHaveBeenCalledTimes(1);
    expect(userRepository.findByUsernameAndPassword).toHaveBeenCalledTimes(1);
    (jwt.sign as jest.Mock).mockClear();
    (userRepository.findByUsernameAndPassword as jest.Mock).mockClear();
  });

  it('Must not generate jwt', async () => {
    (jwt.sign as jest.Mock).mockReturnValue('Token');
    (userRepository.findByUsernameAndPassword as jest.Mock).mockReturnValue(null);

    const useCase = new SignInUseCase(userRepository, logger);
    const result = await useCase.execute({ username: 'admin', password: 'admin', secret: 'Secret' });
    expect(result).toBeDefined();
    expect(result).not.toBe('Token');
    expect(jwt.sign).not.toHaveBeenCalled();
    (jwt.sign as jest.Mock).mockClear();
    (userRepository.findByUsernameAndPassword as jest.Mock).mockClear();
  });
})