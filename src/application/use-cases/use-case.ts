import { Logger } from '../../domain/models/logger';

export abstract class UseCase<T> {

  constructor(protected logger: Logger) {}

  abstract execute(params: T): Promise<void|T>|void;
}