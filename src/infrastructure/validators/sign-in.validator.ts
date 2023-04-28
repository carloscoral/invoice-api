import * as yup from 'yup';

export const signInValidator = yup.object({
  username: yup.string().required(),
  password: yup.string().required(),
});
