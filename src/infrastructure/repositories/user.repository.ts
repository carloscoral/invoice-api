import { User } from 'domain/models/user';
import { UserRepository } from '../../domain/repositories/user.repository';

export class UserRepositoryImpl extends UserRepository {
  async findByUsernameAndPassword(username: string, password: string): Promise<User | null> {
    // TODO implement connection with mongo database
    if (username === 'admin' && password === 'admin') {
      return {
        id: 1,
        username: 'Admin',
      };
    }
    return null;
  }
}
