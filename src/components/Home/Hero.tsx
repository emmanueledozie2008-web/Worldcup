import React, { useState, useEffect } from "react";

const slides = [
  {
    image:
      "https://digitalhub.fifa.com/transform/4e4717fc-7f87-4ea4-b989-7f5730ec94ae/General-Graphic-3840-x-2160-8?&io=transform:fill,aspectratio:1x1,width:1536&quality=75",
    title: "View the FIFA World Cup 2026™ match schedule",
    text: "World Cup 2026 will be the biggest and most exciting edition of the tournament to date as 48 teams from around the globe compete in 104.",
  },
  {
    image:
      "https://digitalhub.fifa.com/transform/c134204b-de6a-445d-a5b0-68b43f5eecb7/Paul-Breitner-celebrates-with-his-West-Germany-teammates-after-scoring-against-Chile-at-the-1974-FIFA-World-Cup?&io=transform:fill,aspectratio:1x1,width:1536&quality=75",
    title: "48 teams competing across North America",
    text: "For the first time, 48 teams will compete across USA, Canada and Mexico.",
  },
  {
    image:
      "https://digitalhub.fifa.com/transform/af068dce-7b46-4332-b3a1-4afb5d4d9915/Hyundai-Fifa_1x1_EN?focuspoint=0.48,0.14&io=transform:fill,aspectratio:1x1,width:1536&quality=75",
    title: "Be there with Hyundai",
    text: "Kids 5–12 can enter to put their art on a World Cup team bus and win tickets, flights, and a memorable match day.",
  },
  {
    image:
      "https://digitalhub.fifa.com/transform/efbff237-43dc-40d5-b53a-dc43a21956c7/FWC26_PA2_Article_Hero_Slider?&io=transform:fill,aspectratio:1x1,width:1536&quality=75",
    title: "FIFA World Cup 2026™ Official Hospitality",
    text: "Experience world-class hospitality at the world’s greatest sporting event.",
  },
];

const Hero: React.FC = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const slider = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(slider);
  }, []);

  return (
    <section className="relative bg-black text-white overflow-hidden">

      {/* SLIDER */}
      <div className="relative h-[420px] sm:h-[500px] md:h-[650px] w-full">

        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute w-full h-full transition-opacity duration-1000 ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Background Image */}
            <img
              src={slide.image}
              alt="World Cup"
              className="absolute w-full h-full object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60"></div>

            {/* CONTENT */}
            <div className="relative z-10 max-w-7xl mx-auto h-full flex items-center px-4 sm:px-6 md:px-12">

              <div className="max-w-md sm:max-w-lg">

                <span className="uppercase text-gray-300 tracking-widest text-[10px] sm:text-sm">
                  Need to know
                </span>

                <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mt-3 sm:mt-4 leading-tight">
                  {slide.title}
                </h1>

                <p className="text-gray-300 text-sm sm:text-base mt-3 sm:mt-4">
                  {slide.text}
                </p>

                <button className="mt-4 sm:mt-6 bg-white text-black px-5 py-2 sm:px-8 sm:py-3 text-sm sm:text-base rounded-full font-semibold hover:bg-gray-200 transition">
                  Read more
                </button>

              </div>
            </div>
          </div>
        ))}

      </div>

      {/* INDICATORS */}
      <div className="absolute bottom-6 sm:bottom-10 left-1/2 transform -translate-x-1/2 flex gap-2 sm:gap-3">
        {slides.map((_, i) => (
          <div
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full cursor-pointer transition ${
              i === current ? "bg-white scale-110" : "bg-gray-500"
            }`}
          />
        ))}
      </div>

    </section>
  );
};

export default Hero;