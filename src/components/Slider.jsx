import { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function Slider() {
  const images = [
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
    "https://images.unsplash.com/photo-1511919884226-fd3cad34687c",
    "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d",
    "https://images.unsplash.com/photo-1493238792000-8113da705763",
  ];

  const [current, setCurrent] = useState(0);
  const intervalRef = useRef(null);

  // ✅ Auto slide
  useEffect(() => {
    startAutoSlide();
    return stopAutoSlide;
  }, []);

  const startAutoSlide = () => {
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  // ✅ Manual controls
  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div
      className="relative w-full h-[500px] overflow-hidden"
      onMouseEnter={stopAutoSlide}
      onMouseLeave={startAutoSlide}
    >
      {/* IMAGE */}
      <img
        src={images[current]}
        alt="Car Banner"
        loading="lazy"
        className="w-full h-full object-cover transition duration-700 ease-in-out"
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-green-400">
          Drive Your Dream Car
        </h1>

        <p className="text-white mt-4 text-base md:text-lg">
          Luxury • Comfort • Affordable
        </p>
      </div>

      {/* LEFT BUTTON */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 p-3 rounded-full text-white hover:bg-black"
      >
        <FaChevronLeft />
      </button>

      {/* RIGHT BUTTON */}
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 p-3 rounded-full text-white hover:bg-black"
      >
        <FaChevronRight />
      </button>

      {/* DOT INDICATORS */}
      <div className="absolute bottom-4 w-full flex justify-center gap-2">
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2 w-2 rounded-full cursor-pointer ${
              current === index ? "bg-green-400" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default Slider;
