import * as yup from 'yup';

export const invoiceItemValidator = yup.object({
  id: yup.string().notRequired(),
  baseValue: yup.number().min(0).required(),
  iva: yup.number().min(0).max(1).required(),
  description: yup.string().required(),
  amount: yup.number().min(0).required(),
});
