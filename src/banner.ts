export const banner = `Multipurpose Managed Content Tree as a Service
v0.1 alpha

# Usage

This is a GraphQL service.  The endpoint is \`/graphql\`

## Authentication

Execute the \`createToken\` mutation to obtain an access token (leave \`parent\` blank).

Make all future GraphQL requests with the \`Authorization: \${token}\` header present.

Call \`createProperty\` with the authorization header set to start a new property.

Nodes can be created in a hierarchy within a property.

---

w. https://github.com/brendanmckenzie/tree
`;
