import { InvoiceItem } from './invoice-item';

export interface Invoice {
  id?: unknown;
  number: string;
  items: InvoiceItem[];
  paid: boolean;
  total?: number;
  total_iva?: number;
}
