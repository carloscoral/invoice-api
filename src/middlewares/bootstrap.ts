import { Application } from 'express';
import { Initializable } from '../interfaces/initializable';

export class MiddlewaresBootstrap extends Initializable {
  init(express: Application) {
    // not-empty
  }
}
