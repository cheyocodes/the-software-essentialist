import { Request, Response, NextFunction } from 'express';
import { HttpException } from '../utils/exceptions/http.exception';

export function errorMiddleware(
  error: HttpException,
  req: Request,
  res: Response,
  _next: NextFunction,
): void {
    res.status(error.statusCode).json({
        error: error.message,
        data: null, 
        success: false,
    });
}