export const QUERY = gql`
  query ItunesLibraryXMLFileQuery {
    itunesLibraryXMLFile {
      url
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ itunesLibraryXMLFile: { url } }) => {
  const fetchXML = async () => {
    console.log('fetching xml...')
    const res = await fetch(url)
    const xml = await res.text()
    window.libxml = xml
    console.log({ xml })
  }

  fetchXML()

  return (
    <button onClick={() => console.log({ xml: window.libxml })}>Log XML</button>
  )
}
