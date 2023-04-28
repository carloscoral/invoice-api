import { Schema, model } from 'mongoose';
import { Invoice } from '../../domain/models/invoice';
import { InvoiceItemSchema } from './invoice-item.model';
import { InvoiceItem } from 'domain/models/invoice-item';

export const InvoiceSchema = new Schema<Invoice>(
  {
    number: { type: String },
    items: {
      type: [InvoiceItemSchema],
      default: [],
    },
    paid: {
      type: Boolean,
      default: false,
    },
    total: {
      type: Number,
      default: function (data: Invoice) {
        return data.items.reduce((prev, curr) => {
          return prev + (curr.total || 0) * curr.amount;
        }, 0);
      },
    },
    total_iva: {
      type: Number,
      default: function (data: Invoice) {
        return data.items.reduce((prev, curr) => {
          return prev + curr.baseValue * curr.iva * curr.amount;
        }, 0);
      },
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    versionKey: false,
  },
);

InvoiceSchema.post('findOneAndUpdate', function (doc) {
  if (doc) {
    doc.total = doc.items.reduce((prev: number, curr: InvoiceItem) => {
      return prev + (curr.total || 0) * curr.amount;
    }, 0);
    doc.total_iva = doc.items.reduce((prev: number, curr: InvoiceItem) => {
      return prev + curr.baseValue * curr.iva * curr.amount;
    }, 0);
    doc.save();
  }
});

export const InvoiceModel = model<Invoice>('Invoice', InvoiceSchema);
