import { IFieldResolver } from "apollo-server";
import { ApolloContext } from "../../context";
import { validateTokenProperty } from "../../auth";

type Args = { id: string };

export const property: IFieldResolver<any, ApolloContext, Args> = async (
  _,
  { id },
  { pgPool, token }
) => {
  await validateTokenProperty(pgPool, token!, id);

  const res = await pgPool.query(
    "select p.id, p.name from property where id = $1",
    [id]
  );

  return res.rows;
};
