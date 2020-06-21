import { gql } from "apollo-server";

export default gql`
  scalar JSON
  scalar GUID
  scalar DateTime

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
    version(id: GUID): NodeVersion
    versions: [NodeVersion]
  }

  type NodeVersion {
    id: GUID!
    modified: DateTime!
    value: JSON!
  }

  input ModifyNode {
    parent: GUID
    alias: String
    activeVersion: GUID
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
    createProperty("The name of the property" name: String!): Property

    "Creates a new node in a property"
    createNode(
      "The property in which to create the node"
      property: GUID!
      "The alias of the node"
      alias: String!
      "The parent of the node"
      parent: GUID
    ): Node

    "Modifies a node"
    modifyNode(
      "The id of the node to modify"
      id: GUID!
      "The changes to make to the node"
      input: ModifyNode!
    ): Node

    modifyContent(node: GUID!, version: GUID, value: JSON!): GUID
  }
`;
