import React, { useEffect, useState } from "react";

// Types for countdown
interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const Hero: React.FC = () => {
  // Target date for the countdown
  const targetDate = new Date("June 11, 2026 00:00:00").getTime();

  const calculateTimeLeft = (): TimeLeft => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleImageError = (imgName: string) => {
    setImageErrors((prev) => ({ ...prev, [imgName]: true }));
  };

  const floatingImages = [
    { name: "player1", src: "data:image/jpeg;base64,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", className: "top-32 left-10 w-44" },
    { name: "player2", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYpwi_JbpCpZ8NgZuW75jAqLlXLrpwsldB_Q&s", className: "top-32 right-10 w-44" },
    { name: "fans", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJThKI_SwUDGN3huR4foOxSYezny5B2WuGDQ&s", className: "bottom-20 left-40 w-48" },
    { name: "player3", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjE8dvlJo89XBaUsTQ2UTGQtgTKW1YpOymvw&s", className: "bottom-20 right-40 w-48" },
  ];

  // List of host cities
  const cities = [
    "ATLANTA", "BOSTON", "DALLAS", "HOUSTON", "KANSAS CITY", "LOS ANGELES"
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#0b0f3b] via-[#1b1f6b] to-[#0b0f3b] text-white font-['Oswald',sans-serif]">
      {/* Floating Images with error handling */}
      {floatingImages.map((img) => (
        <img
          key={img.name}
          src={img.src}
          alt={`Floating ${img.name}`}
          className={`absolute rounded-2xl shadow-xl transition-opacity ${
            imageErrors[img.name] ? "hidden" : "block"
          } ${img.className} hidden lg:block`}
          onError={() => handleImageError(img.name)}
        />
      ))}

      {/* Hero Content */}
      <div className="mx-auto max-w-6xl px-6 pt-40 text-center">
        {/* Countdown */}
        <div className="flex justify-center gap-10 mb-10 flex-wrap">
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div key={unit}>
              <p className="text-5xl font-bold">
                {String(value).padStart(2, "0")}
              </p>
              <span className="text-gray-300 capitalize">{unit}</span>
            </div>
          ))}
        </div>

        {/* Subtitle */}
        <p className="uppercase tracking-[0.35em] text-sm text-gray-300">
          GET CLOSER THAN EVER TO
        </p>

        {/* Title */}
        <h1 className="mt-4 text-6xl md:text-8xl font-bold">
          FIFA WORLD CUP 2026™
        </h1>

        {/* Description */}
        <p className="mt-8 text-lg text-gray-200 max-w-3xl mx-auto leading-relaxed">
          FIFA World Cup 2026™, featuring a record 104 matches in 16 cities
          across Canada, Mexico, and the U.S., will be the ultimate celebration
          of the beautiful game.
        </p>

        <p className="mt-4 text-lg text-gray-200 max-w-3xl mx-auto leading-relaxed">
          Experience the best of it all with official hospitality packages
          featuring premium tickets, food & beverage, entertainment, and more.
          Now available across all three host nations.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex justify-center gap-6 flex-wrap">
          <button className="bg-red-500 hover:bg-red-600 px-8 py-4 rounded-full text-lg font-semibold transition">
            Browse Matches
          </button>

          <button className="border border-white hover:bg-white hover:text-black px-8 py-4 rounded-full text-lg font-semibold transition">
            Browse Suites
          </button>
        </div>
      </div>

      {/* NEW: Browse by Location Section */}
      <div className="mx-auto max-w-6xl px-6 py-20 text-white">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left column: cities list */}
          <div>
            <h2 className="uppercase tracking-[0.35em] text-sm text-gray-300 mb-6">
              BROWSE BY LOCATION
            </h2>
            <ul className="space-y-3">
              {cities.map((city) => (
                <li key={city}>
                  <button className="text-2xl md:text-3xl font-bold hover:text-red-500 transition-colors duration-200 text-left">
                    {city}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Right column: description */}
          <div className="text-gray-200 text-lg leading-relaxed space-y-4">
            <p>
              Lock in guaranteed tickets and level up your experience. With the matchups revealed, the biggest stage in sports is set. And the biggest stage deserves matchday elevated.
            </p>
            <p>
              Secure your place now at the greatest FIFA World Cup™ in history with ticket-inclusive hospitality packages from On Location, Official Hospitality Provider of FIFA World Cup 2026™.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;