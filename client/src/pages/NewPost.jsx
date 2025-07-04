import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../hooks/useApi';
import { usePosts } from '../context/PostContext';
import PostForm from '../components/PostForm';

const NewPost = () => {
  const [formData, setFormData] = useState({ title: '', content: '' });
  const navigate = useNavigate();
  const { post } = useApi();
  const { setPosts } = usePosts();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const newPost = await post('/posts', formData);
      setPosts(prev => [newPost, ...prev]);
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Create New Post</h1>
      <PostForm formData={formData} setFormData={setFormData} onSubmit={handleSubmit} />
    </div>
  );
};

export default NewPost;