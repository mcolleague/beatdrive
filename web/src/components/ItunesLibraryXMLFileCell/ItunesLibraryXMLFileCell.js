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
    const xmlStr = await res.text()

    if (!window.libxml) {
      const parser = new DOMParser()
      const xml = parser.parseFromString(xmlStr, 'application/xml')
      window.libxml = xml
      console.log(xml)
    }
  }

  fetchXML()

  return <button onClick={() => console.log(window.libxml)}>Log XML</button>
}
