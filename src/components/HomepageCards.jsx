import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// URL backend PHP Anda. Pastikan ini sesuai dengan lokasi file index.php Anda.
// Ini harus sama dengan API_BASE_URL di App.js dan BuyNowCards.js
const API_BASE_URL = "http://localhost:8080/belajarphp/backend-projek1jt/index.php"; // Ganti jika path Anda berbeda

const HomepageCards = () => {
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
          description: card.description,
          features: Array.isArray(card.features) ? card.features : [],
          category: card.category || "General",
        }));
        // Ambil hingga 3 kartu saja untuk homepage, karena desain aslinya menampilkan 3 kartu statis
        setProducts(formattedProducts.slice(0, 3));
      } catch (e) {
        console.error("Error fetching homepage products:", e);
        setError("Gagal memuat kartu. Pastikan server backend berjalan.");
      } finally {
        setLoading(false); // Selesai loading
      }
    };

    fetchProducts();
  }, []); // [] berarti efek ini hanya berjalan sekali setelah render pertama

  const handleProductClick = (product) => {
    // Navigasi ke halaman buy-now, atau bisa juga ke halaman detail produk jika ada
    navigate("/buy-now", { state: { product } }); // Meneruskan data produk ke halaman buy-now jika diperlukan
  };

  return (
    <section
      className="px-6 py-12 min-h-screen"
      style={{
        backgroundImage: `url('/images/Homepricing.png')`, // Pertahankan background image
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Promotional Banner */}
      <div className="flex justify-center py-8 mb-8">
        <div className="bg-gradient-to-r from-orange-400 to-pink-500 rounded-full px-8 py-3 flex items-center gap-4">
          <span className="text-2xl">🍿</span>
          <span className="text-white font-medium">Layanan yang Anda sukai hanya dengan 11.99</span>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-1 rounded text-sm transition-colors">Pelajari lebih lanjut</button>
        </div>
      </div>

      {/* Dynamic Image Cards */}
      <div className="flex justify-center flex-wrap gap-8">
        {" "}
        {/* Gunakan flex-wrap untuk responsif */}
        {loading ? (
          <p className="text-center text-white text-xl py-10 w-full">Memuat produk...</p>
        ) : error ? (
          <p className="text-center text-red-400 text-xl py-10 w-full">{error}</p>
        ) : products.length === 0 ? (
          <p className="text-center text-white/70 text-xl py-10 w-full">Belum ada produk yang ditambahkan oleh admin untuk halaman ini.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                onClick={() => handleProductClick(product)}
                className="w-[320px] h-80 rounded-2xl overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl group relative bg-white bg-opacity-90"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    e.target.onerror = null; // Mencegah loop error
                    e.target.src = `data:image/svg+xml;base64,${btoa(`
                      <svg width="320" height="320" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <linearGradient id="grad${product.id}" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style="stop-color:#8b5cf6;stop-opacity:1" />
                            <stop offset="100%" style="stop-color:#ec4899;stop-opacity:1" />
                          </linearGradient>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grad${product.id})"/>
                        <text x="50%" y="40%" text-anchor="middle" fill="white" font-size="18" font-weight="bold">${product.name}</text>
                        <text x="50%" y="60%" text-anchor="middle" fill="white" font-size="24" font-weight="bold">${product.price}</text>
                      </svg>
                    `)}`;
                  }}
                />

                {/* Overlay with product info */}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                  <div className="text-white text-center">
                    <h3 className="font-bold text-xl mb-1">{product.name}</h3>
                    <p className="text-sm text-gray-200 line-clamp-2 mb-2">{product.description}</p>
                    <p className="text-2xl font-bold text-pink-300">{product.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default HomepageCards;
