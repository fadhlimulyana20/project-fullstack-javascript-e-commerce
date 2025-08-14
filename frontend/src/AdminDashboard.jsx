import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      navigate('/admin/login');
    }
  }, [navigate]);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Selamat datang di dasbor admin!</p>
    </div>
  );
};

export default AdminDashboard;
