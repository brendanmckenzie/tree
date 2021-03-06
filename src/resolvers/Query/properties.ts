import { IFieldResolver } from "apollo-server";
import { ApolloContext } from "../../context";
import { validateToken } from "../../auth";

type Args = {};

export const properties: IFieldResolver<any, ApolloContext, Args> = async (
  _,
  {},
  { pgPool, token }
) => {
  await validateToken(pgPool, token);

  const sql =
    "select p.id, p.name from property p inner join token_property tp on p.id = tp.property_id where tp.token_id = $1 order by name";
  const values = [token];

  const res = await pgPool.query(sql, values);

  return res.rows;
};
