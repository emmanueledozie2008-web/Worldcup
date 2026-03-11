import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Home/Navbar";

// Optional: reuse flag helper if showing order summary
const getFlagEmoji = (code: string): string => {
  if (code.length === 2 && /^[a-zA-Z]+$/.test(code)) {
    const upper = code.toUpperCase();
    return (
      String.fromCodePoint(127462 + upper.charCodeAt(0) - 65) +
      String.fromCodePoint(127462 + upper.charCodeAt(1) - 65)
    );
  }
  return code;
};


interface CartItem {
  id: number;
  team1: string;
  team2: string;
  flag1: string;
  flag2: string;
  category: string;
  price: number;
  quantity: number;
}

const Payment: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState<{
    cart?: CartItem[];
    total?: number;
  }>({});

  // Load order details from navigation state (if available)
  useEffect(() => {
    if (location.state) {
      setOrderDetails(location.state);
    } else {
      // Optionally try to load from localStorage as fallback
      const saved = localStorage.getItem("pendingOrder");
      if (saved) {
        try {
          setOrderDetails(JSON.parse(saved));
        } catch (e) {
          console.error("Failed to load order details");
        }
      }
    }
  }, [location.state]);

 
  

  const handleStartChat = () => {
    if (window.smartsupp) {
        window.smartsupp('chat:open');
      }
    // In a real app, this would open your live chat widget (e.g., Tawk.to, Intercom, etc.)
    // For now, we'll just simulate or show an alert.
    alert(
      "Live chat would open here. Please contact support to complete payment."
    );
    // You could also redirect to a chat URL or open a modal.
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-[#0a1a2f] to-gray-900 text-white font-sans overflow-x-hidden">
      <Navbar />

      {/* Animated background blobs (same as TicketPage) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-red-200 uppercase bg-red-500/20 rounded-full mb-4">
            Final Step
          </span>
          <h1 className="text-4xl md:text-5xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-blue-400">
            Almost Done!
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Your tickets are reserved. To complete your purchase, please contact
            our live chat support.
          </p>
        </div>

        {/* Main widget card */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-8 md:p-10 shadow-2xl">
          <div className="flex flex-col items-center text-center">
            {/* Chat icon / illustration */}
            <div className="w-24 h-24 mb-6 rounded-full bg-gradient-to-br from-red-500 to-blue-500 flex items-center justify-center shadow-lg shadow-red-500/30">
              <svg
                className="w-12 h-12 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
              </svg>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Contact Live Chat
            </h2>
            <p className="text-gray-300 mb-6 max-w-lg">
              Our support team is ready to help you securely complete your
              payment. It’s quick, safe, and ensures your tickets are confirmed
              instantly.
            </p>

            {/* Order summary preview (optional) */}
            {orderDetails.cart && orderDetails.cart.length > 0 && (
              <div className="w-full bg-white/5 rounded-xl p-4 mb-6 text-left">
                <h3 className="text-sm font-semibold text-gray-300 mb-2 flex items-center gap-1">
                  <span>🎫</span> Order Summary
                </h3>
                <div className="space-y-2 max-h-32 overflow-y-auto pr-1 text-sm">
                  {orderDetails.cart.slice(0, 3).map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <span>
                        {getFlagEmoji(item.flag1)} {item.team1} vs{" "}
                        {getFlagEmoji(item.flag2)} {item.team2} ({item.category}
                        )
                      </span>
                      <span className="text-red-400">
                        ${item.price * item.quantity}
                      </span>
                    </div>
                  ))}
                  {orderDetails.cart.length > 3 && (
                    <p className="text-xs text-gray-500">
                      +{orderDetails.cart.length - 3} more items
                    </p>
                  )}
                </div>
                <div className="border-t border-white/10 mt-2 pt-2 flex justify-between font-bold">
                  <span>Total</span>
                  <span className="text-red-400">${orderDetails.total}</span>
                </div>
              </div>
            )}

            {/* Action button */}
            <button
              onClick={handleStartChat}
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-red-500/30 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 0 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
              </svg>
              Start Live Chat
            </button>

            <p className="text-xs text-gray-500 mt-4">
              Our chat is available 24/7. You’ll be connected to a payment
              specialist.
            </p>
          </div>
        </div>

        {/* Additional info card */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
            <div className="text-2xl mb-2">🔒</div>
            <h4 className="font-semibold mb-1">Secure Payment</h4>
            <p className="text-xs text-gray-400">
              All transactions are protected
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
            <div className="text-2xl mb-2">⚡</div>
            <h4 className="font-semibold mb-1">Instant Confirmation</h4>
            <p className="text-xs text-gray-400">
              Tickets confirmed during chat
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
            <div className="text-2xl mb-2">💬</div>
            <h4 className="font-semibold mb-1">Live Support</h4>
            <p className="text-xs text-gray-400">Real‑time assistance</p>
          </div>
        </div>

        {/* Back button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-400 hover:text-white transition underline underline-offset-2"
          >
            ← Go back
          </button>
        </div>
      </div>

      {/* Same animation styles as TicketPage */}
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

export default Payment;
