import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// Import Header dan Footer dikomentari karena definisinya tidak disediakan.
// Jika Anda memiliki komponen Header dan Footer, pastikan file-file tersebut ada
// di direktori '../components/' dan aktifkan kembali import di bawah ini.
// import Header from "../components/Header";
// import Footer from "../components/Footer";

const Cart = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  const [quantity, setQuantity] = useState(1);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  // If no product data, redirect back
  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-4">No Product Selected</h2>
          <button onClick={() => navigate("/buy-now")} className="bg-pink-500 hover:bg-pink-600 px-6 py-3 rounded-lg font-medium transition-colors">
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  // Pastikan harga adalah string yang dapat diurai sebelum melakukan perhitungan
  // Menghapus 'Rp ' dan mengganti koma dengan titik untuk parsing yang benar
  const rawPrice = product.price.replace("Rp ", "").replace(".", "").replace(",", ".");
  const totalPrice = (parseFloat(rawPrice) * quantity).toLocaleString("id-ID", { minimumFractionDigits: 2 }); // Format ulang total harga

  const handleInputChange = (e) => {
    setCustomerInfo({
      ...customerInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckout = () => {
    // Validate customer info
    if (!customerInfo.name || !customerInfo.phone) {
      // Mengganti alert() dengan pesan di konsol atau modal kustom untuk Canvas.
      // Untuk demonstrasi di Canvas, alert() mungkin tidak terlihat oleh pengguna.
      console.warn("Harap isi nama lengkap dan nomor telepon Anda.");
      alert("Harap isi nama lengkap dan nomor telepon Anda."); // Menggunakan alert untuk demonstrasi
      return;
    }

    // Membuat pesan WhatsApp
    const message = `🛒 *Permintaan Pesanan Baru*

📦 *Detail Produk:*
• Produk: ${product.name}
• Harga Satuan: ${product.price}
• Jumlah: ${quantity}
• Total: Rp ${totalPrice}
• Deskripsi: ${product.description}
${product.category ? `• Kategori: ${product.category}` : ""}

📝 *Fitur Produk:*
${product.features && product.features.length > 0 ? product.features.map((feature) => `• ${feature}`).join("\n") : "Tidak ada fitur yang tersedia."}

👤 *Informasi Pelanggan:*
• Nama: ${customerInfo.name}
• Telepon: ${customerInfo.phone}
• Email: ${customerInfo.email || "Tidak disediakan"}
• Alamat: ${customerInfo.address || "Tidak disediakan"}

Mohon konfirmasi pesanan ini dan berikan detail pembayaran. Terima kasih!`;

    // Nomor WhatsApp (ganti dengan nomor bisnis Anda)
    const whatsappNumber = "6281336353371"; // Ganti dengan nomor WhatsApp bisnis Anda
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    // Buka WhatsApp
    window.open(whatsappURL, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 font-inter">
      {/* <Header /> -- Dikomentari untuk mengatasi error kompilasi */}

      <main className="px-6 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">Keranjang Belanja</h1>
            <p className="text-white/80">Tinjau detail pesanan Anda dan lanjutkan checkout</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Details */}
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Detail Produk</h2>

              {/* Product Image */}
              <div className="w-full h-64 rounded-xl overflow-hidden mb-6">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = `data:image/svg+xml;base64,${btoa(`
                      <svg width="400" height="256" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style="stop-color:#8b5cf6;stop-opacity:1" />
                            <stop offset="100%" style="stop-color:#ec4899;stop-opacity:1" />
                          </linearGradient>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grad)"/>
                        <text x="50%" y="45%" text-anchor="middle" fill="white" font-size="18" font-weight="bold">${product.name}</text>
                        <text x="50%" y="65%" text-anchor="middle" fill="white" font-size="24" font-weight="bold">${product.price}</text>
                      </svg>
                    `)}`;
                  }}
                />
              </div>

              {/* Product Info */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{product.name}</h3>
                  {/* Deskripsi produk ditampilkan di sini */}
                  <p className="text-gray-600 mt-2">{product.description}</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Fitur Termasuk:</h4>
                  <ul className="space-y-1">
                    {product.features && product.features.length > 0 ? (
                      product.features.map((feature, index) => (
                        <li key={index} className="text-gray-700 flex items-center gap-2">
                          <span className="text-green-500">✓</span>
                          {feature}
                        </li>
                      ))
                    ) : (
                      <li className="text-gray-500">Tidak ada fitur yang tersedia.</li>
                    )}
                  </ul>
                </div>

                <div className="flex items-center justify-between py-4 border-t border-gray-200">
                  <span className="text-lg font-semibold text-gray-800">Kategori:</span>
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">{product.category || "Tidak Dikategorikan"}</span>
                </div>
              </div>
            </div>

            {/* Order Summary & Customer Info */}
            <div className="space-y-6">
              {/* Quantity & Price */}
              <div className="bg-white rounded-2xl p-8 shadow-xl">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Ringkasan Pesanan</h2>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Harga Satuan:</span>
                    <span className="text-xl font-bold text-gray-800">{product.price}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Jumlah:</span>
                    <div className="flex items-center gap-3">
                      <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors">
                        −
                      </button>
                      <span className="text-xl font-semibold w-8 text-center">{quantity}</span>
                      <button onClick={() => setQuantity(quantity + 1)} className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors">
                        +
                      </button>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-gray-800">Total:</span>
                      <span className="text-2xl font-bold text-purple-600">Rp {totalPrice}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Customer Information */}
              <div className="bg-white rounded-2xl p-8 shadow-xl">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Informasi Pelanggan</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Nama Lengkap *</label>
                    <input
                      type="text"
                      name="name"
                      value={customerInfo.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                      placeholder="Masukkan nama lengkap Anda"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Nomor Telepon *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={customerInfo.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                      placeholder="Masukkan nomor telepon Anda"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Email (Opsional)</label>
                    <input
                      type="email"
                      name="email"
                      value={customerInfo.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                      placeholder="Masukkan email Anda"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Alamat (Opsional)</label>
                    <textarea
                      name="address"
                      value={customerInfo.address}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 transition-colors resize-none"
                      placeholder="Masukkan alamat pengiriman Anda"
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <button
                  onClick={handleCheckout}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-3"
                >
                  <span className="text-2xl">💬</span>
                  Checkout via WhatsApp
                </button>

                <button onClick={() => navigate("/buy-now")} className="w-full bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-xl font-medium transition-colors">
                  ← Lanjutkan Belanja
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* <Footer /> -- Dikomentari untuk mengatasi error kompilasi */}
    </div>
  );
};

export default Cart;
