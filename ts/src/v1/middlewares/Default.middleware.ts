import { type NextFunction, type Request, type Response } from "express";
import createError from "http-errors";

const defaultMiddleware = async (_req: Request, _res: Response, next: NextFunction): Promise<void> => {
  try {
    next();
  } catch (err) {
    next(createError.Unauthorized());
  }
};

export default defaultMiddleware;
