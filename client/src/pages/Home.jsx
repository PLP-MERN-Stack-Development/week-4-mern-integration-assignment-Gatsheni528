import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { usePost } from '../context/PostContext';

const Home = () => {
  const { posts, fetchPosts } = usePost();

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All Posts</h1>
      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        posts.map((post) => (
          <div key={post._id} className="border-b pb-4 mb-4">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-sm text-gray-600">{post.category}</p>
            <Link to={`/posts/${post._id}`} className="text-blue-500 mr-4">Read more</Link>
            <Link to={`/edit/${post._id}`} className="text-green-600">Edit</Link>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;