import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import api from './api';

interface Props {
  children: JSX.Element;
}

export default function ProtectedRoute({ children }: Props) {
  const [valid, setValid] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      setValid(false);
      return;
    }
    api
      .get('/admin/check', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => setValid(true))
      .catch(() => setValid(false));
  }, []);

  if (valid === null) return null;
  return valid ? children : <Navigate to="/admin-login" replace />;
}
