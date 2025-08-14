import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router';
import './style.css';
import HomePage from './HomePage.jsx';
import AboutPage from './AboutPage.jsx';

import AdminLogin from './AdminLogin.jsx';
import AdminRegister from './AdminRegister.jsx';

import AdminDashboard from './AdminDashboard.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/about',
    element: <AboutPage />,
  },
  {
    path: '/admin/login',
    element: <AdminLogin />,
  },
  {
    path: '/admin/register',
    element: <AdminRegister />,
  },
  {
    path: '/admin/dashboard',
    element: <AdminDashboard />,
  },
]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
