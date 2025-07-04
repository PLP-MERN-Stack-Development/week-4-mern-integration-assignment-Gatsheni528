import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PostForm from '../components/PostForm';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: '',
    category: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`/api/posts/${id}`);
        setFormData(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch post', err);
      }
    };
    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/posts/${id}`, formData);
      navigate(`/posts/${id}`);
    } catch (err) {
      console.error('Failed to update post', err);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading post...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4">Edit Post</h2>
      <PostForm formData={formData} setFormData={setFormData} onSubmit={handleSubmit} />
    </div>
  );
};

export default EditPost;