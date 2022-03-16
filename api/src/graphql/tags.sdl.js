export const schema = gql`
  type Tag {
    id: Int!
    title: String!
    color: String!
    createdAt: DateTime!
  }

  type Query {
    tags: [Tag!]! @requireAuth
    tag(id: Int!): Tag @requireAuth
  }

  input CreateTagInput {
    title: String!
    color: String!
  }

  input UpdateTagInput {
    title: String
    color: String
  }

  type Mutation {
    createTag(input: CreateTagInput!): Tag! @requireAuth
    updateTag(id: Int!, input: UpdateTagInput!): Tag! @requireAuth
    deleteTag(id: Int!): Tag! @requireAuth
  }
`
