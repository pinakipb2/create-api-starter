import createError from 'http-errors';

const defaultMiddleware = async (req, res, next) => {
  try {
    next();
  } catch (err) {
    return next(createError.Unauthorized());
  }
};

export default defaultMiddleware;
