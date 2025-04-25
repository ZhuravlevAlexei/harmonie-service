import { Request, Response, NextFunction, RequestHandler } from 'express';
import createHttpError from 'http-errors';
import { ObjectSchema, ValidationError } from 'joi';

export const validateBody =
  (schema: ObjectSchema): RequestHandler =>
  async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    try {
      await schema.validateAsync(req.body, {
        abortEarly: false,
      });
      next();
    } catch (err) {
      const validationError = err as ValidationError;
      const error = createHttpError(400, 'Bad Request', {
        errors: validationError.details,
      });
      next(error);
    }
  };
