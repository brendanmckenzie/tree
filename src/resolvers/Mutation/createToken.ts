import { IFieldResolver, ApolloError } from "apollo-server";
import { ApolloContext } from "../../context";
import { validateTokenToken } from "../../auth";

type Args = { parent?: string };

const sql = "insert into token ( parent_id ) values ( $1 ) returning id";

export const createToken: IFieldResolver<any, ApolloContext, Args> = async (
  _,
  { parent },
  { pgPool, token }
) => {
  if (parent) {
    validateTokenToken(pgPool, token!, parent);
  }

  const values = [parent ? parent : null];
  const res = await pgPool.query(sql, values);

  if (res.rowCount === 1) {
    return res.rows[0].id;
  }

  throw new ApolloError("Query failed", "QUERY_FAIL");
};
