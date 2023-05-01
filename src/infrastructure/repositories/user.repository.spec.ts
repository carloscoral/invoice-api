import { Logger } from '../../domain/models/logger';
import { UserRepositoryImpl } from './user.repository';

class LoggerStub extends Logger {
  debug(message: unknown, ...args: unknown[]): void {}
  info(message: unknown, ...args: unknown[]): void {}
  warn(message: unknown, ...args: unknown[]): void {}
  error(message: unknown, ...args: unknown[]): void {}
  fatal(message: unknown, ...args: unknown[]): void {}
}

describe('Sign in use case tests', () => {
  const logger = new LoggerStub('');

  it('Must return a user', async () => {
    const userRepository = new UserRepositoryImpl(logger);
    const result = await userRepository.findByUsernameAndPassword('admin', 'admin');
    expect(result).toBeDefined();
    expect(result.id).toBe(1);
    expect(result.username).toBe('Admin');
  });

  it('Must return null', async () => {
    const userRepository = new UserRepositoryImpl(logger);
    const result = await userRepository.findByUsernameAndPassword('', '');
    expect(result).toBeDefined();
    expect(result).toBeNull();
  });
})