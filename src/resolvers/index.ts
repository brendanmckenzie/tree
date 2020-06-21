import { IResolvers } from "apollo-server";
import { GraphQLJSON, GraphQLGUID, GraphQLDateTime } from "graphql-scalars";
import { Query } from "./Query";
import { Mutation } from "./Mutation";
import { Node } from "./Node";
import { Property } from "./Property";

export const resolvers: IResolvers = {
  JSON: GraphQLJSON,
  GUID: GraphQLGUID,
  DateTime: GraphQLDateTime,

  Query,
  Mutation,

  Node,
  Property,
};
