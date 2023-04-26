import { Application } from 'express';

export abstract class Initializable {
  abstract init(app?: Application): Application | void | Promise<Application | void>;
}
