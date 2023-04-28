import { CreateInvoiceUseCase } from '../../application/use-cases/create-invoice.use-case';
import { Controller } from './controller';
import { Logger } from '../../domain/models/logger';
import { NextFunction, Request, Response } from 'express';
import { invoiceValidator } from '../validators/invoice.validator';
import { UpdateInvoiceUseCase } from '../../application/use-cases/update-invoice.use-case';
import { idValidator } from '../validators/id.validator';
import { DeleteInvoiceUseCase } from '../../application/use-cases/delete-invoice.use-case';
import { FindInvoiceUseCase } from '../../application/use-cases/find-invoice.use-case';
import { FindInvoiceByIdUseCase } from '../../application/use-cases/find-invoice-by-id.use-case';

export class InvoiceController extends Controller {
  constructor(
    private createInvoiceUseCase: CreateInvoiceUseCase,
    private updateInvoiceUseCase: UpdateInvoiceUseCase,
    private deleteInvoiceUseCase: DeleteInvoiceUseCase,
    private findInvoiceUseCase: FindInvoiceUseCase,
    private findInvoiceByIdUseCase: FindInvoiceByIdUseCase,
    logger: Logger,
  ) {
    super(logger);
    logger.info('Init InvoiceController');
  }

  async getInvoice(req: Request, res: Response, next: NextFunction) {
    try {
      const { params } = req;
      const { id } = idValidator.validateSync(params, { abortEarly: false, stripUnknown: true });
      const result = await this.findInvoiceByIdUseCase.execute(id);
      if (!result) {
        return res.status(404).json({ error: 'Not found' });
      }
      return res.json(result);
    } catch (e) {
      next(e);
    }
  }

  async getInvoices(req: Request, res: Response, next: NextFunction) {
    try {
      const query = req.query;
      const result = await this.findInvoiceUseCase.execute(query);
      return res.json(result);
    } catch (e) {
      next(e);
    }
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

  async updateInvoice(req: Request, res: Response, next: NextFunction) {
    try {
      const { body, params } = req;
      const data = invoiceValidator.validateSync(body, { abortEarly: false, stripUnknown: true });
      const { id } = idValidator.validateSync(params);
      const result = await this.updateInvoiceUseCase.execute({ id, invoice: data });
      if (!result) {
        return res.status(404).json({ error: 'Not found' });
      }
      return res.json(result);
    } catch (e) {
      next(e);
    }
  }

  async deleteInvoice(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = idValidator.validateSync(req.params);
      await this.deleteInvoiceUseCase.execute(id);
      return res.json({});
    } catch (e) {
      next(e);
    }
  }
}
