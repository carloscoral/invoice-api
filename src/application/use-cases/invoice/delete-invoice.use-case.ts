import { InvoiceRepository } from '../../../domain/repositories/invoice.repository';
import { UseCase } from '../use-case';
import { Logger } from '../../../domain/models/logger';
import { Invoice } from '../../../domain/models/invoice';

export class DeleteInvoiceUseCase extends UseCase<Invoice | null> {
  constructor(private invoiceRepository: InvoiceRepository, logger: Logger) {
    super(logger);
    logger.info('Init DeleteInvoiceUseCase');
  }

  execute(id: string): Promise<void> {
    this.logger.debug('Execute DeleteInvoiceUseCase');
    return this.invoiceRepository.delete(id);
  }
}
