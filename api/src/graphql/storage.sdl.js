export const schema = gql`
  type File {
    name: String!
    mediaLink: String!
  }

  type Query {
    files: [File] @skipAuth
    # file(id: Int!): Tag @requireAuth
  }

  # type Mutation {
  #   createFile(input: CreateTagInput!): Tag! @requireAuth
  #   updateFile(id: Int!, input: UpdateTagInput!): Tag! @requireAuth
  #   deleteFile(id: Int!): Tag! @requireAuth
  # }
`
