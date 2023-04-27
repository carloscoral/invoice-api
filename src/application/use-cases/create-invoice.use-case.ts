import { InvoiceRepository } from "../../domain/repositories/invoice.repository";
import { UseCase } from "./use-case";
import { Logger } from "../../domain/models/logger";
import { Invoice } from "../../domain/models/invoice";

export class CreateInvoiceUseCase extends UseCase<Invoice> {

  constructor(private invoiceRepository: InvoiceRepository, logger: Logger) {
    super(logger);
    logger.info('Init CreateInvoiceUseCase');
  }

  execute(data: Invoice): Promise<Invoice> {
    this.logger.debug('Execute CreateInvoiceUseCase');
    return this.invoiceRepository.save(data);
  }
}