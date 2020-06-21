import { IFieldResolver, ApolloError } from "apollo-server";
import { ApolloContext } from "../../context";
import { validateTokenNode } from "../../auth";

type Args = { id: string; parent?: string };

const sql = `update node set parent_id = $2 where id = $1`;

export const moveNode: IFieldResolver<any, ApolloContext, Args> = async (
  _,
  { id, parent },
  { pgPool, token }
) => {
  await validateTokenNode(pgPool, token!, id);
  await validateTokenNode(pgPool, token!, parent);

  const values = [id, parent ? parent : null];

  const res = await pgPool.query(sql, values);
  if (res.rowCount === 1) {
    return id;
  }

  throw new ApolloError("Query failed", "QUERY_FAIL");
};
