import { AuthController } from '../controllers.ts/auth.controller';
import { InvoiceController } from '../controllers.ts/invoice.controller';

export interface Controllers {
  invoiceController: InvoiceController;
  authController: AuthController;
}
