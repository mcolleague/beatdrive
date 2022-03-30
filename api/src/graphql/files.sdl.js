export const schema = gql`
  type File {
    id: String!
    name: String!
    url: String!
    data: String
  }

  type Query {
    files: [File!]! @skipAuth
    file(id: String!): File @skipAuth
    itunesLibraryXMLFile: File @skipAuth
  }
`
