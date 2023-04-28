import { InvoiceRepository } from '../../domain/repositories/invoice.repository';
import { UseCase } from './use-case';
import { Logger } from '../../domain/models/logger';
import { Invoice } from '../../domain/models/invoice';

export class UpdateInvoiceUseCase extends UseCase<Invoice | null> {
  constructor(private invoiceRepository: InvoiceRepository, logger: Logger) {
    super(logger);
    logger.info('Init UpdateInvoiceUseCase');
  }

  execute(data: { id: string; invoice: Invoice }): Promise<Invoice | null> {
    this.logger.debug('Execute UpdateInvoiceUseCase');
    return this.invoiceRepository.update(data.id, data.invoice);
  }
}
