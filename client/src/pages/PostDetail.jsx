const PostDetail = ({ post }) => (
  <div className="p-4 border rounded shadow">
    <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
    <p>{post.content}</p>
  </div>
);

export default PostDetail;