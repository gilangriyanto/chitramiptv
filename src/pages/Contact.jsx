import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission here
    alert("Thank you for your message! We will get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900">
      <Header />

      {/* Hero Section */}
      <section
        className="flex items-center justify-between px-6 py-24 md:py-12 lg:py-60 relative"
        style={{
          backgroundImage: `url('/images/Contact.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></section>

      {/* Contact Form Section */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-2">
            Get all the help & support
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6 mt-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-4 border-2 border-purple-200 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-colors"
                  placeholder="Name"
                />
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-4 border-2 border-purple-200 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-colors"
                  placeholder="E-mail"
                />
              </div>
            </div>

            <div>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-4 border-2 border-purple-200 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-colors"
                placeholder="Subject"
              />
            </div>

            <div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="6"
                className="w-full px-4 py-4 border-2 border-purple-200 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-colors resize-none"
                placeholder="Message"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-4 rounded-xl font-medium text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Send Message
            </button>
          </form>

          {/* Quick Contact Options */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-6">
              Need immediate help? Contact us directly:
            </p>
            <div className="flex justify-center gap-4">
              <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-medium transition-colors flex items-center gap-2">
                <span className="text-xl">💬</span>
                WhatsApp Support
              </button>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-medium transition-colors flex items-center gap-2">
                <span className="text-xl">🤖</span>
                Live Chat
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
