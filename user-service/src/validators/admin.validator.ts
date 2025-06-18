import Joi from 'joi';

export const validateAdmin = Joi.object({
  firstName: Joi.string().required().min(2).max(50),
  lastName: Joi.string().required().min(2).max(50),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(/^\+?[0-9]{7,15}$/).optional(),
  password: Joi.string().required().min(6),
  business: Joi.string().required(),
});

export const createAdminSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  phone: Joi.string().optional(),
  business: Joi.string().required(), 
  role: Joi.string().valid('owner', 'admin').optional(),
  isActive: Joi.boolean().optional(),
});


export const validateLogin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const validateForgotPassword = Joi.object({
  email: Joi.string().email().required(),
});

export const validateResetPassword = Joi.object({
  token: Joi.string().required(),
  password: Joi.string().min(6).required(),
});
