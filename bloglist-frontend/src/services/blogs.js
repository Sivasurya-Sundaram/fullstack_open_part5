import axios from 'axios';
const baseUrl = '/api/blogs';
let token = null;
const setToken = async (userToken) => {
  token = `Bearer ${userToken}`;
};
const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};
const addBlog = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};
const updateBlog = async (updatedBlog) => {
  const url = `${baseUrl}/${updatedBlog.id}`;
  const response = await axios.put(url, updatedBlog);
  return response.data;
};
const deleteBlog = async (id) => {
  const url = `${baseUrl}/${id}`;
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(url, config);
  return response.data;
};
export default { getAll, addBlog, updateBlog, deleteBlog, setToken };
