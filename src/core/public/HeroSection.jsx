import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useRef } from "react";
import Slider from "react-slick";
import Movie2 from "/images/movie2.jpg";
import Movie1 from "/images/movie22.jpg";
const HeroCarousel = () => {
  const sliderRef = useRef(null);

  const movies = [
    {
      title: "Inception",
      tagline: "Your mind is the scene of the crime",
      description:
        "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
      rating: "8.8",
      duration: "2h 28m",
      genre: "Sci-Fi",
      // imageUrl: "/images/movie2.jpg",
    },
    {
      title: "The Dark Knight",
      tagline: "Why so serious?",
      description:
        "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
      rating: "9.0",
      duration: "2h 32m",
      genre: "Action",
      // imageUrl: "/images/movie22.jpg",
    },
    {
      title: "Interstellar",
      tagline: "Mankind was born on Earth. It was never meant to die here.",
      description:
        "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
      rating: "8.6",
      duration: "2h 49m",
      genre: "Adventure",
    },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false, // Disable built-in arrows
  };

  const handlePrev = () => sliderRef.current.slickPrev();
  const handleNext = () => sliderRef.current.slickNext();

  return (
    <div className="relative h-[40vh] overflow-hidden">
      {/* Carousel Container */}
      <Slider {...sliderSettings} ref={sliderRef} className="relative h-full">
        {movies.map((movie, index) => (
          <div key={index} className="relative h-full">
            {/* Background Image with Gradient */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent " />
              <img
                src={(Movie1, Movie2)}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="relative  h-full flex items-center">
              <div className="container mx-auto px-4">
                <div className="max-w-2xl">
                  {/* Movie Info */}
                  <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
                    {movie.title}
                  </h1>
                  <p className="text-xl text-gray-300 italic mb-4">
                    {movie.tagline}
                  </p>
                  <div className="flex items-center gap-4 text-gray-300 mb-6">
                    <span className="flex items-center">⭐ {movie.rating}</span>
                    <span>{movie.duration}</span>
                    <span>{movie.genre}</span>
                  </div>
                  <p className="text-gray-300 mb-8 line-clamp-3">
                    {movie.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-2 rounded-full bg-black/30 hover:bg-black/50 transition"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2  text-white p-2 rounded-full bg-black/30 hover:bg-black/50 transition"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};

export default HeroCarousel;
