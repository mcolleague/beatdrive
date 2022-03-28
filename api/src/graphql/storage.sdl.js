export const schema = gql`
  type File {
    id: String!
    name: String!
    mediaLink: String!
  }

  type Query {
    getFiles: [File] @skipAuth
  }
`
