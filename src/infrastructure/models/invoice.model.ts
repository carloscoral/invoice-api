import { Schema, model } from 'mongoose';
import { Invoice } from '../../domain/models/invoice';
import { InvoiceItemSchema } from './invoice-item.model';

export const InvoiceSchema = new Schema<Invoice>(
  {
    number: { type: String, unique: true },
    items: {
      type: [InvoiceItemSchema],
      default: [],
    },
    paid: {
      type: Boolean,
      default: false,
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

InvoiceSchema.virtual('total').get(function () {
  return this.items.reduce((prev, curr) => {
    return prev + (curr.total || 0) * curr.amount;
  }, 0);
});

InvoiceSchema.virtual('total_iva').get(function () {
  return this.items.reduce((prev, curr) => {
    return prev + curr.baseValue * curr.iva * curr.amount;
  }, 0);
});

export const InvoiceModel = model<Invoice>('Invoice', InvoiceSchema);
