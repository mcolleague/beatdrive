export const schema = gql`
  type File {
    id: String!
    name: String!
    mediaLink: String!
    url: String!
  }

  type Query {
    getFiles: [File] @skipAuth
  }
`
