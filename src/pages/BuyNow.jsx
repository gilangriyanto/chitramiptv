import React from "react";
import Header from "../components/Header";
import BuyNowCards from "../components/BuyNowCards";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import AppSection from "../components/AppSection";

const BuyNow = () => {
  return (
    <div className="min-h-screen ">
      <Header />
      <BuyNowCards />
      <FAQ />
      <AppSection />
      <Footer />
    </div>
  );
};

export default BuyNow;
