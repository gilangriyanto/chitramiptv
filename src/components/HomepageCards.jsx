import React from "react";
import { useNavigate } from "react-router-dom";

const HomepageCards = () => {
  const navigate = useNavigate();

  // Homepage image cards data (image only)
  const homepageImages = [
    {
      id: 1,
      src: "/images/androidRenewal.png",
      alt: "Renewal Package",
    },
    {
      id: 2,
      src: "/images/Renewal.png",
      alt: "STB Services",
    },
    {
      id: 3,
      src: "/images/STBBOX.png",
      alt: "Premium Package",
    },
  ];

  return (
    <section
      className="px-6 py-12 min-h-screen"
      style={{
        backgroundImage: `url('/images/Homepricing.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Promotional Banner */}
      <div className="flex justify-center py-8 mb-8">
        <div className="bg-gradient-to-r from-orange-400 to-pink-500 rounded-full px-8 py-3 flex items-center gap-4">
          <span className="text-2xl">🍿</span>
          <span className="text-white font-medium">
            The service you love for just 11.99
          </span>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-1 rounded text-sm transition-colors">
            Learn more
          </button>
        </div>
      </div>

      {/* Image Cards */}
      <div className="flex justify-center">
        {homepageImages.map((image) => (
          <div
            key={image.id}
            onClick={() => navigate("/buy-now")}
            className="w-[420px] h-80 rounded-2xl overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl group relative"
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              onError={(e) => {
                e.target.src = `data:image/svg+xml;base64,${btoa(`
                  <svg width="320" height="256" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="grad${image.id}" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#8b5cf6;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#ec4899;stop-opacity:1" />
                      </linearGradient>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grad${image.id})"/>
                    <text x="50%" y="50%" text-anchor="middle" fill="white" font-size="16" font-weight="bold">Card ${image.id}</text>
                  </svg>
                `)}`;
              }}
            />

            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 transform scale-0 group-hover:scale-100 transition-transform duration-300">
                <span className="text-white text-2xl">→</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HomepageCards;
