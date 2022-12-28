import createError from "http-errors";

const defaultController = {
  async greet(req, res, next) {
    try {
      res.json({ message: "Hello World!" });
    } catch (err) {
      return next(createError.InternalServerError());
    }
  },
};

export default defaultController;
