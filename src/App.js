import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import ErrorPage from "./pages/ErrorPage";
import Home from "./components/Home";
import ViewRepositories from "./components/ViewRepositories";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/repositories/:owner/:repoName",
    element: <ViewRepositories />,
    errorElement: <ErrorPage />,
  },
]);

const App = () => {
  return <RouterProvider router={routes}></RouterProvider>;
};

export default App;
