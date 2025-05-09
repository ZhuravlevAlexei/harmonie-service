import { Request, Response, NextFunction } from 'express';

export const notFoundHandler = (
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  res.status(404).json({
    message: 'Route not found',
  });
};
