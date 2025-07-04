import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
});

export const useApi = () => {
  const get = (url) => API.get(url).then(res => res.data);
  const post = (url, data) => API.post(url, data).then(res => res.data);
  const put = (url, data) => API.put(url, data).then(res => res.data);
  const del = (url) => API.delete(url).then(res => res.data);

  return { get, post, put, del };
};