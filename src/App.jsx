import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AppLayout from "./components/Layouts/AppLayout";
import Home from "./Pages/Home";
import FetchOld from "./Pages/FetchOld";
import FetchRQ from "./Pages/FetchRQ";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import FetchRQDetail from "./Pages/FetchRQDetail";
import InfiniteScroller from "./Pages/InfiniteScroller";
import Reducer from "./Pages/Reducer";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/fetchold",
        element: <FetchOld />,
      },
      {
        path: "/fetchrq",
        element: <FetchRQ />,
      },
      {
        path: "/fetchold/:id",
        element: <FetchRQDetail />,
      },
      {
        path: "/infinite",
        element: <InfiniteScroller />,
      },
      {
        path: "/reducer",
        element: <Reducer />,
      },
    ],
  },
]);

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  );
}

export default App;
