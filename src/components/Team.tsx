import React, { useEffect, useRef, useState } from "react";
import Navbar from "./Home/Navbar";

// Types for team data
interface Team {
  id: string;
  name: string;
  flag: string; // emoji flag
  confederation: string;
  qualified: boolean; // true = already qualified, false = TBD
}

// Confederation slots for 2026
const confederations = [
  { name: "UEFA", slots: 16, color: "from-blue-500 to-blue-700" },
  { name: "CONMEBOL", slots: 6, color: "from-green-500 to-green-700" },
  { name: "CONCACAF", slots: 6, color: "from-yellow-500 to-yellow-700" }, // plus 3 hosts counted separately
  { name: "CAF", slots: 9, color: "from-orange-500 to-orange-700" },
  { name: "AFC", slots: 8, color: "from-red-500 to-red-700" },
  { name: "OFC", slots: 1, color: "from-purple-500 to-purple-700" },
];

// Hosts (automatically qualified)
const hosts: Team[] = [
  { id: "usa", name: "United States", flag: "🇺🇸", confederation: "CONCACAF", qualified: true },
  { id: "mexico", name: "Mexico", flag: "🇲🇽", confederation: "CONCACAF", qualified: true },
  { id: "canada", name: "Canada", flag: "🇨🇦", confederation: "CONCACAF", qualified: true },
];

// Sample qualified/prominent teams (for illustration)
const sampleTeams: Team[] = [
  // UEFA (example)
  { id: "fra", name: "France", flag: "🇫🇷", confederation: "UEFA", qualified: false },
  { id: "ger", name: "Germany", flag: "🇩🇪", confederation: "UEFA", qualified: false },
  { id: "esp", name: "Spain", flag: "🇪🇸", confederation: "UEFA", qualified: false },
  { id: "eng", name: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", confederation: "UEFA", qualified: false },
  { id: "ita", name: "Italy", flag: "🇮🇹", confederation: "UEFA", qualified: false },
  { id: "ned", name: "Netherlands", flag: "🇳🇱", confederation: "UEFA", qualified: false },
  { id: "por", name: "Portugal", flag: "🇵🇹", confederation: "UEFA", qualified: false },
  { id: "bel", name: "Belgium", flag: "🇧🇪", confederation: "UEFA", qualified: false },
  { id: "cro", name: "Croatia", flag: "🇭🇷", confederation: "UEFA", qualified: false },
  { id: "den", name: "Denmark", flag: "🇩🇰", confederation: "UEFA", qualified: false },
  // CONMEBOL
  { id: "bra", name: "Brazil", flag: "🇧🇷", confederation: "CONMEBOL", qualified: false },
  { id: "arg", name: "Argentina", flag: "🇦🇷", confederation: "CONMEBOL", qualified: false },
  { id: "uru", name: "Uruguay", flag: "🇺🇾", confederation: "CONMEBOL", qualified: false },
  { id: "col", name: "Colombia", flag: "🇨🇴", confederation: "CONMEBOL", qualified: false },
  { id: "ecu", name: "Ecuador", flag: "🇪🇨", confederation: "CONMEBOL", qualified: false },
  { id: "per", name: "Peru", flag: "🇵🇪", confederation: "CONMEBOL", qualified: false },
  // CAF
  { id: "sen", name: "Senegal", flag: "🇸🇳", confederation: "CAF", qualified: false },
  { id: "mar", name: "Morocco", flag: "🇲🇦", confederation: "CAF", qualified: false },
  { id: "egy", name: "Egypt", flag: "🇪🇬", confederation: "CAF", qualified: false },
  { id: "nga", name: "Nigeria", flag: "🇳🇬", confederation: "CAF", qualified: false },
  { id: "cmr", name: "Cameroon", flag: "🇨🇲", confederation: "CAF", qualified: false },
  { id: "tun", name: "Tunisia", flag: "🇹🇳", confederation: "CAF", qualified: false },
  { id: "alg", name: "Algeria", flag: "🇩🇿", confederation: "CAF", qualified: false },
  { id: "gha", name: "Ghana", flag: "🇬🇭", confederation: "CAF", qualified: false },
  { id: "civ", name: "Ivory Coast", flag: "🇨🇮", confederation: "CAF", qualified: false },
  // AFC
  { id: "jpn", name: "Japan", flag: "🇯🇵", confederation: "AFC", qualified: false },
  { id: "kor", name: "South Korea", flag: "🇰🇷", confederation: "AFC", qualified: false },
  { id: "aus", name: "Australia", flag: "🇦🇺", confederation: "AFC", qualified: false },
  { id: "irn", name: "Iran", flag: "🇮🇷", confederation: "AFC", qualified: false },
  { id: "ksa", name: "Saudi Arabia", flag: "🇸🇦", confederation: "AFC", qualified: false },
  { id: "qat", name: "Qatar", flag: "🇶🇦", confederation: "AFC", qualified: false },
  { id: "ira", name: "Iraq", flag: "🇮🇶", confederation: "AFC", qualified: false },
  { id: "uae", name: "UAE", flag: "🇦🇪", confederation: "AFC", qualified: false },
  // OFC
  { id: "nzl", name: "New Zealand", flag: "🇳🇿", confederation: "OFC", qualified: false },
  // Additional CONCACAF (besides hosts)
  { id: "crc", name: "Costa Rica", flag: "🇨🇷", confederation: "CONCACAF", qualified: false },
  { id: "pan", name: "Panama", flag: "🇵🇦", confederation: "CONCACAF", qualified: false },
  { id: "jam", name: "Jamaica", flag: "🇯🇲", confederation: "CONCACAF", qualified: false },
  { id: "hond", name: "Honduras", flag: "🇭🇳", confederation: "CONCACAF", qualified: false },
  { id: "slv", name: "El Salvador", flag: "🇸🇻", confederation: "CONCACAF", qualified: false },
];

// Combine hosts and sample teams
const allTeams = [...hosts, ...sampleTeams];

// Helper to get teams by confederation
const getTeamsByConfederation = (conf: string) => {
  return allTeams.filter((team) => team.confederation === conf);
};

const Team: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#0b0f3b] via-[#1b1f6b] to-[#0b0f3b] text-white font-['Oswald',sans-serif]">
      {/* Decorative background map */}
      <Navbar/>
      <div className="absolute inset-0 z-0 opacity-10">
        <img
          src="/images/world-map.png"
          alt=""
          className="w-full h-full object-cover"
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
      </div>

      {/* Animated floating images */}
      <img
        src="/images/float-globe.jpg"
        alt=""
        className="absolute top-20 left-5 w-48 rounded-2xl shadow-2xl opacity-30 hidden lg:block animate-float-slow"
        onError={(e) => (e.currentTarget.style.display = "none")}
      />
      <img
        src="/images/float-trophy.jpg"
        alt=""
        className="absolute bottom-20 right-5 w-56 rounded-2xl shadow-2xl opacity-30 hidden lg:block animate-float"
        onError={(e) => (e.currentTarget.style.display = "none")}
      />
      <img
        src="/images/float-flags.jpg"
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
            48 NATIONS. ONE DREAM.
          </p>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            PARTICIPATING NATIONS
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            The expanded FIFA World Cup 2026™ will feature 48 teams from six confederations.
            Below are the hosts and a preview of the nations set to compete – qualification
            is still ongoing, so many spots remain open.
          </p>
        </div>

        {/* Stats widget */}
        <div
          className={`grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/10">
            <p className="text-4xl font-bold text-red-400">48</p>
            <p className="text-sm text-gray-300">Teams</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/10">
            <p className="text-4xl font-bold text-red-400">6</p>
            <p className="text-sm text-gray-300">Confederations</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/10">
            <p className="text-4xl font-bold text-red-400">104</p>
            <p className="text-sm text-gray-300">Matches</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/10">
            <p className="text-4xl font-bold text-red-400">16</p>
            <p className="text-sm text-gray-300">Host Cities</p>
          </div>
        </div>

        {/* Confederation Breakdown */}
        <div className="space-y-12">
          {confederations.map((conf, confIdx) => {
            const teams = getTeamsByConfederation(conf.name);
            // Add placeholder TBD cards to fill the slots
            const filledTeams = [...teams];
            while (filledTeams.length < conf.slots) {
              filledTeams.push({
                id: `tbd-${conf.name}-${filledTeams.length}`,
                name: "To Be Determined",
                flag: "🏳️",
                confederation: conf.name,
                qualified: false,
              });
            }

            return (
              <div
                key={conf.name}
                className={`transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${300 + confIdx * 150}ms` }}
              >
                {/* Confederation header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className={`h-10 w-2 rounded-full bg-gradient-to-b ${conf.color}`} />
                  <h2 className="text-3xl font-bold">{conf.name}</h2>
                  <span className="text-gray-400 text-lg">
                    {conf.slots} {conf.slots === 1 ? "slot" : "slots"}
                  </span>
                </div>

                {/* Team cards grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {filledTeams.map((team, idx) => (
                    <div
                      key={team.id}
                      className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-red-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                    >
                      <div className="text-4xl mb-2">{team.flag}</div>
                      <div className="font-semibold text-sm truncate" title={team.name}>
                        {team.name}
                      </div>
                      {team.qualified && (
                        <span className="inline-block mt-1 text-xs bg-green-500/20 text-green-300 px-2 py-0.5 rounded-full">
                          ✓ Qualified
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Group Stage Draw Widget (placeholder) */}
        <div
          className={`mt-20 p-8 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 transition-all duration-700 delay-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <span>🎲</span> Group Stage Draw Simulator
          </h3>
          <p className="text-gray-300 mb-6">
            The official draw will take place in 2025. Here's a preview of how the groups could look.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {["A", "B", "C", "D"].map((group) => (
              <div key={group} className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h4 className="text-red-400 font-bold mb-2">Group {group}</h4>
                <ul className="space-y-1 text-sm">
                  <li>🇺🇸 USA</li>
                  <li>🏴󠁧󠁢󠁥󠁮󠁧󠁿 England</li>
                  <li>🇸🇳 Senegal</li>
                  <li>🏳️ TBD</li>
                </ul>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-4">*Illustrative only – not the real draw.</p>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <button className="bg-red-500 hover:bg-red-600 px-8 py-4 rounded-full text-lg font-semibold transition transform hover:scale-105 hover:shadow-lg active:scale-95">
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

export default Team;