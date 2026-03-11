import React from "react";
import { Link } from "react-router-dom";

const stories = [
  {
    country: "Morocco",
    title: "Ouahbi replaces Regragui as Morocco coach",
    image: "https://digitalhub.fifa.com/transform/2c1e25be-f831-4435-866b-52df98b38c43/Mohamed-Ouahbi-Head-Coach-of-Morocco-celebrates-with-winner-s-medal-following-his-side-s-victory-in-the-FIFA-U-20-World-Cup-Chile-2025-final-match-between-Argentina-and-Morocco-at-Estadio-Nacional-Julio-Martinez-Pradanos-on-October-19-2025-in-Santiago-Chile?focuspoint=0.55,0.32&io=transform:fill,aspectratio:4x3,width:480&quality=75",
  },
  {
    country: "New Caledonia",
    title: "Fulgini: New Caledonia has nothing to lose",
    image: "https://digitalhub.fifa.com/transform/40f86567-a6a7-4e3d-a3cd-bc57a9711c66/GettyImages-1908155717?&io=transform:fill,aspectratio:4x3,width:480&quality=75",
  },
  {
    country: "Germany",
    title: "Nagelsmann lifts lid on Germany squad",
    image: "https://digitalhub.fifa.com/transform/c949eeb5-4201-4996-898a-2ea423a666cc/Julian-Nagelsmann?focuspoint=0.57,0.36&io=transform:fill,aspectratio:4x3,width:480&quality=75",
  },
  {
    country: "suriname",
    title: "Montnor; i'm 100 per cent sure suriname will qualify",
    image: "https://digitalhub.fifa.com/transform/162adb72-a6af-4699-b455-dbb77979b6a3/Jaden-Montnor-Suriname-2?focuspoint=0.53,0.14&io=transform:fill,aspectratio:4x3,width:480&quality=75",
  },
  {
    country: "England",
    title: "26 superstars: Hary kane",
    image: "https://digitalhub.fifa.com/transform/6dc9f252-8b09-4e33-8fad-aa3f9473e44c/GettyImages-2161532093?focuspoint=0.54,0.02&io=transform:fill,aspectratio:4x3,width:480&quality=75",
  },
  {
    country: "FIFA world Qatar 2022",
    title: "world cup wonder goals:pombo gets tite pigeon dancing",
    image: "https://digitalhub.fifa.com/transform/78257bbb-d0f3-42c3-a2ac-3531e6db0ed8/Brazil-v-South-Korea-Round-of-16-FIFA-World-Cup-Qatar-2022?focuspoint=0.49,0.34&io=transform:fill,aspectratio:4x3,width:480&quality=75",
  },
  {
    country: "Brazil",
    title: "Andrey Santos: My biggest dream is to play in a World Cup",
    image: "https://digitalhub.fifa.com/transform/81af1bb6-cf4b-4d6a-9027-d6c8062c6c92/Andrey-Santos-of-Brazil-on-September-4-2025?focuspoint=0.49,0.25&io=transform:fill,aspectratio:4x3,width:960&quality=75",
  },
  {
    country: "Argentina",
    title: "Argentina fans ready for the next challenge",
    image: "https://images.unsplash.com/photo-1505842465776-3d90f6163101?w=300",
  },
];

const New: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Top stories</h2>
        <button className="text-sm text-gray-600 hover:text-black">
          See all →
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* LEFT FEATURED STORY */}
        <div className="flex-1 relative rounded-xl overflow-hidden">
          <img
            src="https://digitalhub.fifa.com/transform/65459399-3a5d-4b28-9a2b-7aaca595d8f6/Javier-Aguirre-on-the-sideline-at-the-2025-Gold-Cup?&io=transform:fill,aspectratio:4x3,width:960&quality=75"
            alt="featured"
            className="w-full h-[420px] object-cover"
          />

          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
            <Link to="https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/articles/javier-aguirre-mexico-journey" className="text-sm mb-1 hover:underline">
            <p className="text-sm mb-1">mexico</p>
            </Link>
            
            <h4 className="text-2xl font-bold">
              Aguirre's World Cup journey with Mexico
            </h4>
            <h3 className="text-1xl font-semibold">
              With experience as a player and coach, Javier Aguirre is preparing
              for a new chapter at the helm of Mexico ahead of the
            </h3>
          </div>
        </div>

        {/* RIGHT SCROLL STORIES */}
        <div className="md:w-[340px] bg-gray-50 rounded-xl p-4 border">
          <div className="h-[420px] overflow-y-auto pr-2 space-y-4">
            {stories.map((story, index) => (
              <div
                key={index}
                className="flex gap-3 bg-white p-3 rounded-lg hover:bg-gray-100 cursor-pointer transition"
              >
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-20 h-16 object-cover rounded-md"
                />

                <div>
                  <p className="text-xs text-gray-500">{story.country}</p>

                  <p className="text-sm font-semibold leading-tight">
                    {story.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
