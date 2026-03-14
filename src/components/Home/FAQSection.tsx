import React, { useState } from "react";


interface FaqItem {
  question: string;
  answer: string;
}

const FaqPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FaqItem[] = [
    {
      question: "How do I purchase tickets?",
      answer: "You can browse available matches on the Tickets page, select your desired category and quantity, and add them to your cart. Once you're ready, proceed to checkout and complete your purchase using credit/debit card, PayPal, or USDT (TRC20)."
    },
    {
      question: "What payment methods are accepted?",
      answer: "We accept all major credit and debit cards (Visa, MasterCard, American Express), PayPal, and USDT (TRC20) cryptocurrency. All payments are securely processed."
    },
    {
      question: "Can I get a refund?",
      answer: "Tickets are non-refundable, but you can transfer them to another person by contacting our support team at least 7 days before the match. A transfer fee may apply."
    },
    {
      question: "How will I receive my tickets?",
      answer: "After successful purchase, you will receive an email with your e-tickets as QR codes. You can also view them in your account dashboard. Simply present the QR code at the stadium entrance."
    },
    {
      question: "Is there a limit on how many tickets I can buy?",
      answer: "Yes, there is a limit of 8 tickets per match per customer to ensure fair access for all fans. If you need more, please contact our group sales department."
    },
    {
      question: "What if a match is rescheduled or cancelled?",
      answer: "If a match is rescheduled, your tickets will remain valid for the new date. If cancelled, you will receive a full refund to your original payment method within 14 business days."
    },
    {
      question: "Do you offer discounts for groups or students?",
      answer: "We offer special group rates for parties of 20 or more. Student discounts are available for selected matches – please verify your student status during checkout. Contact our support for group bookings."
    },
    {
      question: "How can I contact support?",
      answer: "You can reach our customer support team 24/7 via live chat on our website, email at support@worldcuptickets.com, or phone at +1 (800) 123-4567."
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-[#0a1a2f] to-gray-900 text-white font-sans overflow-x-hidden">
     

      {/* Animated background blobs (same as other pages) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-24">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-red-200 uppercase bg-red-500/20 rounded-full mb-4">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              FAQ
            </span>
          </span>
          <h1 className="text-4xl md:text-5xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-blue-400">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Everything you need to know about tickets, payments, and matchday.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden transition-all hover:border-white/20"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between focus:outline-none"
              >
                <span className="text-lg font-semibold">{faq.question}</span>
                <span className="ml-4 flex-shrink-0">
                  <svg
                    className={`w-5 h-5 transform transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>
              <div
                className={`transition-all duration-300 ease-in-out ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                } overflow-hidden`}
              >
                <div className="px-6 pb-4 text-gray-300 border-t border-white/10 pt-4">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Still have questions? */}
        <div className="mt-12 text-center bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
          <h2 className="text-2xl font-bold mb-2">Still have questions?</h2>
          <p className="text-gray-300 mb-6">
            Can't find the answer you're looking for? Please chat with our team.
          </p>
          <a
            href="/payment"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 px-6 py-3 rounded-full font-semibold transition transform hover:scale-105"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Contact Support
          </a>
        </div>
      </div>

      {/* Animation styles (same as other pages) */}
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default FaqPage;