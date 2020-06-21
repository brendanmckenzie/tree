import { IFieldResolver } from "apollo-server";
import { ApolloContext } from "../../context";
import { version } from "./version";

export const value: IFieldResolver<any, ApolloContext> = async (
  source,
  {},
  context,
  info
) => {
  const res = await version(source, { id: undefined }, context, info);

  if (res) {
    return res.value;
  }

  return null;
};
