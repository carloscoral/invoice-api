import { Logger } from '../../domain/models/logger';

export abstract class Controller {
  constructor(protected logger: Logger) {}
}
