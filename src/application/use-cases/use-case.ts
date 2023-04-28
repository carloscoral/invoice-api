import { Logger } from '../../domain/models/logger';

export abstract class UseCase<T> {

  constructor(protected logger: Logger) {}

  abstract execute(params: unknown): Promise<void|T>|void;
}
