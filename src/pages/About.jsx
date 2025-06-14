import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const About = () => {
  const [activeSection, setActiveSection] = useState("who-we-are");

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900">
      <Header />

      {/* Hero Section */}
      <section className="px-6 py-16 bg-gradient-to-br from-purple-600 to-purple-800 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-5xl font-bold text-white mb-8">About Us</h1>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mb-12">
            <button
              onClick={() => scrollToSection("who-we-are")}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeSection === "who-we-are"
                  ? "bg-pink-500 text-white"
                  : "bg-pink-500/80 text-white hover:bg-pink-500"
              }`}
            >
              Who We Are?
            </button>
            <button
              onClick={() => scrollToSection("what-we-do")}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeSection === "what-we-do"
                  ? "bg-pink-500 text-white"
                  : "bg-pink-500/80 text-white hover:bg-pink-500"
              }`}
            >
              What We Do?
            </button>
            <button
              onClick={() => scrollToSection("why-it-matters")}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeSection === "why-it-matters"
                  ? "bg-pink-500 text-white"
                  : "bg-pink-500/80 text-white hover:bg-pink-500"
              }`}
            >
              Why It Matters?
            </button>
          </div>
        </div>

        {/* Person Image */}
        <div className="absolute bottom-0 right-1/2 transform translate-x-1/2">
          <div className="w-64 h-64 rounded-full overflow-hidden">
            <img
              src="/images/about-person.jpg"
              alt="Team Member"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = `data:image/svg+xml;base64,${btoa(`
                  <svg width="256" height="256" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#8b5cf6;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#ec4899;stop-opacity:1" />
                      </linearGradient>
                    </defs>
                    <circle cx="128" cy="128" r="128" fill="url(#grad)"/>
                    <circle cx="128" cy="100" r="40" fill="#fff" opacity="0.8"/>
                    <ellipse cx="128" cy="180" rx="60" ry="40" fill="#fff" opacity="0.8"/>
                  </svg>
                `)}`;
              }}
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="bg-white">
        {/* Who We Are Section */}
        <section id="who-we-are" className="px-6 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl font-bold text-pink-500 mb-8">
              Who We Are?
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              We are a trusted distribution company with over{" "}
              <span className="text-pink-500 font-semibold">
                15 years of experience
              </span>{" "}
              in the European consumer electronics market. Specializing in
              high-performance media devices, we've built a strong reputation by
              consistently delivering innovation, reliability, and value to our
              partners and end-users alike.
            </p>
          </div>
        </section>

        {/* What We Do Section */}
        <section id="what-we-do" className="px-6 py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl font-bold text-pink-500 mb-8">
              What We Do?
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              For more than a decade, we've been at the forefront of delivering
              cutting-edge media players{" "}
              <span className="text-pink-500 font-semibold">
                powered by Android, Linux, and hybrid platforms
              </span>
              . Whether for home entertainment, business, or tech enthusiasts,
              our devices are trusted for performance, durability, and
              innovation.
            </p>
          </div>
        </section>

        {/* Why It Matters Section */}
        <section id="why-it-matters" className="px-6 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl font-bold text-pink-500 mb-8">
              Why It Matters?
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Because trust isn't built overnight, it's earned. With over 1
              million units sold, we are one of the few hardware distributors
              who have maintained a warranty-backed, customer-first approach
              from day one.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              <span className="text-pink-500 font-semibold">
                What sets us apart? We deliver the products before we ask for
                payment.
              </span>{" "}
              That's how confident we are in what we offer and how committed we
              are to earning your trust every step of the way.
            </p>
          </div>
        </section>

        {/* Our Values */}
        <section className="px-6 py-20 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-800 text-center mb-16">
              Our Core Values
            </h2>

            <div className="grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white text-2xl">🚀</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Innovation
                </h3>
                <p className="text-gray-600">
                  Constantly pushing boundaries with cutting-edge technology and
                  forward-thinking solutions.
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white text-2xl">🤝</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Trust</h3>
                <p className="text-gray-600">
                  Building lasting relationships through transparency,
                  reliability, and customer-first approach.
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white text-2xl">⭐</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Excellence
                </h3>
                <p className="text-gray-600">
                  Delivering premium quality products and services that exceed
                  expectations every time.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
