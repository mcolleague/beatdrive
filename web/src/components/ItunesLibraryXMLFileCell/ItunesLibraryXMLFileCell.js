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
  const simpleNodeReducer = (prev, curr, i, arr) => {
    return i % 2
      ? prev
      : {
          ...prev,
          [curr.innerHTML]: arr[i + 1].innerHTML,
        }
  }

  const toTracks = (prev, curr, i) => {
    if (i % 2 === 0) {
      return prev
    } else {
      return [...prev, [...curr.children].reduce(simpleNodeReducer, {})]
    }
  }

  const fetchXML = async () => {
    console.log('fetching xml...')
    const res = await fetch(url)
    const xmlStr = await res.text()

    if (!window.libxml) {
      const parser = new DOMParser()
      const xml = parser.parseFromString(xmlStr, 'application/xml')
      window.libxml = xml
      console.log(xml)

      const trackDictChildren =
        xml.children[0].children[0].querySelector('dict').children

      const tracks = [...trackDictChildren].reduce(toTracks, [])

      console.log({ trackDictChildren, tracks })
    }
  }

  fetchXML()

  return <button onClick={() => console.log(window.libxml)}>Log XML</button>
}
