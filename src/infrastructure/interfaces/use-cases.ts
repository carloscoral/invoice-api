import { UpdateInvoiceUseCase } from '../../application/use-cases/invoice/update-invoice.use-case';
import { CreateInvoiceUseCase } from '../../application/use-cases/invoice/create-invoice.use-case';
import { DeleteInvoiceUseCase } from '../../application/use-cases/invoice/delete-invoice.use-case';
import { FindInvoiceUseCase } from '../../application/use-cases/invoice/find-invoice.use-case';
import { FindInvoiceByIdUseCase } from '../../application/use-cases/invoice/find-invoice-by-id.use-case';
import { SignInUseCase } from '../../application/use-cases/auth/sign-in.use-case';

export interface UseCases {
  createInvoiceUseCase: CreateInvoiceUseCase;
  updateInvoiceUseCase: UpdateInvoiceUseCase;
  deleteInvoiceUseCase: DeleteInvoiceUseCase;
  findInvoiceUseCase: FindInvoiceUseCase;
  findInvoiceByIdUseCase: FindInvoiceByIdUseCase;
  signInUseCase: SignInUseCase
}
