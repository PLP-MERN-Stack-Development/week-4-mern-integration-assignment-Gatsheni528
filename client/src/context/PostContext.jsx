import { createContext, useContext, useEffect, useState } from 'react';
import { useApi } from '../hooks/useApi';

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const { get } = useApi();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const data = await get('/posts');
      setPosts(data);
    } catch (err) {
      setError('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <PostContext.Provider value={{ posts, setPosts, fetchPosts, loading, error }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePosts = () => useContext(PostContext);