import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const adminMenu = [
  { label: "Dashboard", path: "/admin/dashboard" },
  { label: "Manajemen Produk", path: "/admin/products" },
  { label: "Manajemen Kategori", path: "/admin/categories" },
  { label: "Manajemen Admin", path: "/admin/admins" },
  { label: "Manajemen Order", path: "/admin/orders" },
];

const AdminLayout = () => {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow flex flex-col p-6">
        <h2 className="text-2xl font-bold mb-8 text-blue-700">Admin Menu</h2>
        <nav className="flex flex-col gap-4">
          {adminMenu.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `px-4 py-2 rounded transition font-medium ${
                  isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-blue-100"
                }`
              }
              end
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-10">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
