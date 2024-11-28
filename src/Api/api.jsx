import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
});

export const fetchPosts = (pageNumbers) => {
  return api.get(`/posts?_start=${pageNumbers}&_limit=3`);
};

export const fetchPostDetail = (id) => {
  return api.get(`/posts/${id}`);
};
export const deletePostData = (id) => {
  return api.delete(`/posts/${id}`);
};
export const updatePostData = (id) => {
  return api.patch(`/posts/${id}`, { title: "I Have updated" });
};

export const fetchUsers = async ({pageParam = 1}) => {
  try {
    const res = await axios.get(
      `https://api.github.com/users?per_page=10&page=${pageParam}`
    );
  
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};
