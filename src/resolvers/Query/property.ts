import { IFieldResolver } from "apollo-server";
import { ApolloContext } from "../../context";
import { validateTokenProperty } from "../../auth";

type Args = { id: string };

export const property: IFieldResolver<any, ApolloContext, Args> = async (
  _,
  { id },
  { pgPool, token }
) => {
  await validateTokenProperty(pgPool, token!, id);

  const sql = "select p.id, p.name from property where id = $1";
  const values = [id];

  const res = await pgPool.query(sql, values);

  return res.rows;
};
