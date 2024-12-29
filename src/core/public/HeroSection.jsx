import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import React, { useState } from "react";
import Movie1 from "../../assets/images/four.jpeg";
import { Button } from "../../components/Button";

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const movies = [
    {
      title: "Inception",
      tagline: "Your mind is the scene of the crime",
      description:
        "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
      rating: "8.8",
      duration: "2h 28m",
      genre: "Sci-Fi",
    },
    {
      title: "The Dark Knight",
      tagline: "Why so serious?",
      description:
        "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
      rating: "9.0",
      duration: "2h 32m",
      genre: "Action",
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

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % movies.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + movies.length) % movies.length);
  };

  return (
    <div className="relative h-[80vh] overflow-hidden">
      {/* Carousel Container */}
      <div className="relative h-full">
        {movies.map((movie, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ${
              currentSlide === index
                ? "opacity-100"
                : "opacity-0 pointer-events-none"
            }`}
          >
            {/* Background Image with Gradient */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent z-10" />
              <img
                src={Movie1}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="relative z-20 h-full flex items-center">
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

                  {/* Buttons */}
                  <div className="flex gap-4">
                    <Button className="bg-red-500 hover:bg-red-600 text-white px-8">
                      Book Now
                    </Button>
                    <Button
                      variant="outline"
                      className="border-white text-white hover:bg-white/10"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Watch Trailer
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 text-white p-2 rounded-full bg-black/30 hover:bg-black/50 transition"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 text-white p-2 rounded-full bg-black/30 hover:bg-black/50 transition"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Carousel Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              currentSlide === index
                ? "w-8 bg-red-500"
                : "bg-white/50 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
