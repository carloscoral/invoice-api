import express, { Application, Router } from 'express';
import { Initializable } from '../interfaces/initializable';
import { Logger } from '../../domain/models/logger';
import { Locals } from './locals';
import { Mountable } from '../interfaces/mountable';
import { CorsMiddleware } from '../middlewares/cors.middleware';
import { MiddlewareBootstrap } from '../middlewares/middleware-bootstrap';
import { HttpMiddleware } from '../middlewares/http.middleware';
import { CreateInvoiceUseCase } from '../../application/use-cases/create-invoice.use-case';
import { InvoiceRepositoryImpl } from '../repositories/invoice.repository';
import { Repositories } from '../interfaces/repositories';
import { UseCases } from '../interfaces/use-cases';
import { Controllers } from '../interfaces/controllers';
import { InvoiceController } from '../controllers.ts/invoice.controller';
import { Routes } from '../routes/routes';
import { InvoiceRoutes } from '../routes/invoice.routes';
import { ErrorHandlingMiddleware } from '../middlewares/error-handling.middleware';


export class Express extends Initializable<void> {
  public express: express.Application;

  constructor(private locals: Locals, private logger: Logger) {
    super();
    this.express = express();
    this.mountMiddlewares();
    this.mountRoutes();
    this.mountPostMiddlewares();
  }

  mountMiddlewares() {
    this.logger.info('Mounting middlewares');
    const middlewares: Mountable<Application>[] = [
      new CorsMiddleware(this.logger),
      new HttpMiddleware(this.logger)
    ];
    const bootstrap = new MiddlewareBootstrap(middlewares);
    this.express = bootstrap.init(this.express);
  }

  mountPostMiddlewares() {
    this.logger.info('Mounting post middlewares');
    const middlewares: Mountable<Application>[] = [
      new ErrorHandlingMiddleware(this.logger)
    ];
    const bootstrap = new MiddlewareBootstrap(middlewares);
    this.express = bootstrap.init(this.express);
  }

  initRepositories() {
    this.logger.info('Init repositories');
    return {
      invoiceRepository: new InvoiceRepositoryImpl(this.logger)
    };
  }

  initUseCases(repositories: Repositories): UseCases {
    this.logger.info('Init use cases');
    return {
      createInvoiceUseCase: new CreateInvoiceUseCase(repositories.invoiceRepository, this.logger)
    }
  }

  initControllers(useCases: UseCases): Controllers {
    this.logger.info('Init controllers');
    return {
      invoiceController: new InvoiceController(useCases.createInvoiceUseCase, this.logger)
    };
  }

  mountRoutes() {
    this.logger.info('Mounting routes');
    const repositories = this.initRepositories();
    const useCases = this.initUseCases(repositories);
    const controllers = this.initControllers(useCases);
    const routes: Routes[] = [
      new InvoiceRoutes(controllers.invoiceController, this.logger)
    ];
    for(const route of routes) {
      this.express = route.mount(this.express);
    }
  }

  init(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.logger.info('Express init');
      const port = Locals.getConfig().port;
      const server = this.express.listen(port, () => {
        this.logger.info('Server running on port', port);
        resolve();
      });
      server.on('error', (error) => {
        reject(error);
      });
    });
  }
}
