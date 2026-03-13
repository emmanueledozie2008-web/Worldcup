import React, { useState, useEffect } from "react";
import { FaBars, FaTimes, FaSearch, FaGlobe, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";


const TARGET_DATE = new Date("2026-06-08T00:00:00");

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const Navbar: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const mainNavItems = [
    { element: <Link to="/matches" className="hover:text-gray-400 transition">SCORES & FIXTURES</Link> },
    { element: <Link to="/standings" className="hover:text-gray-400 transition">STANDINGS</Link> },
    { element: <Link to="/teams" className="hover:text-gray-400 transition">TEAMS</Link> },
    { element: <Link to="/qualifiers" className="hover:text-gray-400 transition">QUALIFIERS</Link> },
    { element: <Link to="/hostCitiesPage" className="hover:text-gray-400 transition">HOST COUNTRIES AND CITIES</Link> },
    { element: <Link to="/tickets" className="hover:text-gray-400 transition">TICKETS</Link> },
    { element: <Link to="/hospitality" className="hover:text-gray-400 transition">HOSPITALITY</Link> },
  ];

  const sidebarNavItems = [
    { element: <Link to="/matches" className="hover:text-gray-400">SCORES & FIXTURES</Link> },
    { element: <Link to="/standings" className="hover:text-gray-400">STANDINGS</Link> },
    { element: <Link to="/teams" className="hover:text-gray-400">TEAMS</Link> },
    { element: <Link to="/qualifiers" className="hover:text-gray-400">QUALIFIERS</Link> },
    { element: <Link to="/hostCitiesPage" className="hover:text-gray-400">HOST COUNTRIES AND CITIES</Link> },
    { element: <Link to="/tickets" className="hover:text-gray-400">TICKETS</Link> },
    { element: <Link to="/hospitality" className="hover:text-gray-400">HOSPITALITY</Link> },
    { element: <Link to="/fan-hub" className="hover:text-gray-400">FAN HUB</Link> },
    { element: <Link to="/organisation" className="hover:text-gray-400">ORGANISATION</Link> },
  ];

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    const calculateTimeLeft = (): TimeLeft => {
      const now = new Date();
      const diff = TARGET_DATE.getTime() - now.getTime();

      if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const format = (n: number) => n.toString().padStart(2, "0");

  return (
    <>
      {/* HEADER */}
      <header className="bg-black text-white w-full z-50 relative">

        {/* TOP BAR */}
        <div className="flex justify-between items-center px-6 py-3 border-b border-gray-800">
          <h1 className="text-3xl font-bold tracking-wide">FIFA</h1>

          <div className="hidden lg:flex items-center gap-6 text-sm">
            <a href="/tickets" className="hover:text-gray-300">
              TICKETS & HOSPITALITY
            </a>
            <a href="#" className="hover:text-gray-300">
              FIFA+
            </a>
            <a href="#" className="hover:text-gray-300">
              FIFA STORE
            </a>
            <a href="#" className="hover:text-gray-300">
              INSIDE FIFA
            </a>
          </div>

          <button onClick={toggleSidebar} className="lg:hidden">
            <FaBars size={26} />
          </button>
        </div>

        {/* SECOND NAVBAR */}
        <div className="flex items-center justify-between px-6 py-4">

          {/* Tournament Logo */}
          <div className="flex items-center gap-4">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmG5QtviwHuCHz0Nb9NA1SnBow1ZVj6eRkQA&s"
              alt="World Cup 2026 Logo"
              className="h-12 w-auto"
            />
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex gap-8 text-sm font-medium">
  {mainNavItems.map((item, index) => (
    <div key={index}>{item.element}</div>
  ))}
</nav>

          {/* Icons */}
          <div className="hidden md:flex gap-6 text-lg">
            <FaSearch />
            <FaGlobe />
            <FaUser />
          </div>
        </div>
      </header>

      {/* COUNTDOWN BAR */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-500 text-white py-6 px-8 flex flex-col md:flex-row items-center justify-between gap-6">

        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmG5QtviwHuCHz0Nb9NA1SnBow1ZVj6eRkQA&s"
          alt="World Cup 2026 Logo"
          className="h-14 w-auto"
        />

        <div className="flex gap-10 text-center">

          <div>
            <div className="text-3xl font-bold">{format(timeLeft.days)}</div>
            <div className="text-sm">days</div>
          </div>

          <div>
            <div className="text-3xl font-bold">{format(timeLeft.hours)}</div>
            <div className="text-sm">hours</div>
          </div>

          <div>
            <div className="text-3xl font-bold">{format(timeLeft.minutes)}</div>
            <div className="text-sm">mins</div>
          </div>

          <div>
            <div className="text-3xl font-bold">{format(timeLeft.seconds)}</div>
            <div className="text-sm">secs</div>
          </div>

        </div>
        <Link to="/standings">
        <button className="bg-black px-6 py-3 rounded-full font-semibold hover:bg-gray-900 transition">
          View matches
        </button>
        </Link>
      </section>

      {/* OVERLAY */}
      {sidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed top-0 left-0 h-full w-80 bg-black text-white z-50 transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6">

          <button onClick={toggleSidebar} className="mb-10">
            <FaTimes size={26} />
          </button>

          <ul className="space-y-6 text-lg">
  {sidebarNavItems.map((item, index) => (
    <li key={index}>{item.element}</li>
  ))}
</ul>

        </div>
      </aside>
    </>
  );
};

export default Navbar;