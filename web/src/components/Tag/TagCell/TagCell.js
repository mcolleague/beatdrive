import Tag from 'src/components/Tag/Tag'

export const QUERY = gql`
  query FindTagById($id: Int!) {
    tag: tag(id: $id) {
      id
      title
      color
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Tag not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ tag }) => {
  return <Tag tag={tag} />
}
