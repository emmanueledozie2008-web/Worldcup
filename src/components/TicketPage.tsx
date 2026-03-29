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
  const [activeCategory, setActiveCategory] = useState("All");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
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
    { id: 29, stage: "Group Stage", team1: "Australia", team2: "UEFA Playoff Team", flag1: "au", flag2: "eu", date: "June 13, 2026", venue: "Hard Rock Stadium", city: "Miami", category: "VIP", price: 5500, available: 200 },
    { id: 30, stage: "Group Stage", team1: "Saudi-Arabia", team2: "Uruguay", flag1: "sa", flag2: "uy", date: "June 15, 2026", venue: "Hard Rock Stadium", city: "Miami", category: "VIP", price: 5500, available: 100 },
    { id: 31, stage: "Group Stage", team1: "Saudi-Arabia", team2: "Uruguay", flag1: "sa", flag2: "uy", date: "June 15, 2026", venue: "Hard Rock Stadium", city: "Miami", category: "Category 1", price: 500, available: 200 },
    { id: 32, stage: "Group Stage", team1: "Saudi-Arabia", team2: "Uruguay", flag1: "sa", flag2: "uy", date: "June 15, 2026", venue: "Hard Rock Stadium", city: "Miami", category: "Category 2", price: 1000, available: 10 },
    { id: 33, stage: "Group Stage", team1: "Saudi-Arabia", team2: "Uruguay", flag1: "sa", flag2: "uy", date: "June 15, 2026", venue: "Hard Rock Stadium", city: "Miami", category: "Category 3", price: 2000, available: 80 },
    { id: 34, stage: "Group Stage", team1: "Saudi-Arabia", team2: "Spain", flag1: "sa", flag2: "es", date: "June 21, 2026", venue: "Hard Rock Stadium", city: "Atlanta", category: "Category 1", price: 500, available: 80 },
    { id: 35, stage: "Group Stage", team1: "Saudi-Arabia", team2: "Spain", flag1: "sa", flag2: "es", date: "June 21, 2026", venue: "Hard Rock Stadium", city: "Atlanta", category: "Category 2", price: 1000, available: 80 },
    { id: 36, stage: "Group Stage", team1: "Saudi-Arabia", team2: "Spain", flag1: "sa", flag2: "es", date: "June 21, 2026", venue: "Hard Rock Stadium", city: "Atlanta", category: "Category 3", price: 2000, available: 80 },
    { id: 37, stage: "Group Stage", team1: "Saudi-Arabia", team2: "Spain", flag1: "sa", flag2: "es", date: "June 21, 2026", venue: "Hard Rock Stadium", city: "Atlanta", category: "VIP", price: 4000, available: 80 },
    { id: 38, stage: "Group Stage", team1: "Saudi-Arabia", team2: "Cape Varde", flag1: "sa", flag2: "cv", date: "June 26, 2026", venue: "Houston", city: "Atlanta", category: "VIP", price: 6000, available: 20 },
    { id: 39, stage: "Group Stage", team1: "Saudi-Arabia", team2: "Cape Varde", flag1: "sa", flag2: "cv", date: "June 26, 2026", venue: "Houston", city: "Atlanta", category: "Category 1", price: 500, available: 100 },
    { id: 40, stage: "Group Stage", team1: "Saudi-Arabia", team2: "Cape Varde", flag1: "sa", flag2: "cv", date: "June 26, 2026", venue: "Houston", city: "Atlanta", category: "Category 2", price: 2000, available: 300 },
    { id: 41, stage: "Group Stage", team1: "Saudi-Arabia", team2: "Cape Varde", flag1: "sa", flag2: "cv", date: "June 26, 2026", venue: "Houston", city: "Atlanta", category: "Category 3", price: 2500, available: 10 },
    { id: 42, stage: "Group Stage", team1: "Argentina", team2: "Algeria", flag1: "ar", flag2: "dz", date: "June 16, 2026", venue: "Arrowhead ", city: "kansas", category: "Category 1", price: 500, available: 120 },
    { id: 43, stage: "Group Stage", team1: "Argentina", team2: "Algeria", flag1: "ar", flag2: "dz", date: "June 16, 2026", venue: "Arrowhead ", city: "kansas", category: "Category 2", price: 1500, available: 510 },
    { id: 44, stage: "Group Stage", team1: "Argentina", team2: "Algeria", flag1: "ar", flag2: "dz", date: "June 16, 2026", venue: "Arrowhead ", city: "kansas", category: "Category 3", price: 2500, available: 310 },
    { id: 45, stage: "Group Stage", team1: "Argentina", team2: "Algeria", flag1: "ar", flag2: "dz", date: "June 16, 2026", venue: "Arrowhead ", city: "kansas", category: "VIP", price: 7500, available: 110 },
    { id: 46, stage: "Group Stage", team1: "Argentina", team2: "Austria", flag1: "at", flag2: "dz", date: "June 22, 2026", venue: "AT&T stadium", city: "Texas", category: "Category 1", price: 500, available: 110 },
    { id: 47, stage: "Group Stage", team1: "Argentina", team2: "Austria", flag1: "at", flag2: "dz", date: "June 22, 2026", venue: "AT&T stadium", city: "Texas", category: "Category 2", price: 1500, available: 210 },
    { id: 48, stage: "Group Stage", team1: "Argentina", team2: "Austria", flag1: "at", flag2: "dz", date: "June 22, 2026", venue: "AT&T stadium", city: "Texas", category: "Category 3", price: 3500, available: 410 },
    { id: 49, stage: "Group Stage", team1: "Argentina", team2: "Austria", flag1: "at", flag2: "dz", date: "June 22, 2026", venue: "AT&T stadium", city: "Texas", category: "VIP", price: 7500, available: 150 },

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
          // You could trigger animations here
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
    <div className="relative min-h-screen bg-linear-to-r from-[#0a0f2e] via-[#141b4b] to-[#0a0f2e] text-white font-sans">
      <Navbar />
      
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-purple-400">
            2026 World Cup Tickets
          </h1>
          <p className="mt-3 text-lg text-gray-300">Secure your seats for the biggest matches</p>
        </div>

        {/* Filter Tabs - Horizontal scroll on mobile */}
        <div className="mb-8 overflow-x-auto pb-2 scrollbar-hide">
          <div className="flex space-x-2 min-w-max">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full font-semibold transition-all transform hover:scale-105 ${
                  activeCategory === cat
                    ? "bg-linear-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                    : "bg-white/10 backdrop-blur-sm text-gray-300 hover:bg-white/20"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Main content - matches grid and cart */}
        <div className="lg:flex lg:gap-8">
          {/* Matches Grid */}
          <div className="flex-1" ref={sectionRef}>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredMatches.map((match) => (
                <div
                  key={match.id}
                  className="group bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all hover:shadow-2xl hover:shadow-blue-500/10"
                >
                  {/* Card Header */}
                  <div className="p-4 bg-linear-to-r from-blue-600/20 to-purple-600/20 border-b border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold px-2 py-1 bg-blue-500/20 rounded-full text-blue-300">
                        {match.stage}
                      </span>
                      <span className="text-xs text-gray-400">{match.category}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl">{getFlagEmoji(match.flag1)}</span>
                        <span className="font-bold">{match.team1}</span>
                      </div>
                      <span className="text-yellow-400 font-bold">VS</span>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold">{match.team2}</span>
                        <span className="text-2xl">{getFlagEmoji(match.flag2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-4 space-y-3">
                    <div className="flex items-center text-sm text-gray-300">
                      <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {match.date}
                    </div>
                    <div className="flex items-center text-sm text-gray-300">
                      <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {match.venue}, {match.city}
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <div>
                        <span className="text-2xl font-bold text-yellow-400">${match.price}</span>
                        <span className="text-sm text-gray-400 ml-1">/ ticket</span>
                      </div>
                      <span className="text-sm text-gray-400">{match.available} left</span>
                    </div>
                    <button
                      onClick={() => addToCart(match)}
                      disabled={match.available === 0}
                      className={`w-full py-2 rounded-lg font-semibold transition-all transform hover:scale-[1.02] ${
                        match.available > 0
                          ? "bg-linear-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg"
                          : "bg-gray-600 cursor-not-allowed opacity-50"
                      }`}
                    >
                      {match.available > 0 ? "Add to Cart" : "Sold Out"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cart - Desktop sidebar, Mobile slide-over */}
          <div className="lg:w-96 mt-8 lg:mt-0">
            {/* Mobile cart button */}
           {/* Mobile cart button */}
<div className="lg:hidden fixed bottom-4 left-4 z-50">
  <button
    onClick={() => setIsCartOpen(!isCartOpen)}
    className="bg-linear-to-r from-blue-600 to-purple-600 p-4 rounded-full shadow-2xl hover:shadow-lg transition-all transform hover:scale-110"
  >
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
    {cart.length > 0 && (
      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center animate-pulse">
        {cart.reduce((sum, item) => sum + item.quantity, 0)}
      </span>
    )}
  </button>
</div>

            {/* Cart content */}
            <div
              className={`
                fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:relative lg:inset-auto lg:bg-transparent lg:backdrop-blur-none
                transition-opacity duration-300 lg:opacity-100
                ${isCartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none lg:pointer-events-auto"}
              `}
              onClick={() => setIsCartOpen(false)}
            >
              <div
                className={`
                  absolute right-0 top-0 h-full w-80 bg-[#1a1f4a] shadow-2xl p-6 overflow-y-auto
                  transform transition-transform duration-300 lg:relative lg:transform-none lg:w-auto lg:bg-white/5 lg:backdrop-blur-sm lg:rounded-xl lg:border lg:border-white/10
                  ${isCartOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"}
                `}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-purple-400">
                    Your Cart
                  </h2>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="lg:hidden text-gray-400 hover:text-white"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <svg className="w-16 h-16 mx-auto text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <p className="text-gray-400">Your cart is empty</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4 mb-6">
                      {cart.map((item) => (
                        <div key={item.id} className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg border border-white/5">
                          <div className="flex-1">
                            <div className="flex items-center space-x-1 text-sm font-semibold">
                              <span>{item.team1}</span>
                              <span className="text-yellow-400">vs</span>
                              <span>{item.team2}</span>
                            </div>
                            <div className="text-xs text-gray-400 mt-1">
                              {item.category} · ${item.price} x {item.quantity}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-400 hover:text-red-300 transition-colors"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </button>
                            <span className="text-white font-bold w-6 text-center">{item.quantity}</span>
                            <button
                              onClick={() => addToCart(item)}
                              className="text-green-400 hover:text-green-300 transition-colors"
                              disabled={item.available <= item.quantity}
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-white/10 pt-4">
                      <div className="flex justify-between text-lg font-bold mb-4">
                        <span>Total:</span>
                        <span className="text-yellow-400">${totalPrice}</span>
                      </div>
                      <Link to="/CheckOutPage">
                      <button className="w-full py-3 bg-linear-to-r from-green-500 to-emerald-600 rounded-lg font-bold hover:from-green-600 hover:to-emerald-700 transition-all transform hover:scale-[1.02] shadow-lg">
                        Proceed to Checkout
                      </button>
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animation keyframes */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
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
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default TicketPage;