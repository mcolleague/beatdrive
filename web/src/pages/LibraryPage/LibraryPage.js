import { MetaTags } from '@redwoodjs/web'
import FilesCell from 'src/components/FilesCell'

const LibraryPage = () => {
  return (
    <>
      <MetaTags title="Library" description="Library" />

      <h1>Library</h1>
      <FilesCell />
    </>
  )
}

export default LibraryPage
