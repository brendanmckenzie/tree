import { ApolloServer } from "apollo-server-express";

import typeDefs from "./typeDefs";
import { resolvers } from "./resolvers";
import { context } from "./context";

export const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
});
