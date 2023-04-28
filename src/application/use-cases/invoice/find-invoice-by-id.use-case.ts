import { InvoiceRepository } from '../../../domain/repositories/invoice.repository';
import { UseCase } from '../use-case';
import { Logger } from '../../../domain/models/logger';
import { Invoice } from '../../../domain/models/invoice';

export class FindInvoiceByIdUseCase extends UseCase<Invoice | null> {
  constructor(private invoiceRepository: InvoiceRepository, logger: Logger) {
    super(logger);
    logger.info('Init FindInvoiceByIdUseCase');
  }

  execute(id: string): Promise<Invoice | null> {
    this.logger.debug('Execute FindInvoiceByIdUseCase');
    return this.invoiceRepository.findById(id);
  }
}
