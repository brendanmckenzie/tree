import express from "express";
import helmet from "helmet";
import { RateLimiterMemory } from "rate-limiter-flexible";

const limiter = new RateLimiterMemory({
  points: 10,
  duration: 1,
});

const middleware: express.Handler = async (req, res, next) => {
  try {
    await limiter.consume(req.ip);

    next();
  } catch (ex) {
    res.status(429).send("Too Many Requests");
  }
};

export const secure = (app: express.Express) => {
  app.use(middleware);
  app.use(helmet());
};
