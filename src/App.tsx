import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Layout from "./pages/Layout.tsx"
import Books from "./pages/Books.tsx"
import NewBook from "./pages/NewBook.tsx"
import NewBookItem from "./pages/NewBookItem.tsx"
import RedBugApp from "./redbug/RedBugApp.tsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/books", element: <Books /> },
      { path: "/books/new", element: <NewBook /> },

      { path: "/book-items/new", element: <NewBookItem /> },
    ],
  },
])

function App() {
  return (
    <RedBugApp>
      <RouterProvider router={router} />
    </RedBugApp>
  )
}

export default App
