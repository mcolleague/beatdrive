/* eslint-disable jsx-a11y/media-has-caption */
export const QUERY = gql`
  query FilesQuery {
    files {
      id
      name
      url
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ files }) => {
  return (
    <ul>
      {files.map((item) => {
        return (
          <li key={item.id}>
            <span>{item.name}</span>
            <audio controls src={item.url}></audio>
          </li>
        )
      })}
    </ul>
  )
}
