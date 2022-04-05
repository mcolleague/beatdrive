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
  const mm = require('music-metadata-browser')
  const { makeTokenizer } = require('@tokenizer/http')

  const logMetadata = async (audioTrackUrl) => {
    const httpTokenizer = await makeTokenizer(audioTrackUrl)
    const metadata = await mm.parseFromTokenizer(httpTokenizer)
    console.log('metadata:', metadata)
  }

  return (
    <ul>
      {files.map((item) => {
        return (
          <li key={item.id}>
            <span>{item.name}</span>
            <audio controls preload="none" src={item.url}></audio>
            <button onClick={() => logMetadata(item.url)}>Test</button>
          </li>
        )
      })}
    </ul>
  )
}
