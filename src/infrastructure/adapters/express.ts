import express, { Application } from 'express';
import { Initializable } from '../interfaces/initializable';
import { Logger } from '../../domain/models/logger';
import { Locals } from './locals';
import { Mountable } from '../interfaces/mountable';
import { CorsMiddleware } from '../middlewares/cors.middleware';
import { MiddlewareBootstrap } from '../middlewares/middleware-bootstrap';
import { HttpMiddleware } from '../middlewares/http.middleware';
import { CreateInvoiceUseCase } from '../../application/use-cases/invoice/create-invoice.use-case';
import { InvoiceRepositoryImpl } from '../repositories/invoice.repository';
import { Repositories } from '../interfaces/repositories';
import { UseCases } from '../interfaces/use-cases';
import { Controllers } from '../interfaces/controllers';
import { InvoiceController } from '../controllers.ts/invoice.controller';
import { Routes } from '../routes/routes';
import { InvoiceRoutes } from '../routes/invoice.routes';
import { ErrorHandlingMiddleware } from '../middlewares/error-handling.middleware';
import { UpdateInvoiceUseCase } from '../../application/use-cases/invoice/update-invoice.use-case';
import { DeleteInvoiceUseCase } from '../../application/use-cases/invoice/delete-invoice.use-case';
import { FindInvoiceUseCase } from '../../application/use-cases/invoice/find-invoice.use-case';
import { FindInvoiceByIdUseCase } from '../../application/use-cases/invoice/find-invoice-by-id.use-case';
import { AuthController } from '../controllers.ts/auth.controller';
import { AuthRoutes } from '../routes/auth.routes';
import { SignInUseCase } from '../../application/use-cases/auth/sign-in.use-case';
import { UserRepositoryImpl } from '../repositories/user.repository';

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
    const middlewares: Mountable<Application>[] = [new CorsMiddleware(this.logger), new HttpMiddleware(this.logger)];
    const bootstrap = new MiddlewareBootstrap(middlewares);
    this.express = bootstrap.init(this.express);
  }

  mountPostMiddlewares() {
    this.logger.info('Mounting post middlewares');
    const middlewares: Mountable<Application>[] = [new ErrorHandlingMiddleware(this.logger)];
    const bootstrap = new MiddlewareBootstrap(middlewares);
    this.express = bootstrap.init(this.express);
  }

  initRepositories(): Repositories {
    this.logger.info('Init repositories');
    return {
      invoiceRepository: new InvoiceRepositoryImpl(this.logger),
      userRepository: new UserRepositoryImpl(this.logger),
    };
  }

  initUseCases(repositories: Repositories): UseCases {
    this.logger.info('Init use cases');
    return {
      createInvoiceUseCase: new CreateInvoiceUseCase(repositories.invoiceRepository, this.logger),
      updateInvoiceUseCase: new UpdateInvoiceUseCase(repositories.invoiceRepository, this.logger),
      deleteInvoiceUseCase: new DeleteInvoiceUseCase(repositories.invoiceRepository, this.logger),
      findInvoiceUseCase: new FindInvoiceUseCase(repositories.invoiceRepository, this.logger),
      findInvoiceByIdUseCase: new FindInvoiceByIdUseCase(repositories.invoiceRepository, this.logger),
      signInUseCase: new SignInUseCase(repositories.userRepository, this.logger),
    };
  }

  initControllers(useCases: UseCases): Controllers {
    this.logger.info('Init controllers');
    return {
      invoiceController: new InvoiceController(
        useCases.createInvoiceUseCase,
        useCases.updateInvoiceUseCase,
        useCases.deleteInvoiceUseCase,
        useCases.findInvoiceUseCase,
        useCases.findInvoiceByIdUseCase,
        this.logger,
      ),
      authController: new AuthController(
        useCases.signInUseCase,
        this.logger,
      ),
    };
  }

  mountRoutes() {
    this.logger.info('Mounting routes');
    const repositories = this.initRepositories();
    const useCases = this.initUseCases(repositories);
    const controllers = this.initControllers(useCases);
    const routes: Routes[] = [
      new InvoiceRoutes(controllers.invoiceController, this.logger),
      new AuthRoutes(controllers.authController, this.logger),
    ];
    for (const route of routes) {
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
