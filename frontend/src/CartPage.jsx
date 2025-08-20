import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';

const CartPage = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    setCart(storedCart ? JSON.parse(storedCart) : []);
  }, []);

  const updateQuantity = (productId, quantity) => {
    const newCart = cart.map(item =>
      item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
    );
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const removeFromCart = (productId) => {
    const newCart = cart.filter(item => item.id !== productId);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <>
        <Navbar />
        <div className="max-w-3xl mx-auto p-4 text-center">Keranjang belanja kosong.</div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Keranjang Belanja</h1>
        <table className="w-full mb-4 border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Produk</th>
              <th className="p-2">Harga</th>
              <th className="p-2">Kuantitas</th>
              <th className="p-2">Subtotal</th>
              <th className="p-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {cart.map(item => (
              <tr key={item.id} className="border-t">
                <td className="p-2 flex items-center gap-2">
                  <img src={item.image_url || '/vite.svg'} alt={item.name} className="w-12 h-12 object-contain border rounded" />
                  <span>{item.name}</span>
                </td>
                <td className="p-2">Rp{item.price.toLocaleString('id-ID')}</td>
                <td className="p-2">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={e => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                    className="w-16 border rounded px-2 py-1"
                  />
                </td>
                <td className="p-2">Rp{(item.price * item.quantity).toLocaleString('id-ID')}</td>
                <td className="p-2">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:underline"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="text-right font-bold text-xl mb-4">Total: Rp{total.toLocaleString('id-ID')}</div>
      </div>
    </>
  );
};

export default CartPage;
