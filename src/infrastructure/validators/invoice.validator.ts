import * as yup from 'yup';
import { invoiceItemValidator } from './invoice-item.validator';

export const invoiceValidator = yup.object({
  id: yup.string().notRequired(),
  number: yup.string().required(),
  items: yup.array().of(invoiceItemValidator).required(),
  paid: yup.boolean().required(),
});
