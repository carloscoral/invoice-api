import { Schema } from 'mongoose';
import { InvoiceItem } from '../interfaces/invoice-item';

export const InvoiceItemSchema = new Schema<InvoiceItem>(
  {
    amount: { type: Number },
    baseValue: { type: Number },
    description: { type: String },
    iva: { type: Number },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

InvoiceItemSchema.virtual('total').get(function () {
  return this.baseValue * this.iva + this.baseValue;
});
