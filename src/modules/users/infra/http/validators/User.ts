import { celebrate, Segments } from 'celebrate';

import Joi from '@shared/infra/http/validators/Joi';

const userData = {
  name: Joi.string().required(),
  surname: Joi.string().required(),
  title: Joi.string().optional(),
  email: Joi.string().email().required(),
};

const UserValidators = {
  create: celebrate({
    [Segments.BODY]: {
      ...userData,
      password: Joi.string().required(),
      passwordConfirmation: Joi.string().valid(Joi.ref('password')),
    },
  }),
  update: celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: userData,
  }),
  delete: celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  updatePassword: celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      oldPassword: Joi.string().required(),
      password: Joi.string().required(),
      passwordConfirmation: Joi.string().valid(Joi.ref('password')),
    },
  }),
};

export default UserValidators;
