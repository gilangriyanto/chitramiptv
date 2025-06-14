import React from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import HomepageCards from "../components/HomepageCards";
import Features from "../components/Features";
import AppSection from "../components/AppSection";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen ">
      <Header />
      <HeroSection />
      <HomepageCards />
      <Features />
      <AppSection />
      <Footer />
    </div>
  );
};

export default Home;
