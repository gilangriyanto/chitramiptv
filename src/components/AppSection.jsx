import React from "react";

const AppSection = () => {
  return (
    <section
      className="flex items-center justify-between px-6 py-24 md:py-12 lg:py-40 relative"
      style={{
        backgroundImage: `url('/images/featuresbg.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex-1 max-w-md">
        <h2 className="text-4xl font-bold text-white mb-6">
          Get the best companion for your Home!
        </h2>
        <p className="text-white/70 mb-8">
          Unlimited Entertainment, Whenever you want. Watch your favourite TV
          shows, movies, songs and more through apps
        </p>
        <button className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full font-medium transition-colors">
          Get Now
        </button>
      </div>
    </section>
  );
};

export default AppSection;
