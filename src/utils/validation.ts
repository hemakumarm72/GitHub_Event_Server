import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { validationException } from './apiErrorHandler';
import { error } from 'console';

export const checkValidation = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  // console.warn(errors);validationResult
  !errors.isEmpty() ? next(validationException(errors.array())) : next();
};
