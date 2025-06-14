import React from "react";
import { useNavigate } from "react-router-dom";

const BuyNowCards = () => {
  const navigate = useNavigate();

  // Buy Now page - Product images (8 cards)
  const buyNowProducts = [
    {
      id: 1,
      name: "STB BOX + 12 Months Services",
      price: "129₹",
      image: "/images/Renewal.png",
      description:
        "Complete streaming solution with 12 months service included",
      features: [
        "Resolution Support",
        "Application Support",
        "Multi Screen Access",
        "Smart Player Box",
      ],
      category: "STB Package",
    },
    {
      id: 2,
      name: "12+2 Free Months Renewal",
      price: "109₹",
      image: "/images/Renewal.png",
      description: "Extended renewal package with bonus months",
      features: [
        "Resolution Support",
        "Application Support",
        "Multi Screen Access",
        "Smart Player Box",
      ],
      category: "Renewal Package",
    },
    {
      id: 3,
      name: "2G Free Months Renewal",
      price: "109₹",
      image: "/images/Renewal.png",
      description: "Standard renewal package with bonus data",
      features: [
        "Resolution Support",
        "Application Support",
        "Multi Screen Access",
        "Smart Player Box",
      ],
      category: "Renewal Package",
    },
    {
      id: 4,
      name: "2G Free Months Renewal",
      price: "74₹",
      image: "/images/Renewal.png",
      description: "Basic renewal package for budget-conscious users",
      features: [
        "Resolution Support",
        "Application Support",
        "Multi Screen Access",
        "Smart Player Box",
      ],
      category: "Basic Package",
    },
    {
      id: 5,
      name: "6 Months Renewal",
      price: "74₹",
      image: "/images/Renewal.png",
      description: "Mid-term renewal for consistent service",
      features: [
        "Resolution Support",
        "Application Support",
        "Multi Screen Access",
        "Smart Player Box",
      ],
      category: "Renewal Package",
    },
    {
      id: 6,
      name: "Box Only",
      price: "69₹",
      image: "/images/Renewal.png",
      description: "Hardware only package without service subscription",
      features: [
        "Resolution Support",
        "Application Support",
        "Application Access",
        "Smart Player Box",
      ],
      category: "Hardware Only",
    },
    {
      id: 7,
      name: "Dune Remote",
      price: "9.99₹",
      image: "/images/Renewal.png",
      description: "Premium remote control for enhanced user experience",
      features: ["Warranty", "1 Year", "All India Delivery"],
      category: "Accessories",
    },
    {
      id: 8,
      name: "Mojo Remote",
      price: "9.99₹",
      image: "/images/Renewal.png",
      description: "Compact remote control with essential functions",
      features: ["Warranty", "1 Year", "All India Delivery"],
      category: "Accessories",
    },
  ];

  const handleProductClick = (product) => {
    // Navigate to cart with product data
    navigate("/cart", { state: { product } });
  };

  return (
    <section className="px-6 py-8 bg-white rounded-3xl mx-6 mb-8">
      {/* 3 Simple Steps Section */}
      <div className="text-center mb-16">
        <h1 className="text-2xl font-medium text-gray-800 mb-2">
          Try before you buy in
        </h1>
        <div className="flex items-center justify-center gap-2 mb-12">
          <span className="text-3xl">🍿</span>
          <span className="text-3xl font-bold text-pink-500">
            3 Simple Steps
          </span>
        </div>

        {/* Steps */}
        <div className="flex justify-center items-center gap-16 mb-16">
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mb-4 mx-auto">
              01
            </div>
            <h3 className="text-gray-700 font-medium">WhatsApp Us</h3>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mb-4 mx-auto">
              02
            </div>
            <h3 className="text-gray-700 font-medium">Get info</h3>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mb-4 mx-auto">
              03
            </div>
            <h3 className="text-gray-700 font-medium">Enjoy the Show</h3>
          </div>
        </div>
      </div>

      {/* Products Grid - 4x2 Image Cards */}
      <div className="max-w-7xl mx-auto">
        {/* First Row - 4 cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {buyNowProducts.slice(0, 4).map((product) => (
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

              {/* Overlay with product info */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="font-bold text-lg mb-1 truncate">
                    {product.name}
                  </h3>
                  <p className="text-2xl font-bold text-pink-300">
                    {product.price}
                  </p>
                </div>
              </div>

              {/* Click indicator */}
              <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                <span className="text-white text-lg">🛒</span>
              </div>
            </div>
          ))}
        </div>

        {/* Second Row - 4 cards */}
        <div className="grid grid-cols-4 gap-6">
          {buyNowProducts.slice(4, 8).map((product) => (
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

              {/* Overlay with product info */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="font-bold text-lg mb-1 truncate">
                    {product.name}
                  </h3>
                  <p className="text-2xl font-bold text-pink-300">
                    {product.price}
                  </p>
                </div>
              </div>

              {/* Click indicator */}
              <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                <span className="text-white text-lg">🛒</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BuyNowCards;
