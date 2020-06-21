import { IFieldResolver, ApolloError } from "apollo-server";
import { ApolloContext } from "../../context";
import { validateTokenProperty } from "../../auth";
import { node } from "../Query/node";

type Args = { property: string; alias: string; parent?: string };

const insertSql = `
insert into node 
( property_id, parent_id, alias ) 
values ( $1, $2, $3 ) 
on conflict do nothing
returning id`;

const selectSql =
  "select id from node where property_id = $1 and ($2::uuid is null and parent_id is null or parent_id = $2) and alias = $3";

export const createNode: IFieldResolver<any, ApolloContext, Args> = async (
  _,
  { property, parent, alias },
  { pgPool, token },
  info
) => {
  await validateTokenProperty(pgPool, token!, property);

  const values = [property, parent ? parent : null, alias];

  const insertRes = await pgPool.query(insertSql, values);
  if (insertRes.rowCount === 1) {
    return node(null, { id: insertRes.rows[0].id }, { pgPool, token }, info);
  }

  const selectRes = await pgPool.query(selectSql, values);
  if (selectRes.rowCount === 1) {
    return node(null, { id: selectRes.rows[0].id }, { pgPool, token }, info);
  }

  throw new ApolloError("Query failed", "QUERY_FAIL");
};
