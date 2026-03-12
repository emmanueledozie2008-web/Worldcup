import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Home/Navbar";

interface CartItem {
  id: number;
  stage: string;
  team1: string;
  team2: string;
  flag1: string;
  flag2: string;
  date: string;
  venue: string;
  city: string;
  category: string;
  price: number;
  available: number;
  quantity: number;
}

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart) as CartItem[];
        setCart(parsedCart);
        const newTotal = parsedCart.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
        setTotal(newTotal);
      } catch (error) {
        console.error("Failed to parse cart from localStorage", error);
      }
    }
  }, []);

  // If cart is empty, show a message with link back to tickets
  if (cart.length === 0) {
    return (
      <div className="relative min-h-screen bg-linear-to-r from-gray-900 via-[#0a1a2f] to-gray-900 text-white font-sans">
        <Navbar />
        <div className="flex flex-col items-center justify-center h-[70vh]">
          <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
          <button
            onClick={() => navigate("/tickets")}
            className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-full font-semibold transition"
          >
            Browse Tickets
          </button>
        </div>
      </div>
    );
  }

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
    country: "USA",
    paymentMethod: "card",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would send data to your backend
    alert("Purchase complete! (demo)");
    // Clear cart and redirect to confirmation page or home
    localStorage.removeItem("cart");
    navigate("/confirmation"); // or "/"
  };

  return (
    <div className="relative min-h-screen bg-linear-to-r from-gray-900 via-[#0a1a2f] to-gray-900 text-white font-sans overflow-x-hidden">
      <Navbar />

      {/* Animated background blobs (same as TicketPage) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Checkout header */}
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-red-200 uppercase bg-red-500/20 rounded-full mb-4">
            Secure Checkout
          </span>
          <h1 className="text-4xl md:text-5xl font-black mb-4 bg-clip-text text-transparent bg-linear-to-r from-red-400 to-blue-400">
            Almost There!
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Complete your purchase by filling in your details below.
          </p>
        </div>

        {/* Two‑column layout: form (left) + order summary (right) */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left column – checkout form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="text-2xl">👤</span> Personal Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-red-500 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-red-500 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-red-500 transition"
                    />
                  </div>
                </div>
              </div>

              {/* Billing Address */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="text-2xl">🏠</span> Billing Address
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-red-500 transition"
                    />
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="col-span-2">
                      <label className="block text-sm text-gray-400 mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-red-500 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">
                        ZIP *
                      </label>
                      <input
                        type="text"
                        name="zip"
                        required
                        value={formData.zip}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-red-500 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">
                        Country *
                      </label>
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-red-500 transition"
                      >
                        <option value="USA">United States</option>
                        <option value="CAN">Canada</option>
                        <option value="MEX">Mexico</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="text-2xl">💳</span> Payment Method
                </h2>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={formData.paymentMethod === "card"}
                        onChange={handleChange}
                        className="text-red-500 focus:ring-red-500"
                      />
                      <span>Credit / Debit Card</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="paypal"
                        checked={formData.paymentMethod === "paypal"}
                        onChange={handleChange}
                        className="text-red-500 focus:ring-red-500"
                      />
                      <span>PayPal</span>
                    </label>
                  </div>

                  {formData.paymentMethod === "card" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div className="col-span-2">
                        <label className="block text-sm text-gray-400 mb-1">
                          Card Number *
                        </label>
                        <input
                          type="text"
                          name="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          required={formData.paymentMethod === "card"}
                          value={formData.cardNumber}
                          onChange={handleChange}
                          className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-red-500 transition"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">
                          Expiry (MM/YY) *
                        </label>
                        <input
                          type="text"
                          name="cardExpiry"
                          placeholder="MM/YY"
                          required={formData.paymentMethod === "card"}
                          value={formData.cardExpiry}
                          onChange={handleChange}
                          className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-red-500 transition"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">
                          CVC *
                        </label>
                        <input
                          type="text"
                          name="cardCvc"
                          placeholder="123"
                          required={formData.paymentMethod === "card"}
                          value={formData.cardCvc}
                          onChange={handleChange}
                          className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-red-500 transition"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="w-full bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-red-500/30"
              >
                Complete Purchase
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                By completing this purchase, you agree to our Terms of Service
                and Privacy Policy.
              </p>
            </form>
          </div>

          {/* Right column – order summary (sticky) */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 sticky top-24 shadow-2xl">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-2xl">🛒</span> Order Summary
              </h3>

              <div className="space-y-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start gap-3 border-b border-white/10 pb-3"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-1 text-sm">
                        <span>{item.flag1}</span>
                        <span className="font-medium">{item.team1}</span>
                        <span className="text-gray-400">vs</span>
                        <span>{item.flag2}</span>
                        <span className="font-medium">{item.team2}</span>
                      </div>
                      <p className="text-xs text-gray-400">
                        {item.category} · {item.quantity} × ${item.price}
                      </p>
                    </div>
                    <span className="font-semibold">
                      ${item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/10 text-lg font-bold">
                <span>Total</span>
                <span className="text-red-400">${total}</span>
              </div>

              <button
                onClick={() => navigate("/tickets")}
                className="w-full mt-4 bg-white/10 hover:bg-white/20 py-2 rounded-full text-sm transition"
              >
                ← Back to Tickets
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Same animation styles as TicketPage */}
      <style>{`
        @keyframes blob {
          0%,
          100% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
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
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </div>
  );
};

export default CheckoutPage;