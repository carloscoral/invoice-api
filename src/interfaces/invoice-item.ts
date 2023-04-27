export interface InvoiceItem {
  baseValue: number;
  iva: number;
  description: string;
  amount: number;
  total?: number;
}
