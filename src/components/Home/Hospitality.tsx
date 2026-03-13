import React from 'react';
import { FaHotel, FaUtensils, FaChampagneGlasses } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const Hospitality: React.FC = () => {
  return (
    <section className="bg-gray-900 text-white py-10 px-4 sm:px-6 md:px-12">
      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

          {/* LEFT SIDE */}
          <div className="max-w-xl">

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 leading-tight">
              FIFA World Cup 2026™ Official Hospitality
            </h2>

            <p className="text-gray-300 text-sm sm:text-base md:text-lg mb-6">
              Get the ultimate FIFA World Cup 2026™ experience with hospitality packages offering
              luxurious comfort, first-class amenities and more to create memories of the beautiful
              game that will last a lifetime.
            </p>
            <Link to="/tickets">
            <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-5 sm:py-3 sm:px-8 rounded-lg transition duration-200 text-sm sm:text-base">
              Choose your package
            </button>
            </Link>
          </div>

          {/* RIGHT SIDE */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

            {/* Standard */}
            <div className="bg-gray-800 p-4 sm:p-5 rounded-lg text-center hover:bg-gray-700 transition">
              <FaHotel className="text-3xl sm:text-4xl text-red-500 mx-auto mb-3" />
              <h3 className="font-bold text-lg sm:text-xl mb-1">Standard</h3>
              <p className="text-gray-400 text-xs sm:text-sm">
                Comfortable seating & amenities
              </p>
              <span className="inline-block mt-3 text-red-400 font-semibold text-sm">
                from $999
              </span>
            </div>

            {/* Premium */}
            <div className="bg-gray-800 p-4 sm:p-5 rounded-lg text-center hover:bg-gray-700 transition">
              <FaUtensils className="text-3xl sm:text-4xl text-red-500 mx-auto mb-3" />
              <h3 className="font-bold text-lg sm:text-xl mb-1">Premium</h3>
              <p className="text-gray-400 text-xs sm:text-sm">
                Gourmet dining & exclusive lounges
              </p>
              <span className="inline-block mt-3 text-red-400 font-semibold text-sm">
                from $1,999
              </span>
            </div>

            {/* VIP */}
            <div className="bg-gray-800 p-4 sm:p-5 rounded-lg text-center hover:bg-gray-700 transition">
              <FaChampagneGlasses className="text-3xl sm:text-4xl text-red-500 mx-auto mb-3" />
              <h3 className="font-bold text-lg sm:text-xl mb-1">VIP</h3>
              <p className="text-gray-400 text-xs sm:text-sm">
                Luxury suites & personal concierge
              </p>
              <span className="inline-block mt-3 text-red-400 font-semibold text-sm">
                from $3,999
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Hospitality;