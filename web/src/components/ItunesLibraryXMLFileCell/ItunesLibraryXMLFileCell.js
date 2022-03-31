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
  const isSimpleNode = (node) => !['array', 'dict'].includes(node?.tagName)
  const isKey = (node) => node?.tagName === 'key'
  const nodeReducer = (prev, curr) => {
    const { innerHTML, prevElementSibling, nextElementSibling } = curr

    // Ignore if already parsed in previous iteration
    if (isKey(prevElementSibling)) return prev

    // Key value pair
    if (isKey(curr)) {
      // Simple value
      if (isSimpleNode(nextElementSibling)) {
        const { tagName: tagNameNext, innerHTML: innerHTMLNext } =
          nextElementSibling
        return { ...prev, [innerHTML]: innerHTMLNext }

        // Complex value
      } else {
        return { ...prev, [innerHTML]: parseNode(nextElementSibling) }
      }
    }

    return prev
  }

  const parseNode = (node) => [...node.children].reduce(nodeReducer, {})

  const fetchXML = async () => {
    console.log('fetching xml...')
    const res = await fetch(url)
    const xmlStr = await res.text()

    if (!window.libxml) {
      const parser = new DOMParser()
      const xml = parser.parseFromString(xmlStr, 'application/xml')
      window.libxml = xml
      console.log(xml)

      // Very slow!!!
      console.log(parseNode(xml.children[0].children[0]))
    }
  }

  fetchXML()

  return <button onClick={() => console.log(window.libxml)}>Log XML</button>
}
