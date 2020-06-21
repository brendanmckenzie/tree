import { IFieldResolver, ApolloError } from "apollo-server";
import { ApolloContext } from "../../context";
import { validateTokenNode } from "../../auth";

type Args = { id: string; alias: string };

const sql = `update node set alias = $2 where id = $1`;

export const modifyNode: IFieldResolver<any, ApolloContext, Args> = async (
  _,
  { id, alias },
  { pgPool, token }
) => {
  await validateTokenNode(pgPool, token!, id);

  const values = [id, alias];

  const res = await pgPool.query(sql, values);
  if (res.rowCount === 1) {
    return id;
  }

  throw new ApolloError("Query failed", "QUERY_FAIL");
};
