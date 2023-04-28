import { UpdateInvoiceUseCase } from '../../application/use-cases/update-invoice.use-case';
import { CreateInvoiceUseCase } from '../../application/use-cases/create-invoice.use-case';
import { DeleteInvoiceUseCase } from '../../application/use-cases/delete-invoice.use-case';
import { FindInvoiceUseCase } from '../../application/use-cases/find-invoice.use-case';
import { FindInvoiceByIdUseCase } from 'application/use-cases/find-invoice-by-id.use-case';

export interface UseCases {
  createInvoiceUseCase: CreateInvoiceUseCase,
  updateInvoiceUseCase: UpdateInvoiceUseCase,
  deleteInvoiceUseCase: DeleteInvoiceUseCase,
  findInvoiceUseCase: FindInvoiceUseCase,
  findInvoiceByIdUseCase: FindInvoiceByIdUseCase
}
