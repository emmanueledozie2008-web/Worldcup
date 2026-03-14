import React from "react";
import myvideo from "../../assets/WhatsApp Video 2026-03-13 at 11.11.25 PM.mp4";

const VideoHero: React.FC = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">

      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={myvideo}
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/90"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">

        <h1 className="text-white text-5xl md:text-8xl font-extrabold tracking-widest drop-shadow-lg">
          WORLD CUP 2026
        </h1>

        <p className="text-gray-200 mt-6 text-lg md:text-2xl max-w-3xl">
          Experience the thrill of football like never before.  
          Join millions of fans around the world for the biggest sporting event.
        </p>

        <div className="mt-10 flex gap-6">
          <button className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-8 py-4 rounded-lg transition duration-300 text-lg">
            Get Tickets
          </button>

          <button className="border border-white text-white hover:bg-white hover:text-black font-semibold px-8 py-4 rounded-lg transition duration-300 text-lg">
            Learn More
          </button>
        </div>

      </div>

    </section>
  );
};

export default VideoHero;