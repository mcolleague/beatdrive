import Library from 'src/components/Library/Library'

export const QUERY = gql`
  query {
    files {
      mediaLink
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Files not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ files }) => {
  return <Library files={files} />
}
