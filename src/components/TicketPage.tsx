import React, { useEffect, useRef, useState } from "react";
import Navbar from "./Home/Navbar";
import { Link } from "react-router-dom";

// Types for match and cart item
interface Match {
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
}

interface CartItem extends Match {
  quantity: number;
}

// Helper to convert country code to flag emoji (e.g., "mx" → "🇲🇽")
const getFlagEmoji = (code: string): string => {
  if (code.length === 2 && /^[a-zA-Z]+$/.test(code)) {
    const upper = code.toUpperCase();
    return String.fromCodePoint(127462 + upper.charCodeAt(0) - 65) +
           String.fromCodePoint(127462 + upper.charCodeAt(1) - 65);
  }
  // Already an emoji or special string (e.g., "🏴󠁧󠁢󠁥󠁮󠁧󠁿")
  return code;
};

const TicketPage: React.FC = () => {
  // const [isVisible, setIsVisible] = useState();
  const [activeCategory, setActiveCategory] = useState("All");
  const [cart, setCart] = useState<CartItem[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Sample match data (2026 World Cup fixtures – illustrative)
  const matches: Match[] = [
    { id: 1, stage: "Group Stage", team1: "Mexico", team2: "South Africa", flag1: "mx", flag2: "za", date: "June 11, 2026", venue: "Estadio Azteca", city: "Mexico City", category: "Category 1", price: 450, available: 1200 },
    { id: 2, stage: "Group Stage", team1: "Mexico", team2: "South Africa", flag1: "mx", flag2: "za", date: "June 11, 2026", venue: "Estadio Azteca", city: "Mexico City", category: "Category 2", price: 1000, available: 800 },
    { id: 3, stage: "Group Stage", team1: "Mexico", team2: "South Africa", flag1: "mx", flag2: "za", date: "June 11, 2026", venue: "Estadio Azteca", city: "Mexico City", category: "Category 3", price: 2500, available: 1200 },
    { id: 4, stage: "Group Stage", team1: "Mexico", team2: "South Africa", flag1: "mx", flag2: "za", date: "June 11, 2026", venue: "Estadio Azteca", city: "Mexico City", category: "VIP", price: 3000, available: 200 },

    { id: 5, stage: "Group Stage", team1: "South Korea", team2: "UEFA Playoff Team", flag1: "kr", flag2: "eu", date: "June 12, 2026", venue: "Estadio Akron", city: "Guadalajara", category: "Category 1", price: 450, available: 850 },
    { id: 6, stage: "Group Stage", team1: "South Korea", team2: "UEFA Playoff Team", flag1: "kr", flag2: "eu", date: "June 12, 2026", venue: "Estadio Akron", city: "Guadalajara", category: "Category 2", price: 1000, available: 50 },
    { id: 7, stage: "Group Stage", team1: "South Korea", team2: "UEFA Playoff Team", flag1: "kr", flag2: "eu", date: "June 12, 2026", venue: "Estadio Akron", city: "Guadalajara", category: "Category 3", price: 1500, available: 100 },
    { id: 8, stage: "Group Stage", team1: "South Korea", team2: "UEFA Playoff Team", flag1: "kr", flag2: "eu", date: "June 12, 2026", venue: "Estadio Akron", city: "Guadalajara", category: "VIP", price: 2000, available: 100 },

    { id: 9, stage: "Group Stage", team1: "Canada", team2: "UEFA Playoff Team", flag1: "ca", flag2: "eu", date: "June 12, 2026", venue: "BMO Field", city: "Toronto", category: "Category 2", price: 320, available: 2000 },

    { id: 10, stage: "Group Stage", team1: "United States", team2: "Paraguay", flag1: "us", flag2: "py", date: "June 13, 2026", venue: "SoFi Stadium", city: "Inglewood (Los Angeles)", category: "Category 1", price: 500, available: 300 },
    { id: 11, stage: "Group Stage", team1: "United States", team2: "Paraguay", flag1: "us", flag2: "py", date: "June 13, 2026", venue: "SoFi Stadium", city: "Inglewood (Los Angeles)", category: "Category 2", price: 1500, available: 2500 },
    { id: 12, stage: "Group Stage", team1: "United States", team2: "Paraguay", flag1: "us", flag2: "py", date: "June 13, 2026", venue: "SoFi Stadium", city: "Inglewood (Los Angeles)", category: "Category 3", price: 2000, available: 1500 },
    { id: 13, stage: "Group Stage", team1: "United States", team2: "Paraguay", flag1: "us", flag2: "py", date: "June 13, 2026", venue: "SoFi Stadium", city: "Inglewood (Los Angeles)", category: "VIP", price: 3000, available: 30 },

    { id: 14, stage: "Group Stage", team1: "Qatar", team2: "Switzerland", flag1: "qa", flag2: "ch", date: "June 13, 2026", venue: "AT&T Stadium", city: "Arlington, Texas", category: "Category 1", price: 500, available: 600 },
    { id: 15, stage: "Group Stage", team1: "Qatar", team2: "Switzerland", flag1: "qa", flag2: "ch", date: "June 13, 2026", venue: "AT&T Stadium", city: "Arlington, Texas", category: "Category 2", price: 1500, available: 400 },
    { id: 16, stage: "Group Stage", team1: "Qatar", team2: "Switzerland", flag1: "qa", flag2: "ch", date: "June 13, 2026", venue: "AT&T Stadium", city: "Arlington, Texas", category: "Category 3", price: 3000, available: 600 },
    { id: 17, stage: "Group Stage", team1: "Qatar", team2: "Switzerland", flag1: "qa", flag2: "ch", date: "June 13, 2026", venue: "AT&T Stadium", city: "Arlington, Texas", category: "VIP", price: 5000, available: 70 },

    { id: 18, stage: "Group Stage", team1: "Brazil", team2: "Morocco", flag1: "br", flag2: "ma", date: "June 13, 2026", venue: "NRG Stadium", city: "Houston, Texas", category: "Category 1", price: 500, available: 100 },
    { id: 19, stage: "Group Stage", team1: "Brazil", team2: "Morocco", flag1: "br", flag2: "ma", date: "June 13, 2026", venue: "NRG Stadium", city: "Houston, Texas", category: "Category 2", price: 1000, available: 200 },
    { id: 20, stage: "Group Stage", team1: "Brazil", team2: "Morocco", flag1: "br", flag2: "ma", date: "June 13, 2026", venue: "NRG Stadium", city: "Houston, Texas", category: "Category 3", price: 3500, available: 200 },
    { id: 21, stage: "Group Stage", team1: "Brazil", team2: "Morocco", flag1: "br", flag2: "ma", date: "June 13, 2026", venue: "NRG Stadium", city: "Houston, Texas", category: "VIP", price: 5000, available: 100 },

    { id: 22, stage: "Group Stage", team1: "Haiti", team2: "Scotland", flag1: "ht", flag2: "sco", date: "June 13, 2026", venue: "Mercedes-Benz Stadium", city: "Atlanta", category: "Category 1", price: 600, available: 400 },
    { id: 23, stage: "Group Stage", team1: "Haiti", team2: "Scotland", flag1: "ht", flag2: "sco", date: "June 13, 2026", venue: "Mercedes-Benz Stadium", city: "Atlanta", category: "Category 2", price: 1500, available: 200 },
    { id: 24, stage: "Group Stage", team1: "Haiti", team2: "Scotland", flag1: "ht", flag2: "sco", date: "June 13, 2026", venue: "Mercedes-Benz Stadium", city: "Atlanta", category: "Category 3", price: 2700, available: 100 },
    { id: 25, stage: "Group Stage", team1: "Haiti", team2: "Scotland", flag1: "ht", flag2: "sco", date: "June 13, 2026", venue: "Mercedes-Benz Stadium", city: "Atlanta", category: "VIP", price: 4000, available: 400 },

    { id: 26, stage: "Group Stage", team1: "Australia", team2: "UEFA Playoff Team", flag1: "au", flag2: "eu", date: "June 13, 2026", venue: "Hard Rock Stadium", city: "Miami", category: "Category 1", price: 700, available: 200 },
    { id: 27, stage: "Group Stage", team1: "Australia", team2: "UEFA Playoff Team", flag1: "au", flag2: "eu", date: "June 13, 2026", venue: "Hard Rock Stadium", city: "Miami", category: "Category 2", price: 1700, available: 300 },
    { id: 28, stage: "Group Stage", team1: "Australia", team2: "UEFA Playoff Team", flag1: "au", flag2: "eu", date: "June 13, 2026", venue: "Hard Rock Stadium", city: "Miami", category: "Category 3", price: 2700, available: 90 },
    { id: 29, stage: "Group Stage", team1: "Australia", team2: "UEFA Playoff Team", flag1: "au", flag2: "eu", date: "June 13, 2026", venue: "Hard Rock Stadium", city: "Miami", category: "VIP", price: 5500, available: 200 }
  ];

  // Filter matches by category
  const filteredMatches =
    activeCategory === "All"
      ? matches
      : matches.filter((m) => m.category === activeCategory);

  // Categories for filter tabs
  const categories = ["All", "Category 1", "Category 2", "Category 3", "VIP"];

  // Intersection Observer for entrance animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Add to cart function
  const addToCart = (match: Match) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === match.id);
      if (existing) {
        return prev.map((item) =>
          item.id === match.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...match, quantity: 1 }];
      }
    });
  };

  // Remove from cart / decrease quantity
  const removeFromCart = (id: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Calculate total price
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#0b0f3b] via-[#1b1f6b] to-[#0b0f3b] text-white font-['Oswald',sans-serif]">
      <Navbar />
      {/* Decorative floating images */}
      <img
        src="data:image/jpeg;base64,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"
        alt=""
        className="absolute top-20 left-5 w-48 rounded-2xl shadow-2xl opacity-30 hidden lg:block animate-float-slow"
        onError={(e) => (e.currentTarget.style.display = "none")}
      />
      <img
        src="data:image/jpeg;base64,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"
        alt=""
        className="absolute bottom-20 right-5 w-56 rounded-2xl shadow-2xl opacity-30 hidden lg:block animate-float"
        onError={(e) => (e.currentTarget.style.display = "none")}
      />
      <img
        src="data:image/jpeg;base64,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"
        alt=""
        className="absolute top-1/3 left-10 w-40 rounded-2xl shadow-2xl opacity-20 hidden xl:block animate-float-slower"
        onError={(e) => (e.currentTarget.style.display = "none")}
      />

      {/* Main content */}
      <div ref={sectionRef} className="relative z-10 mx-auto max-w-7xl px-6 py-24 md:py-32">
        {/* Hero heading */}
        <div
        className="text-center mb-16 transition-all duration-1000 transform"
        >
          <p className="uppercase tracking-[0.35em] text-sm text-gray-300 mb-4">
            SECURE YOUR SEAT
          </p>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            MATCH TICKETS
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Choose from 104 matches across North America. Official ticket packages
            with guaranteed availability and premium options.
          </p>
        </div>

        {/* Category filter tabs */}
        <div
        className="flex flex-wrap justify-center gap-3 mb-12 transition-all duration-700 delay-200"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition ${
                activeCategory === cat
                  ? "bg-red-500 text-white"
                  : "bg-white/10 text-gray-300 hover:bg-white/20"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Two‑column layout: match cards (left) + cart widget (right) */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Match cards grid */}
          <div className="lg:col-span-2 space-y-6">
            {filteredMatches.map((match) => (
              <div
                key={match.id}
                className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-red-500/50 transition-all duration-500 transform hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Match info (left) */}
                  <div className="flex-1 p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs uppercase tracking-wider text-gray-400">
                        {match.stage}
                      </span>
                      <span className="text-xs bg-red-500/20 text-red-300 px-2 py-1 rounded-full">
                        {match.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-3xl">{getFlagEmoji(match.flag1)}</span>
                      <span className="text-xl font-bold">{match.team1}</span>
                      <span className="text-gray-400">vs</span>
                      <span className="text-3xl">{getFlagEmoji(match.flag2)}</span>
                      <span className="text-xl font-bold">{match.team2}</span>
                    </div>
                    <div className="text-gray-300 text-sm space-y-1">
                      <p>📅 {match.date}</p>
                      <p>🏟️ {match.venue}, {match.city}</p>
                      <p>🎟️ {match.available.toLocaleString()} tickets available</p>
                    </div>
                  </div>
                  {/* Price & action (right) */}
                  <div className="md:w-48 bg-white/5 p-6 flex flex-row md:flex-col items-center justify-between md:justify-center gap-4 border-t md:border-t-0 md:border-l border-white/10">
                    <div className="text-center">
                      <span className="text-sm text-gray-400">from</span>
                      <p className="text-3xl font-bold text-red-400">
                        ${match.price}
                      </p>
                    </div>
                    <button
                      onClick={() => addToCart(match)}
                      className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded-full text-sm font-semibold transition transform hover:scale-105 active:scale-95 whitespace-nowrap"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cart / summary widget */}
          <div
            className="lg:col-span-1 transition-all duration-700 delay-500"
          >
            <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-6 sticky top-24">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <span>🎫</span> Your Selection
              </h3>
              {cart.length === 0 ? (
                <p className="text-gray-400 text-sm">No tickets selected yet.</p>
              ) : (
                <>
                  <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-3 border-b border-white/10 pb-3"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-1 text-sm">
                            <span>{getFlagEmoji(item.flag1)}</span>
                            <span className="font-medium">{item.team1}</span>
                            <span className="text-gray-400">vs</span>
                            <span>{getFlagEmoji(item.flag2)}</span>
                            <span className="font-medium">{item.team2}</span>
                          </div>
                          <p className="text-xs text-gray-400">
                            {item.category} · ${item.price} each
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="w-6 h-6 rounded-full bg-white/10 hover:bg-red-500 flex items-center justify-center text-sm"
                          >
                            −
                          </button>
                          <span className="w-6 text-center">{item.quantity}</span>
                          <button
                            onClick={() => addToCart(item)}
                            className="w-6 h-6 rounded-full bg-white/10 hover:bg-green-500 flex items-center justify-center text-sm"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 pt-4 border-t border-white/20">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-red-400">${totalPrice}</span>
                    </div>
                    <Link to='/CheckOutPage'>
                    <button className="w-full mt-4 bg-red-500 hover:bg-red-600 py-3 rounded-full font-semibold transition transform hover:scale-105 active:scale-95">
                      Proceed to Checkout
                    </button>
                    </Link>
                  </div>
                </>
              )}
              <p className="text-xs text-gray-500 mt-4 text-center">
                * All tickets are official and guaranteed.
              </p>
            </div>
          </div>
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

export default TicketPage;