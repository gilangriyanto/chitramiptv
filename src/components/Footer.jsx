import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      {/* Footer */}
      <footer className="bg-black py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-3 gap-16">
            {/* Company Column */}
            <div>
              <h4 className="text-white font-medium mb-6">Company</h4>
              <ul className="space-y-3 text-white/60">
                <li>
                  <Link to="/" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="hover:text-white transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/buy-now"
                    className="hover:text-white transition-colors"
                  >
                    Buy Now
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="hover:text-white transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Connect Column */}
            <div>
              <h4 className="text-white font-medium mb-6">Connect</h4>
              <div className="space-y-4">
                <ul className="text-white/60">
                  <li>
                    <Link
                      to="/contact"
                      className="hover:text-white transition-colors"
                    >
                      Contact Us
                    </Link>
                  </li>
                </ul>

                {/* Social Media Icons */}
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => window.open("https://youtube.com", "_blank")}
                    className="w-8 h-8 bg-red-600 rounded flex items-center justify-center hover:bg-red-700 transition-colors"
                    aria-label="Visit our YouTube channel"
                  >
                    <span className="text-white text-sm">📺</span>
                  </button>
                  <button
                    onClick={() =>
                      window.open("https://instagram.com", "_blank")
                    }
                    className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center hover:bg-purple-700 transition-colors"
                    aria-label="Visit our Instagram page"
                  >
                    <span className="text-white text-sm">📷</span>
                  </button>
                  <button
                    onClick={() =>
                      window.open("https://facebook.com", "_blank")
                    }
                    className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center hover:bg-blue-700 transition-colors"
                    aria-label="Visit our Facebook page"
                  >
                    <span className="text-white text-sm">📘</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Legal Column */}
            <div>
              <h4 className="text-white font-medium mb-6">Legal</h4>
              <ul className="space-y-3 text-white/60">
                <li>
                  <button
                    onClick={() => console.log("Terms clicked")}
                    className="hover:text-white transition-colors text-left"
                  >
                    Terms and Conditions
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => console.log("Privacy clicked")}
                    className="hover:text-white transition-colors text-left"
                  >
                    Privacy
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => console.log("Cookie Preferences clicked")}
                    className="hover:text-white transition-colors text-left"
                  >
                    Cookie Preferences
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp floating buttons */}
      <div className="fixed right-6 bottom-6 space-y-4 z-50">
        {/* Sales WhatsApp */}
        <div
          onClick={() =>
            window.open(
              "https://wa.me/919876543210?text=Hello! I need help with sales inquiries.",
              "_blank"
            )
          }
          className="cursor-pointer transition-all duration-300 transform hover:scale-110"
        >
          <img
            src="/images/whatsapp.png"
            alt="Sales WhatsApp"
            className="w-21 h-16 shadow-lg hover:shadow-xl transition-shadow duration-300"
          />
        </div>
      </div>
    </>
  );
};

export default Footer;
