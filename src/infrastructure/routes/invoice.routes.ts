import { Application, Router } from "express";
import { Routes } from "./routes";
import { Logger } from "../../domain/models/logger";
import { InvoiceController } from "../controllers.ts/invoice.controller";

export class InvoiceRoutes extends Routes {

  constructor(
    private invoiceController: InvoiceController,
    logger: Logger,
  ) {
    super(logger);
  }

  mount(app: Application): Application {

    const router = Router();

    router.post('', this.invoiceController.createInvoice);

    app.use('/invoice', router);
    return app;
  }

}