import { celebrate, Segments, Joi } from 'celebrate';

const ProjectValidators = {
  create: celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
      description: Joi.string().required(),
      link: Joi.string().required(),
      adtionalLink: Joi.string().optional(),
    },
  }),
  index: celebrate({
    [Segments.QUERY]: {
      page: Joi.number().min(1).required(),
      pageSize: Joi.number().min(1).max(100).required(),
      areaInterest: Joi.string().optional(),
      q: Joi.string().optional(),
      userId: Joi.string().uuid().optional(),
    },
  }),
  show: celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  delete: celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
};

export { ProjectValidators };
