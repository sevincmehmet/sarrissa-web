import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconChevronRight, IconChevronLeft } from "@tabler/icons-react";
//import heroVideos from "../assets/videos/heroVideos";

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
};

const HeroVideo = () => {
  const [[currentIndex, direction], setIndex] = useState([0, 0]);
  const heroVideos = [];
  const paginate = (newIndex) => {
    if (newIndex === currentIndex) return;
    const dir = newIndex > currentIndex ? 1 : -1;
    setIndex([newIndex, dir]);
  };

  const next = () => {
    paginate((currentIndex + 1) % heroVideos.length);
  };

  const prev = () => {
    paginate((currentIndex - 1 + heroVideos.length) % heroVideos.length);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black select-none">
      <AnimatePresence custom={direction} mode="wait">
        <motion.video
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.6 }}
          src={heroVideos[currentIndex]}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* Sol ok */}
      <button
        onClick={prev}
        aria-label="Previous video"
        className="absolute top-1/2 h-screen left-4 -translate-y-1/2 opacity-30 hover:opacity-100 rounded-full p-2 z-20 cursor-pointer"
      >
        <IconChevronLeft size={36} stroke={2} color="white" />
      </button>

      {/* Sağ ok */}
      <button
        onClick={next}
        aria-label="Next video"
        className="absolute top-1/2 h-screen right-4 -translate-y-1/2 opacity-30 hover:opacity-100 rounded-full p-2 z-20 cursor-pointer"
      >
        <IconChevronRight size={36} stroke={2} color="white" />
      </button>

      {/* Alt orta dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3">
        {heroVideos.map((_, idx) => (
          <button
            key={idx}
            onClick={() => paginate(idx)}
            className={`w-10 h-1 transition-all duration-300 shadow-lg hover:bg-red-400 cursor-pointer ${
              idx === currentIndex ? "bg-rose-400 w-14 " : "bg-white/40"
            }`}
            aria-label={`Go to video ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroVideo;
