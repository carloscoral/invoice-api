import { InvoiceRepository } from "../../domain/repositories/invoice.repository";
import { UseCase } from "./use-case";
import { Logger } from "../../domain/models/logger";
import { Invoice } from "../../domain/models/invoice";
import { InvoiceFilter } from "../../infrastructure/interfaces/invoice-filter";

export class FindInvoiceUseCase extends UseCase<Invoice[]> {

  constructor(private invoiceRepository: InvoiceRepository, logger: Logger) {
    super(logger);
    logger.info('Init FindInvoiceUseCase');
  }

  execute(filters: InvoiceFilter): Promise<Invoice[]> {
    this.logger.debug('Execute FindInvoiceUseCase');
    return this.invoiceRepository.find(filters);
  }
}