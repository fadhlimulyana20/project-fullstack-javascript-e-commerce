
import React, { useEffect, useState } from "react";
import { fetchAdmins, createAdmin, updateAdmin, deleteAdmin } from "./apiAdmins";

const AdminManagement = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ email: "", password: "" });
  const [editId, setEditId] = useState(null);

  const loadAdmins = async () => {
    setLoading(true);
    try {
      const data = await fetchAdmins();
      setAdmins(data);
      setError("");
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadAdmins();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await updateAdmin(editId, form);
      } else {
        await createAdmin(form);
      }
      setForm({ email: "", password: "" });
      setEditId(null);
      loadAdmins();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (admin) => {
    setForm({ email: admin.email, password: "" });
    setEditId(admin.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin hapus admin ini?")) return;
    try {
      await deleteAdmin(id);
      loadAdmins();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="p-8 min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Admin Management</h1>
      <div className="w-full max-w-2xl bg-white rounded-lg shadow p-8 flex flex-col items-center">
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 mb-6">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input input-bordered w-full border px-3 py-2 rounded"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder={editId ? "Password baru (opsional)" : "Password"}
            className="input input-bordered w-full border px-3 py-2 rounded"
            value={form.password}
            onChange={handleChange}
            required={!editId}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {editId ? "Update Admin" : "Tambah Admin"}
          </button>
          {editId && (
            <button
              type="button"
              className="text-gray-500 underline"
              onClick={() => {
                setEditId(null);
                setForm({ email: "", password: "" });
              }}
            >
              Batal Edit
            </button>
          )}
        </form>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        {loading ? (
          <div>Loading...</div>
        ) : (
          <table className="w-full text-left border-t">
            <thead>
              <tr>
                <th className="py-2">Email</th>
                <th className="py-2">Tanggal Dibuat</th>
                <th className="py-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr key={admin.id} className="border-t">
                  <td className="py-2">{admin.email}</td>
                  <td className="py-2">{new Date(admin.created_at).toLocaleString()}</td>
                  <td className="py-2 flex gap-2">
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => handleEdit(admin)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => handleDelete(admin.id)}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminManagement;
