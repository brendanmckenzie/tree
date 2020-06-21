import { IFieldResolver } from "apollo-server";
import { ApolloContext } from "../../context";
import { validateTokenNode } from "../../auth";

export const versions: IFieldResolver<any, ApolloContext> = async (
  source,
  _,
  { pgPool, token }
) => {
  if (!source.id) {
    return null;
  }

  await validateTokenNode(pgPool, token!, source.id);

  const sql =
    "select id, value, modified_at as modified from node_version where node_id = $1 order by modified_at desc";
  const values = [source.id];

  const res = await pgPool.query(sql, values);

  return res.rows;
};
