import React from "react";

const HeroSection = () => {
  return (
    <section
      className="flex items-center justify-between px-6 py-24 md:py-10 lg:py-18 relative"
      style={{
        backgroundImage: `url('/images/Herobg.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Optional: Dark overlay untuk readability */}
      {/* <div className="absolute inset-0 bg-black/20"></div> */}

      {/* Content - tambahkan relative z-10 agar di atas background */}
      <div className="flex-1 relative z-10 max-w-2xl">
        <p className="text-5xl md:text-7xl lg:text-8xl font-bold text-black mb-8 drop-shadow-lg leading-tight">
          Best of <span className="text-pink-400">Indianwood</span>{" "}
          <span className="text-black font-normal">is here!</span>
        </p>
        <p className="text-black/90 text-xl md:text-2xl mb-10 drop-shadow-md leading-relaxed">
          Enjoy 2 free months with every yearly plan.
        </p>
        <button className="bg-pink-500 hover:bg-pink-600 text-white px-12 py-4 text-lg rounded-full font-medium transition-colors shadow-lg hover:shadow-xl hover:scale-105 transform">
          Get Now
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
