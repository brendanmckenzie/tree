import * as express from "express";
import * as pg from "pg";
import { pgPool } from "./db";

export type ApolloContext = { pgPool: pg.Pool; token?: string };
type ExpressContext = {
  req: express.Request;
  res: express.Response;
};
type ContextFunction = (express: ExpressContext) => ApolloContext;

export const context: ContextFunction = ({ req }) => {
  const token = req.header("Authorization");

  return {
    pgPool,
    token,
  };
};
