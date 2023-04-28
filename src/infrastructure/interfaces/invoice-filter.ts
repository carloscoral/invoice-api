export interface InvoiceFilter {
  id?: string;
  number?: string;
  paid?: boolean;
  total?: number;
  total_iva?: number;
  item_base_value?: number;
  item_iva?: number;
  item_description?: string;
  item_amount?: number;
  item_total?: number;
}
