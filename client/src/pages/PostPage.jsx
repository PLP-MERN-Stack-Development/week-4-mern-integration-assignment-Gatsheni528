import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PostDetail from '../components/PostDetail';

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios.get(\`/api/posts/\${id}\`)
      .then(res => setPost(res.data))
      .catch(err => console.error(err));
  }, [id]);

  return (
    <div>
      {post ? <PostDetail post={post} /> : <p>Loading...</p>}
    </div>
  );
};

export default PostPage;