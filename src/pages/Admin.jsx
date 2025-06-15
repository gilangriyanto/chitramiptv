import React, { useState, useEffect } from "react";

// URL backend PHP Anda. Pastikan ini sesuai dengan lokasi file index.php Anda.
// Perhatian: Pastikan menggunakan HTTP, bukan HTTPS, untuk server lokal standar.
const API_BASE_URL = "http://localhost:8080/belajarphp/backend-projek1jt/index.php"; // Ganti jika path Anda berbeda

// Kredensial Otentikasi Sederhana untuk otorisasi setelah login (harus cocok dengan di PHP)
const ADMIN_AUTH_TOKEN = "SUPER_SECRET_ADMIN_TOKEN_123";

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cards, setCards] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentCard, setCurrentCard] = useState(null); // Untuk edit
  const [message, setMessage] = useState(""); // Untuk pesan notifikasi
  const [isError, setIsError] = useState(false); // Untuk status pesan error

  // State baru untuk unggah gambar
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Log URL API untuk debugging
  console.log("API Base URL:", API_BASE_URL);

  useEffect(() => {
    // Periksa status login dari localStorage jika ada (untuk menjaga sesi sederhana)
    const token = localStorage.getItem("adminAuthToken");
    if (token === ADMIN_AUTH_TOKEN) {
      // Verifikasi token yang tersimpan
      setIsLoggedIn(true);
      fetchCards();
    }
  }, [isLoggedIn]); // Jalankan ketika isLoggedIn berubah

  // Fungsi untuk menampilkan pesan notifikasi
  const showNotification = (msg, isErr = false) => {
    setMessage(msg);
    setIsError(isErr);
    setTimeout(() => {
      setMessage("");
      setIsError(false);
    }, 3000); // Pesan hilang setelah 3 detik
  };

  // --- Fungsi Otentikasi ---
  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const username = form.username.value;
    const password = form.password.value;

    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.token && data.token === ADMIN_AUTH_TOKEN) {
          localStorage.setItem("adminAuthToken", data.token);
          setIsLoggedIn(true);
          showNotification(data.message);
        } else {
          showNotification("Login berhasil tetapi token tidak valid. Hubungi administrator.", true);
        }
      } else {
        showNotification(data.message || "Login gagal. Silakan coba lagi.", true);
      }
    } catch (error) {
      console.error("Error during login:", error);
      showNotification("Terjadi kesalahan jaringan. Pastikan backend PHP Anda berjalan dan URL API sudah benar. Detail: " + error.message, true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminAuthToken");
    setIsLoggedIn(false);
    setCards([]); // Hapus data kartu saat logout
    showNotification("Anda telah logout.");
  };

  // --- Fungsi Unggah File dan Pratinjau ---
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validasi tipe file (menambahkan 'image/jpeg' untuk mendukung JPG)
      const allowedTypes = ["image/jpeg", "image/png", "image/gif"]; // Ditambahkan: 'image/jpeg'
      if (!allowedTypes.includes(file.type)) {
        showNotification("Tipe file tidak valid. Hanya JPG, PNG, GIF yang diizinkan.", true);
        setSelectedFile(null);
        setImagePreview(null);
        return;
      }
      // Validasi ukuran file (contoh: maks 2MB)
      if (file.size > 2 * 1024 * 1024) {
        // 2MB
        showNotification("Ukuran file terlalu besar. Maksimal 2MB.", true);
        setSelectedFile(null);
        setImagePreview(null);
        return;
      }

      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setSelectedFile(null);
      setImagePreview(null);
    }
  };

  // --- Fungsi Pengelolaan Card ---

  const fetchCards = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/cards`);
      const data = await response.json();
      if (response.ok) {
        setCards(data);
      } else {
        showNotification(data.message || "Gagal mengambil data kartu.", true);
      }
    } catch (error) {
      console.error("Error fetching cards:", error);
      showNotification("Terjadi kesalahan jaringan saat mengambil kartu. Detail: " + error.message, true);
    }
  };

  const handleSubmitCard = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    const price = parseFloat(form.price.value);
    const category = form.category.value;
    const features = form.features.value
      .split(",")
      .map((f) => f.trim())
      .filter((f) => f !== "");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("features", JSON.stringify(features)); // Stringify array features

    if (selectedFile) {
      formData.append("image", selectedFile); // Tambahkan file gambar
    } else if (currentCard && currentCard.image) {
      // Jika tidak ada file baru diunggah saat edit, kirimkan URL gambar yang sudah ada
      formData.append("existing_image_url", currentCard.image);
    }

    try {
      const method = currentCard ? "POST" : "POST"; // Gunakan POST untuk FormData, tangani logika PUT di PHP
      const url = currentCard ? `${API_BASE_URL}/cards/${currentCard.id}` : `${API_BASE_URL}/cards`;

      const response = await fetch(url, {
        method: method,
        // Hapus header 'Content-Type' untuk FormData; fetch akan mengaturnya secara otomatis
        headers: {
          "X-Auth-Token": ADMIN_AUTH_TOKEN,
          // Tambahkan header khusus untuk menandai ini adalah permintaan PUT secara logis
          ...(currentCard && { "X-HTTP-Method-Override": "PUT" }),
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        showNotification(data.message || `Card berhasil ${currentCard ? "diperbarui" : "ditambahkan"}.`);
        fetchCards(); // Refresh daftar kartu
        setShowModal(false);
        setCurrentCard(null);
        setSelectedFile(null); // Reset file yang dipilih
        setImagePreview(null); // Reset pratinjau gambar
      } else {
        showNotification(data.message || `Gagal ${currentCard ? "memperbarui" : "menambah"} card.`, true);
      }
    } catch (error) {
      console.error("Error submitting card:", error);
      showNotification("Terjadi kesalahan jaringan saat menyimpan kartu. Detail: " + error.message, true);
    }
  };

  const handleDeleteCard = async (id) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus kartu ini?")) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/cards/${id}`, {
        method: "DELETE",
        headers: {
          "X-Auth-Token": ADMIN_AUTH_TOKEN, // Sertakan token otentikasi
        },
      });

      const data = await response.json();

      if (response.ok) {
        showNotification(data.message || "Card berhasil dihapus.");
        fetchCards(); // Refresh daftar kartu
      } else {
        showNotification(data.message || "Gagal menghapus card.", true);
      }
    } catch (error) {
      console.error("Error deleting card:", error);
      showNotification("Terjadi kesalahan jaringan saat menghapus kartu. Detail: " + error.message, true);
    }
  };

  const openEditModal = (card) => {
    setCurrentCard({
      ...card,
      features: Array.isArray(card.features) ? card.features.join(", ") : "",
    });
    // Set pratinjau gambar ke gambar yang ada
    setImagePreview(card.image);
    setSelectedFile(null); // Pastikan tidak ada file baru yang dipilih secara default saat edit
    setShowModal(true);
  };

  const openAddModal = () => {
    setCurrentCard(null); // Reset untuk mode tambah
    setSelectedFile(null); // Reset file yang dipilih
    setImagePreview(null); // Reset pratinjau gambar
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentCard(null);
    setSelectedFile(null); // Reset file yang dipilih
    setImagePreview(null); // Reset pratinjau gambar
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-800 p-4">
        <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login Admin</h2>
          {message && <div className={`p-3 mb-4 rounded-md text-sm text-center ${isError ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>{message}</div>}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Username:
              </label>
              <input type="text" id="username" name="username" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password:
              </label>
              <input type="password" id="password" name="password" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 font-inter">
      <header className="bg-white shadow-md rounded-lg p-6 mb-6 flex justify-between items-center">
        <h1 className="text-4xl font-extrabold text-gray-800">Manajemen Kartu Penjualan</h1>
        <button onClick={handleLogout} className="px-5 py-2 rounded-md bg-red-600 text-white font-semibold shadow-md hover:bg-red-700 transition duration-200 ease-in-out transform hover:scale-105">
          Logout
        </button>
      </header>

      {message && <div className={`p-4 mb-6 rounded-md text-center text-lg font-medium ${isError ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"} shadow-md`}>{message}</div>}

      <div className="flex justify-end mb-6">
        <button onClick={openAddModal} className="px-6 py-3 rounded-md bg-green-600 text-white font-semibold text-lg shadow-md hover:bg-green-700 transition duration-200 ease-in-out transform hover:scale-105 flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path>
          </svg>
          Tambah Card Baru
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.length === 0 ? (
          <p className="col-span-full text-center text-gray-500 text-xl py-10">Tidak ada kartu penjualan yang tersedia.</p>
        ) : (
          cards.map((card) => (
            <div key={card.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-102 duration-300">
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-48 object-cover object-center"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://placehold.co/400x300/FCA5A5/881D1D?text=Image+Error`;
                }} // Placeholder on error
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{card.title}</h3>
                <p className="text-gray-600 mb-4 text-sm line-clamp-3">{card.description}</p>
                {/* Menampilkan fitur jika ada */}
                {card.features && card.features.length > 0 && (
                  <div className="mb-2">
                    <p className="font-semibold text-gray-700 text-sm">Fitur:</p>
                    <ul className="list-disc list-inside text-gray-600 text-sm">
                      {card.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {/* Menampilkan kategori jika ada */}
                {card.category && (
                  <p className="text-gray-500 text-xs mb-2">
                    Kategori: <span className="font-medium">{card.category}</span>
                  </p>
                )}
                <p className="text-2xl font-extrabold text-indigo-700 mb-4">Rp {parseFloat(card.price).toLocaleString("id-ID", { minimumFractionDigits: 2 })}</p>
                <div className="flex justify-end space-x-3">
                  <button onClick={() => openEditModal(card)} className="px-4 py-2 rounded-md bg-blue-600 text-white font-medium text-sm shadow-sm hover:bg-blue-700 transition duration-150 ease-in-out">
                    Edit
                  </button>
                  <button onClick={() => handleDeleteCard(card.id)} className="px-4 py-2 rounded-md bg-red-600 text-white font-medium text-sm shadow-sm hover:bg-red-700 transition duration-150 ease-in-out">
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal Tambah/Edit Card */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">{currentCard ? "Edit Card" : "Tambah Card Baru"}</h2>
            <form onSubmit={handleSubmitCard} className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Judul:
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  defaultValue={currentCard ? currentCard.title : ""}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Deskripsi:
                </label>
                <textarea
                  id="description"
                  name="description"
                  defaultValue={currentCard ? currentCard.description : ""}
                  rows="3"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                ></textarea>
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Kategori:
                </label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  defaultValue={currentCard ? currentCard.category : ""}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="features" className="block text-sm font-medium text-gray-700 mb-1">
                  Fitur (pisahkan dengan koma):
                </label>
                <textarea
                  id="features"
                  name="features"
                  defaultValue={currentCard ? currentCard.features : ""}
                  rows="2"
                  placeholder="Contoh: Fitur A, Fitur B, Fitur C"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                ></textarea>
              </div>
              {/* Bagian Input Unggah Gambar */}
              <div>
                <label htmlFor="imageUpload" className="block text-sm font-medium text-gray-700 mb-1">
                  Unggah Gambar (PNG, JPEG, GIF):
                </label>
                <input
                  type="file"
                  id="imageUpload"
                  name="imageUpload"
                  accept="image/png, image/jpeg, image/gif"
                  onChange={handleFileChange}
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                />
                {imagePreview && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Pratinjau Gambar:</p>
                    <img src={imagePreview} alt="Pratinjau" className="max-w-xs max-h-48 rounded-md shadow-md object-cover m-auto" />
                  </div>
                )}
              </div>
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                  Harga:
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  step="0.01"
                  defaultValue={currentCard ? parseFloat(currentCard.price) : ""}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button type="button" onClick={closeModal} className="px-5 py-2 rounded-md bg-gray-300 text-gray-800 font-semibold shadow-sm hover:bg-gray-400 transition duration-150 ease-in-out">
                  Batal
                </button>
                <button type="submit" className="px-5 py-2 rounded-md bg-indigo-600 text-white font-semibold shadow-md hover:bg-indigo-700 transition duration-150 ease-in-out">
                  {currentCard ? "Simpan Perubahan" : "Tambah Card"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
