import React from "react";

const VideoHero: React.FC = () => {
  return (
    <section className="relative w-full h-[500px] overflow-hidden bg-black">
      
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/hero-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Center Text */}
      <div className="relative z-10 flex items-center justify-center h-full text-center px-4">
        <h1 className="text-white text-5xl md:text-7xl font-extrabold tracking-widest">
          WORLD CUP 2026
        </h1>
      </div>

    </section>
  );
};

export default VideoHero;