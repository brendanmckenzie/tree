import { IFieldResolver } from "apollo-server";
import { ApolloContext } from "../../context";
import { validateTokenProperty } from "../../auth";

type Args = { property: string; parent?: string };

export const nodes: IFieldResolver<any, ApolloContext, Args> = async (
  _,
  { property, parent },
  { pgPool, token }
) => {
  await validateTokenProperty(pgPool, token!, property);

  if (parent === null) {
    const res = await pgPool.query(
      "select id, parent_id as parentid, alias from node where property_id = $1 and parent_id is null order by alias",
      [property]
    );

    return res.rows;
  } else if (!parent) {
    const res = await pgPool.query(
      "select id, parent_id as parentid, alias from node where property_id = $1 order by alias",
      [property]
    );

    return res.rows;
  } else {
    const res = await pgPool.query(
      "select id, parent_id as parentid, alias from node where property_id = $1 and parent_id = $2 order by alias",
      [property, parent]
    );

    return res.rows;
  }
};
