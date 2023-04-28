import { Logger } from '../../domain/models/logger';
import { Application } from 'express';
import { Mountable } from '../interfaces/mountable';

export abstract class Routes extends Mountable<Application> {
  constructor(protected logger: Logger) {
    super();
  }
}
