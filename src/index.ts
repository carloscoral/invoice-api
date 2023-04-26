import { App } from './providers/app';
import { Database } from './providers/database';
import { Express } from './providers/express';
import { Locals } from './providers/locals';
import { Log4jsLogger } from './providers/log4js.logger';

function init() {
  const envVars = Locals.getConfig();
  const locals = new Locals();
  const logger = new Log4jsLogger(envVars.loggerLevel);
  const app = new App(
    {
      database: new Database(envVars.mongoUrl, logger),
      server: new Express(locals, logger),
    },
    logger
  );
  app.init();
}

init();
