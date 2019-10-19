import { Request, Response, NextFunction } from 'express';

export const bootstrapErrorHandler = ({ message, stack }) => {
  console.error(message);
};

export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(404).send({
    message: `${req.path} not found`
  });
};
