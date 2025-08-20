import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from './Navbar';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Product not found');
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image_url: product.image_url,
        quantity: quantity
      });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    setQuantity(1);
    alert('Produk ditambahkan ke keranjang!');
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
  if (!product) return null;

  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto p-4">
        <div className="flex flex-col md:flex-row gap-8 bg-white rounded-lg shadow-lg p-6">
        {/* Image gallery */}
        <div className="flex flex-col gap-4 w-full md:w-1/2">
          <img
            src={product.image_url || '/vite.svg'}
            alt={product.name}
            className="w-full h-80 object-contain rounded-lg border"
          />
          {/* Hanya satu gambar utama, thumbnail dihapus */}
        </div>
        {/* Product info */}
        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
          <div className="text-gray-500 mb-2">SKU: {product.id}</div>
          <div className="text-xl font-semibold text-blue-600 mb-2">Rp{product.price.toLocaleString('id-ID')}</div>
          <div className="mb-4 text-gray-700">{product.description}</div>
          {/* Color & size dihapus karena belum ada fitur */}
          {/* Add to cart (dummy) */}
          <div className="flex items-center gap-2 mb-4">
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={e => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-16 border rounded px-2 py-1"
            />
            <button
              className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
              onClick={handleAddToCart}
            >
              Tambahkan ke Keranjang
            </button>
          </div>
          <div className="flex gap-4 text-sm text-gray-500">
            <span>In stock</span>
            <span>|</span>
            <span>Free shipping</span>
          </div>
          <Link to="/" className="mt-4 text-blue-500 hover:underline">&larr; Back to Products</Link>
        </div>
        </div>
        {/* Policy section (dummy) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="flex flex-col items-center p-4 border rounded">
            <span className="font-semibold mb-2">Security Policy</span>
            <span className="text-xs text-gray-500">Edit with Customer Reassurance Module.</span>
          </div>
          <div className="flex flex-col items-center p-4 border rounded">
            <span className="font-semibold mb-2">Delivery Policy</span>
            <span className="text-xs text-gray-500">Edit with Customer Reassurance Module.</span>
          </div>
          <div className="flex flex-col items-center p-4 border rounded">
            <span className="font-semibold mb-2">Return Policy</span>
            <span className="text-xs text-gray-500">Edit with Customer Reassurance Module.</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
