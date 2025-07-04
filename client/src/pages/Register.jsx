import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/auth/register', form);
    navigate('/login');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto mt-10">
      <input type="text" placeholder="Username" value={form.username}
        onChange={e => setForm({ ...form, username: e.target.value })}
        className="w-full border p-2 rounded" />
      <input type="password" placeholder="Password" value={form.password}
        onChange={e => setForm({ ...form, password: e.target.value })}
        className="w-full border p-2 rounded" />
      <button className="bg-blue-600 text-white px-4 py-2 rounded">Register</button>
    </form>
  );
};

export default Register;
