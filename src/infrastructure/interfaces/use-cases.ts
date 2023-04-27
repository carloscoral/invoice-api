import { UpdateInvoiceUseCase } from "../../application/use-cases/update-invoice.use-case";
import { CreateInvoiceUseCase } from "../../application/use-cases/create-invoice.use-case";
import { DeleteInvoiceUseCase } from "../../application/use-cases/delete-invoice.use-case";

export interface UseCases {
  createInvoiceUseCase: CreateInvoiceUseCase,
  updateInvoiceUseCase: UpdateInvoiceUseCase,
  deleteInvoiceUseCase: DeleteInvoiceUseCase
}