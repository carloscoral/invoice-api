import { Application, Router } from 'express';
import { Routes } from './routes';
import { Logger } from '../../domain/models/logger';
import { InvoiceController } from '../controllers.ts/invoice.controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';

export class InvoiceRoutes extends Routes {
  constructor(private invoiceController: InvoiceController, logger: Logger) {
    super(logger);
  }

  mount(app: Application): Application {
    this.logger.info('Mounting InvoiceRoutes');

    const router = Router();

    router.get('', AuthMiddleware.verifyAuth, (req, res, next) => this.invoiceController.getInvoices(req, res, next));
    router.get('/:id', AuthMiddleware.verifyAuth, (req, res, next) =>
      this.invoiceController.getInvoice(req, res, next),
    );
    router.post('', AuthMiddleware.verifyAuth, (req, res, next) =>
      this.invoiceController.createInvoice(req, res, next),
    );
    router.put('/:id', AuthMiddleware.verifyAuth, (req, res, next) =>
      this.invoiceController.updateInvoice(req, res, next),
    );
    router.delete('/:id', AuthMiddleware.verifyAuth, (req, res, next) =>
      this.invoiceController.deleteInvoice(req, res, next),
    );

    app.use('/invoice', router);
    return app;
  }
}
