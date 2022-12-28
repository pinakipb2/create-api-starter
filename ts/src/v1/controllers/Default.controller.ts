import { NextFunction, Request, Response } from "express";
import createError from "http-errors";

const defaultController = {
  async greet(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      res.json({ message: "Hello World!" });
    } catch (err) {
      return next(createError.InternalServerError());
    }
  },
};

export default defaultController;
