import { Application } from 'express';
import { Initializable } from '../interfaces/initializable';
import { Mountable } from '../interfaces/mountable';

export class MiddlewareBootstrap extends Initializable<Application> {
  constructor(private middlewares: Mountable<Application>[]) {
    super();
  }

  init(express: Application) {
    for (const middleware of this.middlewares) {
      express = middleware.mount(express);
    }
    return express;
  }
}
