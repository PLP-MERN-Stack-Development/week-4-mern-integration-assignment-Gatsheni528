import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => (
  <>
    <Navbar />
    <main className="p-4 max-w-4xl mx-auto">
      <Outlet />
    </main>
  </>
);

export default Layout;