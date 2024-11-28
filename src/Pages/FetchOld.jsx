import { useEffect, useState, useTransition } from "react";
import { fetchPosts } from "../Api/api";
import { NavLink } from "react-router-dom";

const PAGE_SIZE = 3;

const FetchOld = () => {
  const [getPost, setGetPost] = useState([]); // Store posts
  const [isPending, startTransition] = useTransition(); // Smooth updates
  const [pageNumber, setPageNumber] = useState(0); // Current page index
  const [isInitialLoading, setIsInitialLoading] = useState(true); // Initial load flag

  const fetchData = (page) => {
    startTransition(async () => {
      try {
        const res = await fetchPosts(page);
        if (res.status === 200) {
          setGetPost(res.data); // Update posts after fetch
          if (isInitialLoading) setIsInitialLoading(false); // Mark initial loading as complete
        }
      } catch (error) {
        console.error("Error fetching posts:", error.message);
      }
    });
  };

  useEffect(() => {
    fetchData(pageNumber); // Fetch data on mount and pageNumber change
  }, [pageNumber]);

  // Render loading only for the initial load
  if (isInitialLoading) return <h2>Loading...</h2>;

  return (
    <div>
      {/* Render posts */}
      {getPost.map((post) => (
        <NavLink key={post.id} to={`/fetchold/${post.id}`}>
          <div>
            <h1>{post.id}</h1>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </div>
        </NavLink>
      ))}

      {/* Pagination Controls */}
      <div className="">
        <button 
          disabled={pageNumber === 0} 
          onClick={() => setPageNumber((prevVal) => prevVal - PAGE_SIZE)}>
          Prev
        </button>
        <p>{(pageNumber / PAGE_SIZE) + 1}</p>
        <button 
          disabled={getPost.length < PAGE_SIZE} 
          onClick={() => setPageNumber((prevVal) => prevVal + PAGE_SIZE)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default FetchOld;
 