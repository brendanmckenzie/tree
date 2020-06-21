import * as pg from "pg";
import { AuthenticationError, ForbiddenError } from "apollo-server";

export const validateToken = async (
  pgPool: pg.Pool,
  token?: string
): Promise<void> => {
  if (!token) {
    throw new AuthenticationError("Invalid token");
  }

  const res = await pgPool.query("select id from token where id = $1", [token]);

  if (res.rowCount !== 1) {
    throw new AuthenticationError("Invalid token");
  }
};

export const validateTokenToken = async (
  pgPool: pg.Pool,
  token: string,
  parent: string
): Promise<void> => {
  // validate that `token` has access to add other tokens under `parent`
  // at present this only permits 1 level but eventually will be inheritable
  if (token !== parent) {
    throw new ForbiddenError("Unauthorised");
  }
};

export const validateTokenProperty = async (
  pgPool: pg.Pool,
  token: string,
  property: string
): Promise<void> => {
  if (!token) {
    throw new AuthenticationError("Invalid token");
  }
  if (!property) {
    throw new AuthenticationError("Invalid property");
  }

  const res = await pgPool.query(
    "select property_id from token_property where token_id = $1 and property_id = $2",
    [token, property]
  );

  if (res.rowCount === 0) {
    throw new ForbiddenError("Unauthorised");
  }
};

export const validateTokenNode = async (
  pgPool: pg.Pool,
  token: string,
  node: string
): Promise<void> => {
  if (!token) {
    throw new AuthenticationError("Invalid token");
  }
  if (!node) {
    throw new AuthenticationError("Invalid node");
  }

  const propertyRes = await pgPool.query(
    "select property_id from node where id = $1",
    [node]
  );

  if (propertyRes.rowCount === 0) {
    throw new AuthenticationError("Invalid node");
  }

  await validateTokenProperty(pgPool, token, propertyRes.rows[0].property_id);
};
