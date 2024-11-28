import { useQuery } from "@tanstack/react-query";
import { NavLink, useParams } from "react-router-dom";
import { fetchPostDetail } from "../Api/api";

const FetchRQDetail = () => {
  const params = useParams();
 

  const fetchPostDetailData = async (id) => {
    const res = await fetchPostDetail(id);
    return res.data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["posts", params.id],
    queryFn: () => fetchPostDetailData(params.id),
  });

  if (isLoading) return <div>Loading...</div>;
  return (
    <div>
      <h1>Fetch RQ Detail "{data.id}"</h1>
      <p>{data.title}</p>
      <p>{data.body}</p>

      <NavLink to="/fetchold">
        <button>Go Back</button>
      </NavLink>
    </div>
  );
};
export default FetchRQDetail;
