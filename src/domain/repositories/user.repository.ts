import { User } from '../models/user';
import { Invoice } from '../models/invoice';
import { Logger } from '../models/logger';

export abstract class UserRepository {
  constructor(protected logger: Logger) {}

  abstract findByUsernameAndPassword(username: string, password: string): Promise<User|null>;
}
