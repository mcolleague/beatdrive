import { MetaTags } from '@redwoodjs/web'
import Library from 'src/components/Library/Library'

const LibraryPage = () => {
  return (
    <>
      <MetaTags title="Library" description="Library" />

      <h1>Library</h1>
      <Library />
    </>
  )
}

export default LibraryPage
