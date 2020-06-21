import { IFieldResolver, ApolloError, UserInputError } from "apollo-server";
import { ApolloContext } from "../../context";
import { validateToken } from "../../auth";

type Args = { name: string };

const sql = `
with prop as (insert into property ( name ) values ( $2 ) returning id)
insert into token_property 
( token_id, property_id ) 
values 
( 
$1, 
(select id from prop)
) returning property_id`;

export const createProperty: IFieldResolver<any, ApolloContext, Args> = async (
  _,
  { name },
  { pgPool, token }
) => {
  await validateToken(pgPool, token);

  if (!name) {
    throw new UserInputError("Invalid name", { name: "invalid" });
  }

  const values = [token, name];
  const res = await pgPool.query(sql, values);

  if (res.rowCount === 1) {
    return res.rows[0].property_id;
  }

  throw new ApolloError("Query failed", "QUERY_FAIL");
};
