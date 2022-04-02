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

  const processLibraryJSON = (json) => {
    console.log(json)

    const toFormattedTrack = ({
      ['Track ID']: id,
      ['Artist']: artist,
      ['Name']: title,
      ['Location']: filePath,
      ['Total Time']: duration,
    }) => {
      return { id, artist, title, filePath, duration }
    }

    const toFormattedPlaylist = ({
      ['Name']: title,
      ['Playlist ID']: id,
      ['Playlist Items']: trackReferences = [],
      ['Playlist Persistent ID']: persistentId,
      ['Parent Persistent ID']: parentPersistentId,
    }) => {
      const trackIds = trackReferences.map((ref) => ref['Track ID'])
      return { id, title, trackIds, persistentId, parentPersistentId }
    }

    const tracks = json['Tracks'].map(toFormattedTrack)
    const playlists = json['Playlists'].map(toFormattedPlaylist)

    const toProcessedPlaylist = ({
      id,
      title,
      trackIds,
      persistentId,
      // parentPersistentId,
    }) => {
      const playlistTracks = trackIds.map((trackId) => {
        return tracks.find(({ id }) => id === trackId)
      })
      // Reducer?
      const playlistChildren = playlists
        .filter((p) => p.parentPersistentId === persistentId)
        .map(toProcessedPlaylist)

      return {
        tracks: playlistTracks,
        children: playlistChildren,
        id,
        title,
      }
    }

    const topLevelPlaylists = playlists.reduce((prev, curr, i, arr) => {
      const { parentPersistentId } = curr

      if (parentPersistentId) {
        const parent = arr.find((pl) => pl.persistentId === parentPersistentId)
        const isTopLevel = !parent.parentPersistentId
        const isDuplicate = prev.includes(parent)
        return isTopLevel && !isDuplicate ? [...prev, parent] : prev
      } else {
        return prev
      }
    }, [])

    const processedJSON = {
      playlists: topLevelPlaylists.map(toProcessedPlaylist),
    }

    console.log(processedJSON)
    return processedJSON
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

      setTimeout(() => {
        const json = parseComplexNode(xml.children[0].children[0])
        processLibraryJSON(json)
      }, 50)
    }
  }

  fetchXML()

  return <button onClick={() => console.log(window.libxml)}>Log XML</button>
}
