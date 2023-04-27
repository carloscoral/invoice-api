import { CreateInvoiceUseCase } from "../../application/use-cases/create-invoice.use-case";
import { Controller } from "./controller";
import { Logger } from "../../domain/models/logger";
import { NextFunction, Request, Response } from "express";
import { invoiceValidator } from "../validators/invoice.validator";

export class InvoiceController extends Controller {

  constructor(
    private createInvoiceUseCase: CreateInvoiceUseCase,
    logger: Logger
  ) {
    super(logger);
    logger.info('Init InvoiceController');
  }

  async createInvoice(req: Request, res: Response, next: NextFunction) {
    try {
      const { body } = req;
      const data = invoiceValidator.validateSync(body, { abortEarly: false, stripUnknown: true });
      const invoice = await this.createInvoiceUseCase.execute(data);
      return res.json(invoice);
    } catch (e) {
      next(e);
    }
  }
}
