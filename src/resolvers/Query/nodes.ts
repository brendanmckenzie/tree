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
    const sql =
      "select id, parent_id as parentid, alias from node where property_id = $1 and parent_id is null order by alias";
    const values = [property];

    const res = await pgPool.query(sql, values);

    return res.rows;
  } else if (!parent) {
    const sql =
      "select id, parent_id as parentid, alias from node where property_id = $1 order by alias";
    const values = [property];

    const res = await pgPool.query(sql, values);

    return res.rows;
  } else {
    const sql =
      "select id, parent_id as parentid, alias from node where property_id = $1 and parent_id = $2 order by alias";
    const values = [property, parent];

    const res = await pgPool.query(sql, values);

    return res.rows;
  }
};
