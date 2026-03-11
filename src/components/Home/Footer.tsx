import React from 'react';
import { FaTrophy, FaCalendarAlt } from 'react-icons/fa';

const Footer: React.FC = () => {
  const sponsors = [
    'Coca-Cola',
    'HYUNDAI',
    'Hisense',
    'QATAR AIRWAYS',
    'Lenovo',
    'VISA',
    'Qatar Airways',
    'Dove',
    'Verizon',
  ];

  const finalDate = new Date('2026-07-19');
  const today = new Date();
  const diffTime = finalDate.getTime() - today.getTime();
  const daysUntilFinal = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return (
    <footer className="bg-white text-gray-900 py-10 px-4 sm:px-6 md:px-12 border-t border-gray-200">
      <div className="max-w-7xl mx-auto">

        {/* Top Row */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-8">

          {/* Logo */}
          <div className="text-3xl sm:text-4xl md:text-6xl font-bold text-gray-900">
            FIFA
          </div>

          {/* Final Countdown Card */}
          <div className="w-full sm:w-auto">
            <div className="bg-gradient-to-r from-yellow-500 to-yellow-700 rounded-xl p-4 shadow-lg flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
              
              <FaTrophy className="text-3xl sm:text-4xl text-white" />

              <div>
                <div className="text-[10px] sm:text-xs uppercase tracking-wider text-yellow-100 flex items-center gap-1">
                  <FaCalendarAlt className="text-xs" />
                  World Cup 2026 Final
                </div>

                <div className="text-lg sm:text-xl font-bold text-white">
                  July 19, 2026
                </div>

                <div className="text-xs sm:text-sm text-yellow-100">
                  {daysUntilFinal} days to go
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Sponsors */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-8">
          {sponsors.map((sponsor) => (
            <div
              key={sponsor}
              className="bg-gray-100 rounded-lg p-3 text-center text-xs sm:text-sm font-medium hover:bg-gray-200 transition shadow-sm"
            >
              {sponsor}
            </div>
          ))}
        </div>

        {/* Legal */}
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs sm:text-sm text-gray-600 mb-6">
          <a href="#" className="hover:text-black transition">
            PRIVACY POLICY
          </a>
          <a href="#" className="hover:text-black transition">
            TERMS OF SERVICE
          </a>
          <a href="#" className="hover:text-black transition">
            MANAGE COOKIE PREFERENCES
          </a>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-xs sm:text-sm text-gray-500 gap-3">
          <div className="text-center sm:text-left">
            Copyright © 1994 - 2026 FIFA. All rights reserved.
          </div>

          <div className="flex flex-wrap justify-center sm:justify-end gap-3">
            <span>Hot days ahead</span>
            <span>8:34 PM</span>
            <span>3/6/2026</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;