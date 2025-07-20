import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await api.post('/admin/login', { email, password });
      localStorage.setItem('adminToken', res.data.token);
      navigate('/admin');
    } catch {
      setError('Login failed');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="space-y-4 border p-4 rounded">
        <h1 className="text-2xl font-bold">Admin Login</h1>
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-64"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-64"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          Login
        </button>
      </form>
    </div>
  );
}
