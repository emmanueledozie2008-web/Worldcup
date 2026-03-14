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

// Helper to convert country code to flag emoji
const getFlagEmoji = (code: string): string => {
  if (code.length === 2 && /^[a-zA-Z]+$/.test(code)) {
    const upper = code.toUpperCase();
    return String.fromCodePoint(127462 + upper.charCodeAt(0) - 65) +
           String.fromCodePoint(127462 + upper.charCodeAt(1) - 65);
  }
  return code;
};

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [usdtAddress] = useState("TXYZ...1234"); // Mock USDT address

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
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // No need for separate showUsdtAddress state – we use formData.paymentMethod directly
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert("Your cart is empty. Please add tickets before checking out.");
      return;
    }
    
    // Simulate payment processing
    if (formData.paymentMethod === "usdt") {
      alert(`Please send exactly $${total} USDT (TRC20) to: ${usdtAddress}\nAfter payment, click OK to confirm (demo).`);
    } else {
      alert("Purchase complete! (demo)");
    }
    
    // Prepare order data for confirmation page
    const orderData = {
      cart,
      total,
      customerInfo: {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        zip: formData.zip,
        country: formData.country,
      },
      paymentMethod: formData.paymentMethod,
      orderDate: new Date().toISOString(),
    };
    
    localStorage.setItem("lastOrder", JSON.stringify(orderData));
    localStorage.removeItem("cart");
    
    navigate("/confirmation", { state: { order: orderData } });
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-[#0a1a2f] to-gray-900 text-white font-sans overflow-x-hidden">
      <Navbar />

      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-24">
        {/* Checkout header */}
        <div className="text-center mb-8 md:mb-12">
          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-red-200 uppercase bg-red-500/20 rounded-full mb-4">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Secure Checkout
            </span>
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-blue-400">
            Almost There!
          </h1>
          <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto">
            Complete your purchase by filling in your details below.
          </p>
        </div>

        {/* Two‑column layout */}
        <div className="lg:grid lg:grid-cols-3 gap-8">
          {/* Left column – checkout form */}
          <div className="lg:col-span-2 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-white/10 transition-all hover:border-white/20">
                <h2 className="text-lg md:text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="text-2xl">👤</span> Personal Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <label className="block text-sm text-gray-400 mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </span>
                      <input
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>
                  <div className="relative">
                    <label className="block text-sm text-gray-400 mb-1">
                      Email *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </span>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div className="relative md:col-span-2">
                    <label className="block text-sm text-gray-400 mb-1">
                      Phone *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </span>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Billing Address */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-white/10 transition-all hover:border-white/20">
                <h2 className="text-lg md:text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="text-2xl">🏠</span> Billing Address
                </h2>
                <div className="space-y-4">
                  <div className="relative">
                    <label className="block text-sm text-gray-400 mb-1">
                      Street Address *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                      </span>
                      <input
                        type="text"
                        name="address"
                        required
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition"
                        placeholder="123 Main St"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="col-span-2 relative">
                      <label className="block text-sm text-gray-400 mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition"
                        placeholder="Los Angeles"
                      />
                    </div>
                    <div className="relative">
                      <label className="block text-sm text-gray-400 mb-1">
                        ZIP *
                      </label>
                      <input
                        type="text"
                        name="zip"
                        required
                        value={formData.zip}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition"
                        placeholder="90210"
                      />
                    </div>
                    <div className="relative">
                      <label className="block text-sm text-gray-400 mb-1">
                        Country *
                      </label>
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition appearance-none"
                      >
                        <option value="USA">United States</option>
                        <option value="CAN">Canada</option>
                        <option value="MEX">Mexico</option>
                      </select>
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-white/10 transition-all hover:border-white/20">
                <h2 className="text-lg md:text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="text-2xl">💳</span> Payment Method
                </h2>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-4">
                    <label className="flex items-center gap-2 p-3 bg-white/5 rounded-lg border border-white/10 cursor-pointer transition hover:bg-white/10 hover:border-white/20 flex-1 min-w-[150px]">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={formData.paymentMethod === "card"}
                        onChange={handleChange}
                        className="text-red-500 focus:ring-red-500"
                      />
                      <span className="flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                        Card
                      </span>
                    </label>
                    <label className="flex items-center gap-2 p-3 bg-white/5 rounded-lg border border-white/10 cursor-pointer transition hover:bg-white/10 hover:border-white/20 flex-1 min-w-[150px]">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="paypal"
                        checked={formData.paymentMethod === "paypal"}
                        onChange={handleChange}
                        className="text-red-500 focus:ring-red-500"
                      />
                      <span className="flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                        PayPal
                      </span>
                    </label>
                    <label className="flex items-center gap-2 p-3 bg-white/5 rounded-lg border border-white/10 cursor-pointer transition hover:bg-white/10 hover:border-white/20 flex-1 min-w-[150px]">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="usdt"
                        checked={formData.paymentMethod === "usdt"}
                        onChange={handleChange}
                        className="text-red-500 focus:ring-red-500"
                      />
                      <span className="flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 0v8m-4-4h8" />
                        </svg>
                        USDT (TRC20)
                      </span>
                    </label>
                  </div>

                  {formData.paymentMethod === "card" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 animate-fadeIn">
                      <div className="col-span-2 relative">
                        <label className="block text-sm text-gray-400 mb-1">
                          Card Number *
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                            </svg>
                          </span>
                          <input
                            type="text"
                            name="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            required={formData.paymentMethod === "card"}
                            value={formData.cardNumber}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition"
                          />
                        </div>
                      </div>
                      <div className="relative">
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
                          className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition"
                        />
                      </div>
                      <div className="relative">
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
                          className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition"
                        />
                      </div>
                    </div>
                  )}

                  {formData.paymentMethod === "usdt" && (
                    <div className="mt-4 p-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-lg border border-yellow-500/20 animate-fadeIn">
                      <p className="text-sm text-yellow-300 flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        You will be redirected to complete payment using USDT (TRC20). After payment, click "Complete Purchase" to confirm.
                      </p>
                      <div className="mt-3 flex items-center gap-2 bg-black/30 p-2 rounded-lg">
                        <span className="text-xs text-gray-400">Send to:</span>
                        <code className="text-xs bg-black/50 px-2 py-1 rounded font-mono text-yellow-300">{usdtAddress}</code>
                        <button
                          type="button"
                          onClick={() => navigator.clipboard.writeText(usdtAddress)}
                          className="text-xs text-blue-400 hover:text-blue-300 transition"
                        >
                          Copy
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Trust badges */}
              <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Secure SSL
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Money-back guarantee
                </span>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={cart.length === 0}
                className={`w-full py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 active:scale-95 shadow-lg relative overflow-hidden group ${
                  cart.length === 0
                    ? "bg-gray-500 cursor-not-allowed opacity-50 hover:scale-100"
                    : "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-red-500/30"
                }`}
              >
                <span className="relative z-10">Complete Purchase</span>
                {cart.length > 0 && (
                  <span className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
                )}
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                By completing this purchase, you agree to our Terms of Service
                and Privacy Policy.
              </p>
            </form>
          </div>

          {/* Right column – order summary */}
          <div className="lg:col-span-1 mt-8 lg:mt-0">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-4 md:p-6 sticky top-24 shadow-2xl transition-all hover:border-white/30">
              <h3 className="text-lg md:text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-2xl">🛒</span> Order Summary
              </h3>

              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <svg className="w-16 h-16 mx-auto text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <p className="text-gray-400">Your cart is empty</p>
                  <button
                    onClick={() => navigate("/tickets")}
                    className="mt-4 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full text-sm transition"
                  >
                    Browse Tickets
                  </button>
                </div>
              ) : (
                <>
                  <div className="space-y-4 max-h-80 md:max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-start gap-3 border-b border-white/10 pb-3 last:border-0 hover:bg-white/5 p-2 rounded-lg transition"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-1 text-sm flex-wrap">
                            <span className="text-lg">{item.flag1 ? getFlagEmoji(item.flag1) : "🏳️"}</span>
                            <span className="font-medium">{item.team1}</span>
                            <span className="text-gray-400 text-xs">vs</span>
                            <span className="text-lg">{item.flag2 ? getFlagEmoji(item.flag2) : "🏳️"}</span>
                            <span className="font-medium">{item.team2}</span>
                          </div>
                          <p className="text-xs text-gray-400 mt-1">
                            {item.category} · {item.quantity} x ${item.price}
                          </p>
                        </div>
                        <span className="font-semibold whitespace-nowrap">
                          ${item.price * item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/10 text-lg font-bold">
                    <span>Total</span>
                    <span className="text-red-400">${total}</span>
                  </div>
                </>
              )}

              <button
                onClick={() => navigate("/tickets")}
                className="w-full mt-4 bg-white/10 hover:bg-white/20 py-2 rounded-full text-sm transition flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Tickets
              </button>
            </div>
          </div>
        </div>
      </div>

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
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
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