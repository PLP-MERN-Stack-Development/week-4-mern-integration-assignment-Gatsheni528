import { Link } from 'react-router-dom';

const PostList = ({ posts }) => (
  <div className="space-y-4">
    {posts.map(post => (
      <div key={post._id} className="border p-4 rounded shadow">
        <h2 className="text-xl font-bold">{post.title}</h2>
        <p className="text-gray-700">{post.content.substring(0, 100)}...</p>
        <Link to={`/posts/${post._id}`} className="text-blue-600 hover:underline">Read More</Link>
      </div>
    ))}
  </div>
);

export default PostList;