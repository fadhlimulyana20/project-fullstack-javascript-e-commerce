import React from "react";
import ProductList from "./ProductList";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4 text-center">Selamat Datang di Toko Kami!</h1>
        <p className="text-center text-gray-600 mb-8">
          Temukan produk terbaik untuk kebutuhan Anda.
        </p>
        <ProductList />
      </div>
    </>
  );
}

export default HomePage;
