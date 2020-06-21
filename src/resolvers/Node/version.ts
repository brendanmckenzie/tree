import { IFieldResolver } from "apollo-server";
import { ApolloContext } from "../../context";
import { validateTokenNode } from "../../auth";

type Args = { id: string };

export const version: IFieldResolver<any, ApolloContext, Args> = async (
  source,
  { id },
  { pgPool, token }
) => {
  if (!source.id) {
    return null;
  }

  await validateTokenNode(pgPool, token!, source.id);

  if (id) {
    const sql = `select id, value, modified_at as modified from node_version where node_id = $1 and id = $2`;
    const values = [source.id, id];

    const res = await pgPool.query(sql, values);

    return res.rows[0];
  } else {
    const sql = `select id, value, modified_at as modified from node_version where id = (select active_version_id from node where id = $1)`;
    const values = [source.id];

    const res = await pgPool.query(sql, values);

    return res.rows[0];
  }
};
