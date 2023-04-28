import { Schema } from 'mongoose';
import { InvoiceItem } from '../../domain/models/invoice-item';

export const InvoiceItemSchema = new Schema<InvoiceItem>(
  {
    amount: { type: Number },
    baseValue: { type: Number },
    description: { type: String },
    iva: { type: Number },
    total: {
      type: Number,
      default: function (data: InvoiceItem) {
        return data.baseValue * data.iva + data.baseValue;
      },
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    _id: false,
  },
);

InvoiceItemSchema.post('findOneAndUpdate', function (doc) {
  if (doc) {
    doc.total = doc.baseValue * doc.iva + doc.baseValue;
    doc.save();
  }
});
