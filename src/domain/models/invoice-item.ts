export interface InvoiceItem {
  id?: unknown;
  baseValue: number;
  iva: number;
  description: string;
  amount: number;
  total?: number;
}
