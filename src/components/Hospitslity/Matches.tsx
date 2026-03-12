import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

type Match = {
  teams: string;
  flags: string;
  stadium: string;
  date: string;
  image: string;
  stage: string;
};

const matches: Match[] = [
  {
    teams: "Canada vs TBD",
    flags: "🇨🇦",
    stadium: "BC Place - Vancouver",
    date: "June 12, 2026",
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2",
    stage: "Group Stage",
  },
  {
    teams: "Australia vs TBD",
    flags: "🇦🇺",
    stadium: "SoFi Stadium - Los Angeles",
    date: "June 14, 2026",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc",
    stage: "Group Stage",
  },
  {
    teams: "Ghana vs Panama",
    flags: "🇬🇭 🇵🇦",
    stadium: "MetLife Stadium - New Jersey",
    date: "June 18, 2026",
    image: "https://images.unsplash.com/photo-1518604666860-9ed391f76460",
    stage: "Round of 32",
  },
  {
    teams: "Brazil vs Argentina",
    flags: "🇧🇷 🇦🇷",
    stadium: "AT&T Stadium - Dallas",
    date: "June 22, 2026",
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2",
    stage: "Quarter-finals",
  },
  {
    teams: "France vs England",
    flags: "🇫🇷 🏴",
    stadium: "Mercedes-Benz Stadium - Atlanta",
    date: "June 26, 2026",
    image: "https://images.unsplash.com/photo-1518604666860-9ed391f76460",
    stage: "Semi-finals",
  },
];

const tabs = [
  "Popular",
  "Group Stage",
  "Round of 32",
  "Round of 16",
  "Quarter-finals",
  "Semi-finals",
  "Final",
];

export default function SingleMatchesPage() {
  const [activeTab, setActiveTab] = useState("Popular");

  const filteredMatches =
    activeTab === "Popular"
      ? matches
      : matches.filter((match) => match.stage === activeTab);

  return (
    <div className="bg-[#06121c] text-white min-h-screen">

      {/* SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-20">

        {/* HEADER */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-14">

          <h1 className="text-5xl md:text-6xl font-extrabold">
            SINGLE <br /> MATCHES
          </h1>

          <div>
            <p className="text-gray-300 text-lg mb-6">
              See the beautiful game on its greatest stage at the match of your choice.
              Choose from 104 matches across 16 dynamic host cities and venues.
            </p>

            <div className="flex gap-4 flex-wrap">
              <button className="bg-teal-500 hover:bg-teal-600 px-7 py-3 rounded-full font-semibold text-lg transition">
                Explore All Matches
              </button>

              <button className="text-white hover:text-teal-400 font-semibold text-lg">
                View Schedule →
              </button>
            </div>
          </div>

        </div>

        {/* TABS */}
        <div className="flex gap-8 border-b border-gray-700 mb-10 overflow-x-auto">

          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-lg font-semibold whitespace-nowrap transition 
              ${
                activeTab === tab
                  ? "text-white border-b-2 border-red-500"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}

        </div>

        {/* MATCH SLIDER */}
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >

          {filteredMatches.map((match, index) => (

            <SwiperSlide key={index}>

              <div className=" rounded-xl overflow-hidden relative group shadow-xl">

                {/* IMAGE */}
                <img
                  src={match.image}
                  alt={match.teams}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-black/50"></div>

                {/* CONTENT */}
                <div className="relative h-full flex flex-col justify-end p-4">

                  <div className="text-2xl mb-1">
                    {match.flags}
                  </div>

                  <h3 className="text-lg font-bold">
                    {match.teams}
                  </h3>

                  <p className="text-gray-300 text-sm">
                    {match.date}
                  </p>

                  <p className="text-gray-400 text-sm">
                    {match.stadium}
                  </p>

                  <button className="mt-3 bg-red-500 hover:bg-red-600 text-sm py-1 rounded-md">
                    Tickets
                  </button>

                </div>

              </div>

            </SwiperSlide>

          ))}

        </Swiper>

      </section>

    </div>
  );
}