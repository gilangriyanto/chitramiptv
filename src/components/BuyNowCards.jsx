import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// URL backend PHP Anda. Pastikan ini sesuai dengan lokasi file index.php Anda.
// Ini harus sama dengan API_BASE_URL di App.js
const API_BASE_URL = "http://localhost:8080/belajarphp/backend-projek1jt/index.php"; // Ganti jika path Anda berbeda

const BuyNowCards = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fungsi untuk mengambil data produk dari backend
    const fetchProducts = async () => {
      try {
        setLoading(true); // Mulai loading
        const response = await fetch(`${API_BASE_URL}/cards`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // Mengkonversi data dari backend agar sesuai dengan struktur yang diharapkan oleh kartu
        const formattedProducts = data.map((card) => ({
          id: card.id,
          name: card.title, // 'title' dari backend menjadi 'name' di frontend
          price: `Rp ${parseFloat(card.price).toLocaleString("id-ID", { minimumFractionDigits: 2 })}`, // Format harga
          image: card.image,
          description: card.description, // Sertakan deskripsi
          features: Array.isArray(card.features) ? card.features : [], // Pastikan ini adalah array
          category: card.category || "General", // Ambil kategori, atau default 'General'
        }));
        setProducts(formattedProducts);
      } catch (e) {
        console.error("Error fetching products:", e);
        setError("Gagal memuat produk. Pastikan server backend berjalan.");
      } finally {
        setLoading(false); // Selesai loading
      }
    };

    fetchProducts();
  }, []); // [] berarti efek ini hanya berjalan sekali setelah render pertama

  const handleProductClick = (product) => {
    // Navigate to cart with product data
    navigate("/cart", { state: { product } });
  };

  return (
    <section className="px-6 py-8 bg-white rounded-3xl mx-6 mb-8">
      {/* 3 Simple Steps Section */}
      <div className="text-center mb-16">
        <h1 className="text-2xl font-medium text-gray-800 mb-2">Coba Sebelum Beli</h1>
        <div className="flex items-center justify-center gap-2 mb-12">
          <span className="text-3xl">🍿</span>
          <span className="text-3xl font-bold text-pink-500">3 Langkah Mudah</span>
        </div>

        {/* Steps */}
        <div className="flex justify-center items-center gap-16 mb-16">
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mb-4 mx-auto">01</div>
            <h3 className="text-gray-700 font-medium">WhatsApp Kami</h3>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mb-4 mx-auto">02</div>
            <h3 className="text-gray-700 font-medium">Dapatkan Info</h3>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mb-4 mx-auto">03</div>
            <h3 className="text-700 font-medium">Nikmati Tontonannya</h3>
          </div>
        </div>
      </div>

      {/* Products Grid - 4x2 Image Cards */}
      <div className="max-w-7xl mx-auto">
        {loading ? (
          <p className="text-center text-gray-600 text-xl py-10">Memuat produk...</p>
        ) : error ? (
          <p className="text-center text-red-600 text-xl py-10">{error}</p>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-500 text-xl py-10">Belum ada produk yang ditambahkan oleh admin.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                onClick={() => handleProductClick(product)}
                className="w-full h-64 rounded-2xl overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl group relative"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `data:image/svg+xml;base64,${btoa(`
                      <svg width="320" height="256" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <linearGradient id="grad${product.id}" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style="stop-color:#8b5cf6;stop-opacity:1" />
                            <stop offset="100%" style="stop-color:#ec4899;stop-opacity:1" />
                          </linearGradient>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grad${product.id})"/>
                        <text x="50%" y="45%" text-anchor="middle" fill="white" font-size="14" font-weight="bold">${product.name}</text>
                        <text x="50%" y="65%" text-anchor="middle" fill="white" font-size="18" font-weight="bold">${product.price}</text>
                      </svg>
                    `)}`;
                  }}
                />

                {/* Overlay with product info - Diperbarui untuk menampilkan deskripsi, fitur, dan kategori */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="font-bold text-lg mb-1 truncate">{product.name}</h3>
                    <p className="text-sm text-gray-200 line-clamp-2 mb-1">{product.description}</p>

                    {product.features && product.features.length > 0 && (
                      <ul className="text-xs text-gray-300 list-disc list-inside mb-1">
                        {product.features.slice(0, 2).map(
                          (
                            feature,
                            index // Tampilkan hingga 2 fitur
                          ) => (
                            <li key={index} className="truncate">
                              {feature}
                            </li>
                          )
                        )}
                        {product.features.length > 2 && <li className="text-xs">+{product.features.length - 2} lainnya</li>}
                      </ul>
                    )}

                    {product.category && <p className="text-xs text-gray-400 mb-1">Kategori: {product.category}</p>}
                    <p className="text-2xl font-bold text-pink-300">{product.price}</p>
                  </div>
                </div>

                {/* Click indicator */}
                <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="text-white text-lg">🛒</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BuyNowCards;
