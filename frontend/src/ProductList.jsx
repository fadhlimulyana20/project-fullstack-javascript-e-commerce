import React, { useEffect, useState } from "react";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Ganti URL di bawah dengan endpoint API produk yang sesuai
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => setProducts([]));
  }, []);

  return (
  <div className="mx-auto px-4 py-8 max-w-6xl">
      <h2 className="text-2xl font-bold mb-6 text-center">Daftar Produk</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length === 0 ? (
          <div className="col-span-4 text-center text-gray-500">Tidak ada produk.</div>
        ) : (
          products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center hover:shadow-lg transition-shadow"
            >
              {/* Gambar produk jika ada */}
              {(product.image_url || product.imageUrl) && (
                <div className="w-full h-40 mb-4 overflow-hidden flex items-center justify-center bg-gray-50 rounded">
                  <img
                    src={product.image_url || product.imageUrl}
                    alt={product.name}
                    className="w-full h-40 object-cover"
                  />
                </div>
              )}
              <h3 className="text-lg font-semibold mb-2 text-center">{product.name}</h3>
              <p className="text-gray-700 font-bold text-center">Rp{product.price.toLocaleString()}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductList;
