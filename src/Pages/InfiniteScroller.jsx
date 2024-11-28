import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchUsers } from "../Api/api";
import { useEffect } from "react";

const InfiniteScroller = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    getNextPageParam: (lastPage, allPages) => {
      // Define the next page number
      if (lastPage.length === 10) {
        return allPages.length + 1; // Increment page number if there are more results
      }
      return undefined; // No more pages to fetch
    },
  });

  console.log(data)

  const handleScroll = ()=>{
     const heightData =  window.innerHeight + window.scrollY > document.documentElement.scrollHeight - 1
     if (hasNextPage && heightData) {
      fetchNextPage()
      }


  }

  useEffect(()=>{
    document.addEventListener('scroll',handleScroll)
    return ()=>{
      document.removeEventListener('scroll',handleScroll)
      }
  },[hasNextPage])

  return (
    <div>
      <h1>Infinite Scroller</h1>
      {data?.pages.map((page, index) => (
        <div key={index}>
          {page.map((user) => (
            <div key={user.id}>   
              <p>{user.login}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default InfiniteScroller;
