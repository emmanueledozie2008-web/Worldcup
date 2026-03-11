import React from "react";

const Host: React.FC = () => {
  const cities = [
    { name: "Atlanta", color: "bg-cyan-500" },
    { name: "Boston", color: "bg-green-700" },
    { name: "Dallas", color: "bg-teal-800" },
    { name: "Guadalajara", color: "bg-pink-600" },
    { name: "Houston", color: "bg-blue-500" },
    { name: "Kansas City", color: "bg-red-600" },
    { name: "Los Angeles", color: "bg-red-400" },
    { name: "Mexico City", color: "bg-purple-600" },
  ];

  return (
    <section className="bg-gray-100 py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">

        {/* Title */}
        <h2 className="text-4xl font-semibold mb-8 text-gray-800">
          Host Cities
        </h2>

        {/* Cities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {cities.map((city) => (
            <div
              key={city.name}
              className={`${city.color} rounded-2xl h-40 flex items-center justify-center text-white text-2xl font-bold shadow-md hover:scale-105 transition`}
            >
              {city.name}
            </div>
          ))}
        </div>

        {/* See all cities */}
        <div className="text-center mt-6">
          <a
            href="#"
            className="text-black font-semibold underline hover:text-gray-600"
          >
            See all cities
          </a>
        </div>

      </div>
    </section>
  );
};

export default Host;