import { gql } from "apollo-server";

export default gql`
  scalar JSON
  scalar GUID

  type Property {
    "The globally unique identifier of the property"
    id: GUID!
    "The name of the property"
    name: String!
  }

  type Node {
    "The globally unique identifier of the node"
    id: GUID!
    "The parent node or null if a root node"
    parent: Node
    "The alias of the node"
    alias: String!
    "The children of the node"
    children: [Node]
  }

  type Query {
    "List all properties accessibly with the current token"
    properties: [Property]
    "Lists all nodes within a property"
    nodes(
      "The property on which to query the nodes"
      property: GUID!
      "List only nodes under this parent node"
      parent: GUID
    ): [Node]
    "Get the node specified by the id"
    node("The id of the node to get" id: GUID!): Node
  }

  type Mutation {
    "Creates a new token"
    createToken(
      "The parent token to inherit permissions from"
      parent: GUID
    ): GUID
    "Creates a new property"
    createProperty("The name of the property" name: String!): GUID

    "Creates a new node in a property"
    createNode(
      "The property in which to create the node"
      property: GUID!
      "The alias of the node"
      alias: String!
      "The parent of the node"
      parent: GUID
    ): GUID

    "Renames a node"
    modifyNode(
      "The id of the node to modify"
      id: GUID!
      "The new alias of the node"
      alias: String!
    ): GUID
    "Alters the hierarchy of the specified node"
    moveNode(
      "The id of the node to move"
      id: GUID!
      "The new parent of the node, or null to move to root"
      target: GUID
    ): GUID
  }
`;
