import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { deletePostData, fetchPosts, updatePostData } from "../Api/api";
import { useState } from "react";

const FetchRQ = () => {
  const [pageNumber, setPageNumber] = useState(0);

  const fetchPostsData = async (pageNumber) => {
    try {
      const res = await fetchPosts(pageNumber);
      if (res.status === 200) {
        return res.data;
      } else {
        return [];
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const {
    data: getPost,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["data", pageNumber],
    queryFn: () => fetchPostsData(pageNumber),
    placeholderData: keepPreviousData,

    // staleTime: 10000,
    // refetchInterval: 3000,
    // refetchIntervalInBackground: true
  });

  const queryClient = useQueryClient();
  //! this method delete the data from the api but not from the ui because the data is stored in the cache memory to dlete the data from caches memory we need to use useQueryClient
  const deletePost = useMutation({
    mutationFn: (id) => deletePostData(id),
    onSuccess: (data, id) => {
      // this will give caches data from queryKey: ["data", pageNumber]
      queryClient.setQueryData(["data", pageNumber], (curData) => {
        const confirmation = confirm(
          `Are you sure you want to delete ${curData.title}`
        );
        return confirmation
          ? curData.filter((postData) => postData.id !== id)
          : curData;
      }); //? this line means that we want to access this query key caches data from queryKey: ["data", pageNumber], ie. first three data [{},{},{}] and then we can apply filter on the curData and this will delete the data from the UI also
    },
  });


  // to update the text
  const updatePost = useMutation({
    mutationFn: (id) => updatePostData(id),
    onSuccess: (apiData, postID) => {
      queryClient.setQueryData(["data", pageNumber], (postsDataFromApi) => {
        return postsDataFromApi.map((curPost) =>
          curPost.id === postID ? { ...curPost, title: apiData.data.title } : curPost
        );
      });
    },
  });

 

  //! this method delete the data from the api but not from the ui because the data is stored in the cache memory to dlete the data from caches memory we need to use useQueryClient
  // const deletePost = useMutation({
  //   mutationFn: (id) => deletePostData(id)
  // })

  // console.log(getPost);

  if (isLoading) return <h1>Loading.....</h1>;
  if (isError) return <h1>Error fetching data</h1>;

  return (
    <div>
      {(getPost &&
        getPost.map((post) => (
          <div key={post.id}>
            <h1>{post.id}</h1>
            <h2>{post.title}</h2>
            <p>{post.body}</p>

            <button onClick={() => deletePost.mutate(post.id)}>Delete</button>
            <button onClick={() => updatePost.mutate(post.id)}>update</button>
          </div>
        ))) || <p>No posts found</p>}

      <div className="">
        <button
          disabled={pageNumber === 0 ? true : false}
          onClick={() => setPageNumber((prevVal) => prevVal - 3)}
        >
          Prev
        </button>
        <p>{pageNumber / 3 + 1}</p>
        <button
          disabled={getPost.length < 3}
          onClick={() => setPageNumber((prevVal) => prevVal + 3)}
        >
          Next
        </button>
      </div>
    </div>
  );
};
export default FetchRQ;
