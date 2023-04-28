import * as yup from 'yup';
import { Types } from 'mongoose';

yup.addMethod(yup.string, 'objectId', function (errorMessage) {
  return this.test('test-object-id', errorMessage, function (value) {
    const { path, createError } = this;
    const isObjectId = value && Types.ObjectId.isValid(value);

    return (
      isObjectId ||
      createError({ path, message: errorMessage })
    );
  });
});

export const idValidator = yup
  .object({
    id: yup.string().objectId().required()
  });
