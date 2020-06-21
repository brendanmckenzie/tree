import { IFieldResolver } from "apollo-server";
import { ApolloContext } from "../../context";
import { validateTokenNode } from "../../auth";

export const parent: IFieldResolver<any, ApolloContext> = async (
  source,
  _,
  { pgPool, token }
) => {
  if (!source.parentid) {
    return null;
  }

  await validateTokenNode(pgPool, token!, source.parentid);

  const res = await pgPool.query(
    "select id, parent_id as parentid, alias from node where id = $1",
    [source.parentid]
  );

  return res.rows[0];
};
