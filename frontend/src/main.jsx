import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router';
import './style.css';

import HomePage from './HomePage.jsx';
import AboutPage from './AboutPage.jsx';
import ProductDetail from './ProductDetail.jsx';
import CartPage from './CartPage.jsx';

import AdminLogin from './AdminLogin.jsx';
import AdminRegister from './AdminRegister.jsx';



import AdminDashboard from './AdminDashboard.jsx';
import ProductManagement from './ProductManagement.jsx';
import CategoryManagement from './CategoryManagement.jsx';
import AdminManagement from './AdminManagement.jsx';
import AdminLayout from './AdminLayout.jsx';



const router = createBrowserRouter([
  {
    path: '/cart',
    element: <CartPage />,
  },
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/product/:id',
    element: <ProductDetail />,
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
    path: '/admin',
    element: <AdminLayout />, // Sidebar layout for all admin pages
    children: [
      { path: 'dashboard', element: <AdminDashboard /> },
      { path: 'products', element: <ProductManagement /> },
      { path: 'categories', element: <CategoryManagement /> },
      { path: 'admins', element: <AdminManagement /> },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
