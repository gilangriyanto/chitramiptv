import React from 'react';

const Features = () => {
  const features = [
    {
      id: 1,
      icon: "⚔️",
      title: "No interruption, Just Entertainment",
      description: "Enjoy an Ad free viewing experience no distractions, just pure entertainment with our device"
    },
    {
      id: 2,
      icon: "⏰", 
      title: "Never Miss a Moment",
      description: "Record and rewatch your favorite shows with 14-day of recordings."
    },
    {
      id: 3,
      icon: "🎬",
      title: "Stunning Quality, Smart Savings", 
      description: "Experience HDR, Full HD (1920), and 4K resolution—at a lower cost."
    },
    {
      id: 4,
      icon: "🖥️",
      title: "Watch Anywhere in Your Home",
      description: "Stream on up to 4 devices simultaneously with multi-room functionality."
    }
  ];

  return (
    <section className="px-6 py-16">
      <h2 className="text-4xl font-bold text-black text-center mb-16">
        Why you'll Love this plan
      </h2>
      
      <div className="grid grid-cols-2 gap-12 max-w-4xl mx-auto">
        {features.map((feature) => (
          <div key={feature.id} className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <span className="text-4xl">{feature.icon}</span>
            </div>
            <h3 className="text-xl font-bold text-black mb-4">
              {feature.title}
            </h3>
            <p className="text-black/70">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;