import React, { useEffect, useState } from 'react';
import { updateOrderStatus } from './apiOrders';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showProducts, setShowProducts] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders');
      if (!response.ok) throw new Error('Gagal mengambil data order');
      const data = await response.json();
      setOrders(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      fetchOrders();
    } catch (err) {
      alert('Gagal mengubah status: ' + err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{color: 'red'}}>Error: {error}</div>;

  const handleShowProducts = (cartItems) => {
    let items = [];
    try {
      items = typeof cartItems === 'string' ? JSON.parse(cartItems) : cartItems;
    } catch {
      items = [];
    }
    setSelectedProducts(items);
    setShowProducts(true);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Manajemen Pesanan</h2>
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-700">ID</th>
              <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-700">Pelanggan</th>
              <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-700">Tanggal</th>
              <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-700">Total</th>
              <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-700">Status</th>
              <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-700">Aksi</th>
              <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-700">Detail Produk</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-4 py-4 text-center text-gray-500">Tidak ada pesanan</td>
              </tr>
            ) : (
              orders.map(order => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b">{order.id}</td>
                  <td className="px-4 py-2 border-b">{order.customer_name || order.customerId}</td>
                  <td className="px-4 py-2 border-b">{order.created_at ? new Date(order.created_at).toLocaleString() : '-'}</td>
                  <td className="px-4 py-2 border-b">{order.total}</td>
                  <td className="px-4 py-2 border-b">
                    <span className="inline-block px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 border-b">
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs"
                      onClick={() => handleShowProducts(order.cart_items)}
                    >
                      Lihat Produk
                    </button>
                  </td>
                  <td className="px-4 py-2 border-b">
                    <select
                      className="border rounded px-2 py-1 text-sm"
                      value={order.status}
                      onChange={e => handleStatusChange(order.id, e.target.value)}
                    >
                      <option value="Dipesan">Dipesan</option>
                      <option value="Sudah Dibayar">Sudah Dibayar</option>
                      <option value="Sudah dikirim">Sudah dikirim</option>
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Modal Daftar Produk */}
      {showProducts && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 min-w-[300px] max-w-[90vw]">
            <h3 className="text-lg font-bold mb-2">Daftar Produk Dipesan</h3>
            <table className="min-w-full text-sm mb-4">
              <thead>
                <tr>
                  <th className="px-2 py-1 border-b text-left">Nama Produk</th>
                  <th className="px-2 py-1 border-b text-left">Kuantitas</th>
                  <th className="px-2 py-1 border-b text-left">Harga</th>
                  <th className="px-2 py-1 border-b text-left">Total Harga</th>
                </tr>
              </thead>
              <tbody>
                {selectedProducts.length === 0 ? (
                  <tr><td colSpan="4" className="text-center text-gray-500">Tidak ada produk</td></tr>
                ) : (
                  selectedProducts.map((item, idx) => {
                    const qty = item.quantity || item.qty || 1;
                    const price = item.price || 0;
                    return (
                      <tr key={idx}>
                        <td className="px-2 py-1 border-b">{item.name || item.product_name || '-'}</td>
                        <td className="px-2 py-1 border-b">{qty}</td>
                        <td className="px-2 py-1 border-b">Rp {price.toLocaleString('id-ID')}</td>
                        <td className="px-2 py-1 border-b">Rp {(qty * price).toLocaleString('id-ID')}</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
            <button
              className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-1 rounded"
              onClick={() => setShowProducts(false)}
            >Tutup</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;
