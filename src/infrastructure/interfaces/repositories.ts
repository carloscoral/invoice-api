import { UserRepository } from 'domain/repositories/user.repository';
import { InvoiceRepository } from '../../domain/repositories/invoice.repository';

export interface Repositories {
  invoiceRepository: InvoiceRepository;
  userRepository: UserRepository;
}
