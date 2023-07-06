import { type NextFunction, type Request, type Response } from "express";
import createError from "http-errors";

const defaultController = {
  async greet(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      res.json({ message: "Hello World!" });
    } catch (err) {
      next(createError.InternalServerError());
    }
  },
};

export default defaultController;
