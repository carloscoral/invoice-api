import { createClient } from 'redis';
import { Logger } from '../../domain/models/logger';
import { Locals } from './locals';

export class RedisClient {

  client = createClient({
    url: Locals.getConfig().redisUrl
  });

  constructor(private logger: Logger) {}

  async set(key: string, value: any) {
    try {
      await this.client.connect();
      await this.client.set(key, JSON.stringify(value));
      await this.client.expire(key, 5);
    } catch (e) {
      this.logger.error(e);
      this.logger.error('Cache not working');
    } finally {
      this.client.disconnect();
    }
  }

  async get<T>(key: string): Promise<T|null> {
    try {
      await this.client.connect();
      const result = await this.client.get(key);
      await this.client.expire(key, 5);
      return result ? JSON.parse(result): null;
    } catch (e) {
      this.logger.error(e);
      this.logger.error('Cache not working');
      return null;
    } finally {
      this.client.disconnect();
    }
  }
}
