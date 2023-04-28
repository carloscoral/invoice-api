import { App } from './infrastructure/adapters/app';
import { Database } from './infrastructure/adapters/database';
import { Express } from './infrastructure/adapters/express';
import { Locals } from './infrastructure/adapters/locals';
import { Log4jsLogger } from './infrastructure/adapters/log4js.logger';

function init() {
  const envVars = Locals.getConfig();
  const locals = new Locals();
  const logger = new Log4jsLogger(envVars.loggerLevel);
  const app = new App(
    {
      database: new Database(envVars.mongoUrl, envVars.mongoDatabase, logger),
      server: new Express(locals, logger),
    },
    logger,
  );
  app.init();
}

init();
