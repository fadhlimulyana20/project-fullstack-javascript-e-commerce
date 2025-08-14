
import React, { useEffect, useState } from "react";
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./apiProducts";

const initialForm = {
  name: "",
  description: "",
  price: "",
  stock: "",
  image_url: "",
};

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        await updateProduct(editingId, form);
      } else {
        await createProduct(form);
      }
      setForm(initialForm);
      setEditingId(null);
      await loadProducts();
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      description: product.description || "",
      price: product.price,
      stock: product.stock,
      image_url: product.image_url || "",
    });
    setEditingId(product.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Hapus produk ini?")) return;
    setLoading(true);
    try {
      await deleteProduct(id);
      await loadProducts();
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  };

  return (
    <div className="p-8 min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Product Management</h1>
      <div className="w-full max-w-2xl bg-white rounded-lg shadow p-8 flex flex-col items-center">
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 mb-8">
          <input
            className="border rounded px-3 py-2"
            name="name"
            placeholder="Nama Produk"
            value={form.name}
            onChange={handleChange}
            required
          />
          <textarea
            className="border rounded px-3 py-2"
            name="description"
            placeholder="Deskripsi"
            value={form.description}
            onChange={handleChange}
          />
          <div className="flex gap-4">
            <input
              className="border rounded px-3 py-2 w-1/2"
              name="price"
              type="number"
              min="0"
              step="0.01"
              placeholder="Harga"
              value={form.price}
              onChange={handleChange}
              required
            />
            <input
              className="border rounded px-3 py-2 w-1/2"
              name="stock"
              type="number"
              min="0"
              placeholder="Stok"
              value={form.stock}
              onChange={handleChange}
              required
            />
          </div>
          <input
            className="border rounded px-3 py-2"
            name="image_url"
            placeholder="URL Gambar (opsional)"
            value={form.image_url}
            onChange={handleChange}
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
              disabled={loading}
            >
              {editingId ? "Update" : "Tambah"} Produk
            </button>
            {editingId && (
              <button
                type="button"
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                onClick={() => {
                  setForm(initialForm);
                  setEditingId(null);
                }}
              >
                Batal
              </button>
            )}
          </div>
        </form>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="w-full">
          {loading ? (
            <div className="text-center text-gray-500">Loading...</div>
          ) : products.length === 0 ? (
            <div className="text-center text-gray-500">Belum ada produk.</div>
          ) : (
            <table className="w-full text-left border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2">Nama</th>
                  <th className="p-2">Harga</th>
                  <th className="p-2">Stok</th>
                  <th className="p-2">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className="border-t">
                    <td className="p-2">{p.name}</td>
                    <td className="p-2">Rp {Number(p.price).toLocaleString()}</td>
                    <td className="p-2">{p.stock}</td>
                    <td className="p-2 flex gap-2">
                      <button
                        className="bg-yellow-400 px-3 py-1 rounded text-white hover:bg-yellow-500"
                        onClick={() => handleEdit(p)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-600 px-3 py-1 rounded text-white hover:bg-red-700"
                        onClick={() => handleDelete(p.id)}
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
    </div>
  );
};

export default ProductManagement;
