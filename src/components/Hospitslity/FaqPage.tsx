import React, { useEffect, useRef, useState } from "react";

interface FaqItem {
  question: string;
  answer: string;
}

const FaqPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Intersection Observer to trigger entrance animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const faqData: FaqItem[] = [
    {
      question: "How is hospitality different from a general ticket?",
      answer:
        "A general ticket grants you access to the match only. Hospitality packages include premium match seats plus exclusive lounge access, gourmet dining, complimentary beverages, private entrances, and other VIP amenities. It's a complete event experience designed for comfort and luxury.",
    },
    {
      question: "What's included in a hospitality package?",
      answer:
        "Packages vary by venue and category, but typically include: a guaranteed match ticket, access to a private lounge before the game and at halftime, fine food and unlimited drinks (beer, wine, soft drinks), dedicated concierge service, and sometimes meet‑and‑greet opportunities with legends.",
    },
    {
      question: "Can I buy just a match ticket without hospitality?",
      answer:
        "Yes, general admission tickets are sold separately through FIFA's official ticketing platform. Hospitality packages are an upgraded option for those seeking a premium experience.",
    },
    {
      question: "Are hospitality packages available for all matches?",
      answer:
        "Hospitality is offered for every match of the tournament, but availability is limited – especially for high‑demand fixtures like the Final and host nation games. Early booking is strongly recommended.",
    },
    {
      question: "How do I book a hospitality package?",
      answer:
        "You can book directly through our website by selecting your desired match and package. After purchase, you'll receive a confirmation email with details and a dedicated customer support contact.",
    },
    {
      question: "What is the cancellation/refund policy?",
      answer:
        "Cancellations are accepted up to 60 days before the match for a full refund (minus a small processing fee). Within 60 days, packages are non‑refundable but can be transferred to another person with prior notice.",
    },
    {
      question: "Are there age restrictions for lounge access?",
      answer:
        "All ages are welcome, but please note that alcoholic beverages are only served to guests over 21 (or the legal drinking age of the host country). Family‑friendly lounges may have specific activities for children.",
    },
    {
      question: "Can I upgrade my existing ticket to hospitality?",
      answer:
        "Upgrades are possible only if hospitality inventory remains available. Contact our customer service team with your ticket details to check options.",
    },
    {
      question: "Do hospitality guests get separate entry?",
      answer:
        "Yes, all hospitality packages include access to dedicated, fast‑track entrances so you can bypass the general queues and head straight to the lounge or your seat.",
    },
    {
      question: "What about accessibility for guests with disabilities?",
      answer:
        "We are committed to making the experience accessible for everyone. All hospitality venues are wheelchair accessible, and we provide dedicated assistance. Please mention any requirements during booking so we can make appropriate arrangements.",
    },
  ];

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#0b0f3b] via-[#1b1f6b] to-[#0b0f3b] text-white font-['Oswald',sans-serif]">
      {/* Decorative background image (optional) */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/faq-bg.jpg"
          alt=""
          className="w-full h-full object-cover opacity-10"
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f3b] via-transparent to-[#0b0f3b]" />
      </div>

      {/* Animated floating images */}
      <img
        src="/images/faq-float1.jpg"
        alt=""
        className="absolute top-20 left-5 w-48 rounded-2xl shadow-2xl opacity-30 hidden lg:block animate-float-slow"
        onError={(e) => (e.currentTarget.style.display = "none")}
      />
      <img
        src="/images/faq-float2.jpg"
        alt=""
        className="absolute bottom-20 right-5 w-56 rounded-2xl shadow-2xl opacity-30 hidden lg:block animate-float"
        onError={(e) => (e.currentTarget.style.display = "none")}
      />
      <img
        src="/images/faq-float3.jpg"
        alt=""
        className="absolute top-1/3 left-10 w-40 rounded-2xl shadow-2xl opacity-20 hidden xl:block animate-float-slower"
        onError={(e) => (e.currentTarget.style.display = "none")}
      />

      {/* Main content */}
      <div ref={sectionRef} className="relative z-10 mx-auto max-w-4xl px-6 py-24 md:py-32">
        {/* Heading with fade-in */}
        <div
          className={`text-center mb-16 transition-all duration-1000 transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="uppercase tracking-[0.35em] text-sm text-gray-300 mb-4">
            GOT QUESTIONS?
          </p>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            FREQUENTLY ASKED QUESTIONS
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Everything you need to know about hospitality packages, tickets, and your
            unrivaled FIFA World Cup 2026™ experience.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div
              key={index}
              className={`bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden transition-all duration-700 transform ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
              >
                <span className="text-xl font-semibold">{item.question}</span>
                <span
                  className={`text-2xl transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                >
                  ↓
                </span>
              </button>
              <div
                className={`transition-all duration-500 ease-in-out ${
                  openIndex === index ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="p-6 pt-0 text-gray-300 border-t border-white/10">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Still have questions? */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-200 mb-4">Still have questions?</p>
          <button className="bg-red-500 hover:bg-red-600 px-8 py-4 rounded-full text-lg font-semibold transition transform hover:scale-105 hover:shadow-lg active:scale-95">
            Contact Our Support Team
          </button>
        </div>
      </div>

      {/* Custom animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes float-slower {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        .animate-float-slower {
          animation: float-slower 10s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default FaqPage;