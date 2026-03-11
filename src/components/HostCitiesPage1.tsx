import React, { useEffect, useRef, useState } from "react";
import Navbar from "./Home/Navbar";


// Types for city data
interface City {
  id: string;
  name: string;
  country: "USA" | "Mexico" | "Canada";
  stadium: string;
  capacity: number;
  matches: number;
  image?: string; // optional image URL
}

// All 16 official host cities with details
const citiesData: City[] = [
  // USA (11 cities)
  { id: "atlanta", name: "Atlanta", country: "USA", stadium: "Mercedes-Benz Stadium", capacity: 75000, matches: 5 },
  { id: "boston", name: "Boston", country: "USA", stadium: "Gillette Stadium", capacity: 66000, matches: 5 },
  { id: "dallas", name: "Dallas", country: "USA", stadium: "AT&T Stadium", capacity: 80000, matches: 6 },
  { id: "houston", name: "Houston", country: "USA", stadium: "NRG Stadium", capacity: 72000, matches: 5 },
  { id: "kansas-city", name: "Kansas City", country: "USA", stadium: "Arrowhead Stadium", capacity: 76000, matches: 5 },
  { id: "los-angeles", name: "Los Angeles", country: "USA", stadium: "SoFi Stadium", capacity: 70000, matches: 6 },
  { id: "miami", name: "Miami", country: "USA", stadium: "Hard Rock Stadium", capacity: 65000, matches: 5 },
  { id: "new-york", name: "New York/New Jersey", country: "USA", stadium: "MetLife Stadium", capacity: 82500, matches: 7 }, // final
  { id: "philadelphia", name: "Philadelphia", country: "USA", stadium: "Lincoln Financial Field", capacity: 69000, matches: 5 },
  { id: "san-francisco", name: "San Francisco Bay Area", country: "USA", stadium: "Levi's Stadium", capacity: 68500, matches: 5 },
  { id: "seattle", name: "Seattle", country: "USA", stadium: "Lumen Field", capacity: 69000, matches: 5 },
  // Mexico (3 cities)
  { id: "guadalajara", name: "Guadalajara", country: "Mexico", stadium: "Estadio Akron", capacity: 46000, matches: 4 },
  { id: "mexico-city", name: "Mexico City", country: "Mexico", stadium: "Estadio Azteca", capacity: 87000, matches: 6 },
  { id: "monterrey", name: "Monterrey", country: "Mexico", stadium: "Estadio BBVA", capacity: 53000, matches: 4 },
  // Canada (2 cities)
  { id: "toronto", name: "Toronto", country: "Canada", stadium: "BMO Field", capacity: 30000, matches: 4 },
  { id: "vancouver", name: "Vancouver", country: "Canada", stadium: "BC Place", capacity: 54000, matches: 5 },
];

// Country flags and colors
const countryInfo = {
  USA: { flag: "🇺🇸", color: "from-blue-600 to-red-500" },
  Mexico: { flag: "🇲🇽", color: "from-green-600 to-red-600" },
  Canada: { flag: "🇨🇦", color: "from-red-600 to-white" },
};

const HostCitiesPage1: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [filterCountry, setFilterCountry] = useState<string>("All");
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);

  // Countdown to opening match (June 11, 2026)
  useEffect(() => {
    const targetDate = new Date("June 11, 2026 00:00:00").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  // Intersection Observer for entrance animations
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
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Filter cities by selected country
  const filteredCities =
    filterCountry === "All"
      ? citiesData
      : citiesData.filter((city) => city.country === filterCountry);

  // Compute totals for stats widget
  const totalCities = citiesData.length;
  const totalMatches = citiesData.reduce((sum, city) => sum + city.matches, 0);
  const totalCapacity = citiesData.reduce((sum, city) => sum + city.capacity, 0);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#0b0f3b] via-[#1b1f6b] to-[#0b0f3b] text-white font-['Oswald',sans-serif]">
      {/* Decorative background map (subtle) */}
      <Navbar/>
      <div className="absolute inset-0 z-0 opacity-10">
       
        <img
          src="data:image/jpeg;base64,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"
          alt=""
          className="w-full h-full object-cover"
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
      </div>

      {/* Animated floating images */}
      <img
        src="data:image/jpeg;base64,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"
        alt=""
        className="absolute top-20 left-5 w-48 rounded-2xl shadow-2xl opacity-30 hidden lg:block animate-float-slow"
        onError={(e) => (e.currentTarget.style.display = "none")}
      />
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIxuPQpDidvweYzCTXWj5Fy0Ii_1PdqWvBcw&s"
        alt=""
        className="absolute bottom-20 right-5 w-56 rounded-2xl shadow-2xl opacity-30 hidden lg:block animate-float"
        onError={(e) => (e.currentTarget.style.display = "none")}
      />
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBKyRNMUGcMJSRg-7n9f3K6CZWpxpYwnevfw&s"
        alt=""
        className="absolute top-1/3 left-10 w-40 rounded-2xl shadow-2xl opacity-20 hidden xl:block animate-float-slower"
        onError={(e) => (e.currentTarget.style.display = "none")}
      />

      {/* Main content */}
      <div ref={sectionRef} className="relative z-10 mx-auto max-w-7xl px-6 py-24 md:py-32">
        {/* Hero heading */}
        <div
          className={`text-center mb-12 transition-all duration-1000 transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="uppercase tracking-[0.35em] text-sm text-gray-300 mb-4">
            THREE NATIONS. 16 CITIES. ONE STAGE.
          </p>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            HOST COUNTRIES & CITIES
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            For the first time ever, the FIFA World Cup™ will be hosted by three nations:
            Canada, Mexico, and the United States. Explore the 16 vibrant cities that will
            welcome the world in 2026.
          </p>
        </div>

        {/* Stats Widget */}
        <div
          className={`grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/10">
            <p className="text-4xl font-bold text-red-400">{totalCities}</p>
            <p className="text-sm text-gray-300">Host Cities</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/10">
            <p className="text-4xl font-bold text-red-400">3</p>
            <p className="text-sm text-gray-300">Countries</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/10">
            <p className="text-4xl font-bold text-red-400">{totalMatches}</p>
            <p className="text-sm text-gray-300">Matches</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/10">
            <p className="text-4xl font-bold text-red-400">{(totalCapacity / 1000).toFixed(0)}k</p>
            <p className="text-sm text-gray-300">Total Capacity</p>
          </div>
        </div>

        {/* Countdown Widget */}
        <div
          className={`flex justify-center items-center gap-8 mb-16 p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 max-w-2xl mx-auto ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: "300ms" }}
        >
          <div className="text-center">
            <p className="text-3xl font-bold text-red-400">{String(timeLeft.days).padStart(2, "0")}</p>
            <span className="text-xs text-gray-400">DAYS</span>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-red-400">{String(timeLeft.hours).padStart(2, "0")}</p>
            <span className="text-xs text-gray-400">HOURS</span>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-red-400">{String(timeLeft.minutes).padStart(2, "0")}</p>
            <span className="text-xs text-gray-400">MINUTES</span>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-red-400">{String(timeLeft.seconds).padStart(2, "0")}</p>
            <span className="text-xs text-gray-400">SECONDS</span>
          </div>
        </div>

        {/* Country Filter Widget */}
        <div
          className={`flex flex-wrap justify-center gap-3 mb-12 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: "400ms" }}
        >
          {["All", "USA", "Mexico", "Canada"].map((country) => (
            <button
              key={country}
              onClick={() => setFilterCountry(country)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition ${
                filterCountry === country
                  ? "bg-red-500 text-white"
                  : "bg-white/10 text-gray-300 hover:bg-white/20"
              }`}
            >
              {country === "All" ? "All Countries" : country}
            </button>
          ))}
        </div>

        {/* City Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCities.map((city, idx) => (
            <div
              key={city.id}
              className={`group relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-red-500/50 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${500 + idx * 100}ms` }}
            >
              {/* Card header with country flag and city name */}
              <div className={`h-24 bg-gradient-to-r ${countryInfo[city.country].color} p-4 flex items-end`}>
                <h3 className="text-2xl font-bold text-white drop-shadow-lg">{city.name}</h3>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{countryInfo[city.country].flag}</span>
                  <span className="text-sm text-gray-300">{city.country}</span>
                </div>
                <p className="text-lg font-semibold text-red-400 mb-1">{city.stadium}</p>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>🏟️ Capacity: {city.capacity.toLocaleString()}</span>
                  <span>⚽ {city.matches} matches</span>
                </div>
                <button className="mt-4 w-full bg-white/10 hover:bg-red-500 py-2 rounded-lg text-sm font-semibold transition">
                  View Hospitality
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Extra CTA */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            From the iconic Estadio Azteca to the brand‑new SoFi Stadium, each venue
            offers a unique flavour of football fever.
          </p>
          <button className="mt-8 bg-red-500 hover:bg-red-600 px-8 py-4 rounded-full text-lg font-semibold transition transform hover:scale-105 hover:shadow-lg active:scale-95">
            Explore Hospitality Packages
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

export default HostCitiesPage1;