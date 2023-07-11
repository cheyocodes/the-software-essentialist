import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import { HttpException } from '../utils/exceptions/http.exception';

export const validate = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const schemaAttributes = {
        body: req.body,
        query: req.query,
        params: req.params,
      };

      await schema.parseAsync(schemaAttributes);

      return next();
    } catch (err) {
    
        if (err instanceof ZodError) {
            next(new HttpException({
                message: 'ValidationError',
                statusCode: 400
            }))
        }
    }
  };
};