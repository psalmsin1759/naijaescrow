import Joi from 'joi';

export const validateUser = Joi.object({
  firstName: Joi.string().required().min(2).max(50),
  lastName: Joi.string().required().min(2).max(50),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(/^\+?[0-9]{7,15}$/).optional(),
  password: Joi.string().required().min(6),
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
