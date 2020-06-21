import { IFieldResolver } from "apollo-server";
import { ApolloContext } from "../../context";
import { nodes as nodesInner } from "../Query/nodes";

export const nodes: IFieldResolver<any, ApolloContext> = async (
  source,
  {},
  context,
  info
) => nodesInner(source, { property: source.id }, context, info);
