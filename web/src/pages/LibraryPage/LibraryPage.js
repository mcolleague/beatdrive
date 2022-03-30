import { MetaTags } from '@redwoodjs/web'
import FilesCell from 'src/components/FilesCell'
import ItunesLibraryXMLFileCell from 'src/components/ItunesLibraryXMLFileCell'

const LibraryPage = () => {
  return (
    <>
      <MetaTags title="Library" description="Library" />

      <h1>Library</h1>
      <ItunesLibraryXMLFileCell />
      <FilesCell />
    </>
  )
}

export default LibraryPage
