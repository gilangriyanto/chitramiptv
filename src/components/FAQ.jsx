import React, { useState } from 'react';

const FAQ = () => {
  const [openQuestion, setOpenQuestion] = useState(null);

  const faqData = [
    {
      id: 1,
      question: "Why You Need a Better Box Like a Dune Box for IPTV",
      answer: "Using a high-quality box like the Dune HD box can significantly enhance your viewing experience. Here's why:",
      details: [
        "1. Superior Performance",
        "2. Advanced Video & Audio Support",
        "3. Reliable Streaming Technology",
        "4. Better Network Connectivity",
        "5. Premium Build Quality"
      ]
    },
    {
      id: 2,
      question: "What is IPTV?",
      answer: "IPTV (Internet Protocol Television) is a digital television broadcasting protocol that delivers television content over internet networks instead of traditional satellite or cable formats."
    },
    {
      id: 3,
      question: "What do I need to use IPTV?",
      answer: "To use IPTV, you need a stable internet connection (minimum 10 Mbps recommended), an IPTV box or compatible device, and an active IPTV subscription."
    },
    {
      id: 4,
      question: "Can I use IPTV on multiple devices?",
      answer: "Yes, depending on your subscription plan, you can use IPTV on multiple devices simultaneously. Our multi-room access plans support streaming on up to 4 devices at the same time."
    },
    {
      id: 5,
      question: "Will IPTV work with my internet speed?",
      answer: "IPTV requires a stable internet connection. For HD content, we recommend at least 10 Mbps, and for 4K content, at least 25 Mbps for the best viewing experience."
    },
    {
      id: 6,
      question: "Is there a free trial available?",
      answer: "Yes, we offer a free trial period for new customers. Contact us through WhatsApp to learn more about our trial options and get started with your free access."
    }
  ];

  const toggleQuestion = (questionId) => {
    setOpenQuestion(openQuestion === questionId ? null : questionId);
  };

  return (
    <section className="px-6 py-16 bg-white rounded-3xl mx-6 mb-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-4">
          Frequently asked questions
        </h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          If you're using a third-party app to watch TV programs and movies, this falls under IPTV. 
          In that case, please review the following information to bring your knowledge up to date.
        </p>

        <div className="space-y-4">
          {faqData.map((faq) => (
            <div
              key={faq.id}
              className="bg-gray-50 border border-gray-200 rounded-2xl overflow-hidden hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => toggleQuestion(faq.id)}
                className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-100 transition-colors"
              >
                <span className="text-gray-800 font-medium text-lg pr-4">
                  {faq.question}
                </span>
                <div className="flex-shrink-0">
                  {openQuestion === faq.id ? (
                    <span className="text-pink-500 text-2xl font-bold">−</span>
                  ) : (
                    <span className="text-pink-500 text-2xl font-bold">+</span>
                  )}
                </div>
              </button>
              
              {openQuestion === faq.id && (
                <div className="px-6 pb-6">
                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-gray-700 leading-relaxed mb-4">
                      {faq.answer}
                    </p>
                    
                    {faq.details && (
                      <ul className="text-gray-600 space-y-2">
                        {faq.details.map((detail, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-pink-500 mt-1">•</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">
            Still have questions? We're here to help!
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-medium transition-colors flex items-center gap-2">
              <span className="text-xl">💬</span>
              WhatsApp Support
            </button>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full font-medium transition-colors">
              Get Free Trial
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;