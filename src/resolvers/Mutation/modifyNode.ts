import { IFieldResolver, ApolloError } from "apollo-server";
import { ApolloContext } from "../../context";
import { validateTokenNode } from "../../auth";
import { node } from "../Query/node";

type Args = {
  id: string;
  input: { alias: string; parent: string; activeVersion: string };
};

const sql = (set: string) => `
update
  node
set
  ${set}
where
  id = $1`;

export const modifyNode: IFieldResolver<any, ApolloContext, Args> = async (
  _,
  { id, input: { alias, parent, activeVersion } },
  { pgPool, token },
  info
) => {
  await validateTokenNode(pgPool, token!, id);

  if (parent) {
    await validateTokenNode(pgPool, token!, parent);
  }

  const fields = {
    alias,
    parent_id: parent,
    active_version_id: activeVersion,
  };

  const changes = Object.keys(fields)
    .filter((k) => fields[k] !== undefined)
    .map((key) => ({ key, value: fields[key] }));

  const sqlSet = changes
    .map(({ key, value }) => (value ? `${key} = '${value}'` : `${key} = null`))
    .join(", ");

  if (sqlSet) {
    const values = [id];

    await pgPool.query(sql(sqlSet), values);
  }

  return node(null, { id }, { pgPool, token }, info);
};
