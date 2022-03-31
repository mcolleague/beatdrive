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
  const arrayChildNodeReducer = (prev, curr) => {
    return curr.tagName === 'key' ? prev : [...prev, parseComplexNode(curr)]
  }

  const nodeReducer = (prev, curr) => {
    const { innerHTML, previousElementSibling, nextElementSibling } = curr

    // Ignore if already parsed in previous iteration
    if (isKey(previousElementSibling)) return prev

    // Key value pair
    if (isKey(curr) && nextElementSibling) {
      const { innerHTML: innerHTMLNext } = nextElementSibling

      if (isSimpleNode(nextElementSibling)) {
        return { ...prev, [innerHTML]: innerHTMLNext }
      } else {
        const forceArray = innerHTML === 'Tracks'
        const value = parseComplexNode(nextElementSibling, forceArray)
        return {
          ...prev,
          [innerHTML]: value,
        }
      }
    }
  }

  const parseComplexNode = (node, forceArray) => {
    const { tagName, children } = node
    const useArray = tagName === 'array' || forceArray

    return useArray
      ? [...children].reduce(arrayChildNodeReducer, [])
      : [...children].reduce(nodeReducer, {})
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

      // Very slow!!!
      console.log(parseComplexNode(xml.children[0].children[0]))
    }
  }

  fetchXML()

  return <button onClick={() => console.log(window.libxml)}>Log XML</button>
}
