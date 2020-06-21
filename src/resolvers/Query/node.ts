import { IFieldResolver } from "apollo-server";
import { ApolloContext } from "../../context";
import { validateTokenNode } from "../../auth";

type Args = { id: string };

export const node: IFieldResolver<any, ApolloContext, Args> = async (
  _,
  { id },
  { pgPool, token }
) => {
  await validateTokenNode(pgPool, token!, id);

  const res = await pgPool.query(
    "select id, parent_id as parentid, alias from node where id = $1",
    [id]
  );

  return res.rows[0];
};
