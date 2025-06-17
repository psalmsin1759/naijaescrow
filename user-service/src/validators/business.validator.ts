import Joi from 'joi';

export const createBusinessSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().optional(),
  website: Joi.string().uri().optional(),
  description: Joi.string().optional(),
  address: Joi.string().optional(),
  isActive: Joi.boolean().optional()
});

export const updateBusinessSchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().optional(),
  website: Joi.string().uri().optional(),
  description: Joi.string().optional(),
  address: Joi.string().optional(),
  isActive: Joi.boolean().optional()
});
