import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="bg-blue-600 p-4 text-white">
    <div className="max-w-4xl mx-auto flex justify-between">
      <Link to="/" className="font-bold">MERN Blog</Link>
      <Link to="/new" className="hover:underline">New Post</Link>
    </div>
  </nav>
);

export default Navbar;