import { Schema } from 'joi';
import { Request, Response, NextFunction } from 'express';

export const validate = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body);
    if (error) {
      res.status(400).json({
        success: false,
        message: error.details[0].message
      });
    } else {
      next();
    }
  };
};
