import { IFieldResolver } from "apollo-server";
import { ApolloContext } from "../../context";
import { validateTokenNode } from "../../auth";

export const children: IFieldResolver<any, ApolloContext> = async (
  source,
  {},
  { pgPool, token }
) => {
  await validateTokenNode(pgPool, token!, source.id);

  const res = await pgPool.query(
    "select id, parent_id as parentid, alias from node where parent_id = $1",
    [source.id]
  );

  return res.rows;
};
