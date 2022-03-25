import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <h1>Home</h1>
      <div>
        <Link to={routes.library()}>Library</Link>
      </div>
    </>
  )
}

export default HomePage
