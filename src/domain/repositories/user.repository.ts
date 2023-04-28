import { User } from '../models/user';
import { Logger } from '../models/logger';

export abstract class UserRepository {
  constructor(protected logger: Logger) {}

  abstract findByUsernameAndPassword(username: string, password: string): Promise<User | null>;
}
