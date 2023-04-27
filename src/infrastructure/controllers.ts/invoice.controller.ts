import { CreateInvoiceUseCase } from "../../application/use-cases/create-invoice.use-case";
import { Controller } from "./controller";
import { Logger } from "../../domain/models/logger";
import { Request, Response } from "express";
import { Locals } from "../adapters/locals";

export class InvoiceController extends Controller {

  constructor(
    private createInvoiceUseCase: CreateInvoiceUseCase,
    logger: Logger
  ) {
    super(logger);
    logger.info('Init InvoiceController');
  }

  createInvoice(req: Request, res: Response) {
    res.json({});
  }
}
