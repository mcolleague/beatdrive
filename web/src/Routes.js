// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route } from '@redwoodjs/router'
import TagsLayout from 'src/layouts/TagsLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={TagsLayout}>
        <Route path="/tags/new" page={TagNewTagPage} name="newTag" />
        <Route path="/tags/{id:Int}/edit" page={TagEditTagPage} name="editTag" />
        <Route path="/tags/{id:Int}" page={TagTagPage} name="tag" />
        <Route path="/tags" page={TagTagsPage} name="tags" />
      </Set>
      <Route path="/" page={HomePage} name="home" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
