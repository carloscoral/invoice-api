import { Invoice } from "../../domain/models/invoice";
import { Logger } from "../../domain/models/logger";

export abstract class InvoiceRepository {

  constructor(protected logger: Logger) {}

  abstract save(data: Invoice): Promise<Invoice>;
  abstract find(filters: unknown): Promise<Invoice[]>;
  abstract findById(id: string): Promise<Invoice|null>;
  abstract update(id: string, data: Invoice): Promise<Invoice|null>;
  abstract delete(id: string): Promise<void>;
}