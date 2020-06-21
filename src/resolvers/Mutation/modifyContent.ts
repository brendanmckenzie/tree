import { IFieldResolver, ApolloError } from "apollo-server";
import { ApolloContext } from "../../context";
import { validateTokenNode } from "../../auth";

type Args = { node: string; version: string; value: string };

export const modifyContent: IFieldResolver<any, ApolloContext, Args> = async (
  _,
  { node, version, value },
  { pgPool, token }
) => {
  await validateTokenNode(pgPool, token!, node);

  if (version) {
    const values = [version, value];
    const sql = `update node_version set value = $2::json, modified_at = now() where id = $1`;

    await pgPool.query(sql, values);

    return version;
  } else {
    const values = [node, value];
    const sql = `insert into node_version ( node_id, value ) values ( $1, $2::json ) returning id`;

    const res = await pgPool.query(sql, values);

    if (res.rowCount === 1) {
      return res.rows[0].id;
    }
  }

  throw new ApolloError("Query failed", "QUERY_FAIL");
};
