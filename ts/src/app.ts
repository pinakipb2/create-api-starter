import cors from "cors";
import express, { Express, NextFunction, Request, Response } from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import createError, { HttpError } from "http-errors";
import morgan from "morgan";
import path from "path";
import favicon from "serve-favicon";
import xss from "xss-clean";

import "./v1/config/env.config";

import { defaultMiddleware } from "./v1/middlewares";
import { defaultRoutes } from "./v1/routes";

// RateLimitter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // Limit each IP to 1000 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: {
    status: createError.TooManyRequests().status,
    message: createError.TooManyRequests().message,
  },
});

const corsOption = {
  origin: [String(process.env.FRONTEND_URL)],
};

const app: Express = express();

// Global variable appRoot with base dirname
global.appRoot = path.resolve(__dirname);

// Middlewares
app.use(helmet());
app.set("trust proxy", 1);
app.use(limiter);
app.use(xss());
app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
app.use(defaultMiddleware);

// Welcome Route
app.all("/", (_req: Request, res: Response, _next: NextFunction) => {
  res.send({ message: "API is Up and Running 😎🚀" });
});

const apiVersion: string = "v1";

// Routes
app.use(`/${apiVersion}/default`, defaultRoutes);

// 404 Handler
app.use((_req: Request, _res: Response, next: NextFunction) => {
  next(createError.NotFound());
});

// Error Handler
app.use((err: HttpError, _req: Request, res: Response, _next: NextFunction) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

// Server Configs
const PORT: number = Number(process.env.PORT) || 5000;
app.listen(PORT, () => {
  console.log(`🚀 @ http://localhost:${PORT}`);
});
