import { InvoiceItem } from './invoice-item';

export interface Invoice {
  _id?: unknown;
  number: string;
  items: InvoiceItem[];
  paid: boolean;
  total?: number;
  total_iva?: number;
}
