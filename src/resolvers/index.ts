import { IResolvers } from "apollo-server";
import { GraphQLJSON, GraphQLGUID } from "graphql-scalars";
import { Query } from "./Query";
import { Mutation } from "./Mutation";
import { Node } from "./Node";

export const resolvers: IResolvers = {
  JSON: GraphQLJSON,
  GUID: GraphQLGUID,

  Query,
  Mutation,

  Node,
};
