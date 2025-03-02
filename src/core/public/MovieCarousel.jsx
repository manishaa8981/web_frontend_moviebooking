import { Calendar, ChevronLeft, ChevronRight, Clock, Star } from "lucide-react";
import React, { useEffect, useState } from "react";

const MovieCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Sample movie data - replace with your actual data
  const movies = [
    {
      id: 1,
      title: "Bhool Bhuliya 3",
      description:
        "A horror-comedy film where a conman posing as an exorcist, named Ruhaan, is called to a haunted palace believed to be tormented by the vengeful spirit of a dancer named Manjulika.",
      poster:
        "https://i.ytimg.com/vi/kN-ScVqz0wU/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLBoIH3PzxWTiyLEaMTSkMglTg5X5g",
      rating: 8.8,
      duration: "2h 28min",
      releaseYear: "2024",
      genre: "Horror, Comedy",
    },
    {
      id: 2,
      title: "Chavva",
      description:
        "Chhaava is a 2025 Indian historical action film. It tells the story of Chhatrapati Sambhaji Maharaj, the second ruler of the Maratha Empire. The film stars Vicky Kaushal as Sambhaji, and was released in theaters on February 14, 2025",
      poster:
        "https://images.moneycontrol.com/static-mcnews/2025/01/20250117063542_Chhava.jpg?impolicy=website&width=770&height=431",
      rating: 9.0,
      duration: "2h 32min",
      releaseYear: "2025",
      genre: "Action, Crime, Hisstory",
    },
    {
      id: 3,
      title: "Dhoom Dhaam",
      description:
        "Dhoom Dhaam is no rom-com but a romantic thriller and crime drama with a twist. It is also a humor-laden look at what happens with arranged marriages in which couples really get to know each other only after their wedding, slowly and steadily, with surprises, pleasant or otherwise, coming up in the process!",
      poster:
        "https://www.koimoi.com/wp-content/new-galleries/2025/02/dhoom-dhaam-movie-review-out-02.jpg",
      rating: 8.6,
      duration: "2h 49min",
      releaseYear: "2025",
      genre: " Drama",
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === movies.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? movies.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        nextSlide();
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  return (
    <div className="relative w-full h-[500px] bg-gray-900">
      {/* Main Carousel */}
      <div className="relative h-full overflow-hidden">
        {movies.map((movie, index) => (
          <div
            key={movie.id}
            className={`absolute w-full h-full transition-transform duration-500 ease-in-out`}
            style={{
              transform: `translateX(${(index - currentIndex) * 100}%)`,
            }}
          >
            {/* Background Image with Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent z-10" />
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full h-full object-cover"
            />

            {/* Movie Info */}
            <div className="absolute bottom-0 left-0 right-0 p-8 z-20 bg-gradient-to-t from-black/90 to-transparent">
              <div className="container mx-auto">
                <h2 className="text-4xl font-bold text-white mb-4">
                  {movie.title}
                </h2>
                <p className="text-gray-300 mb-4 max-w-2xl line-clamp-2">
                  {movie.description}
                </p>

                <div className="flex items-center gap-6 text-white mb-4">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-400" />
                    <span>{movie.rating}/10</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span>{movie.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    <span>{movie.releaseYear}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="btn btn-primary bg-red-600 border-none ">
                    Book Now
                  </button>
                  <button className="btn btn-outline btn-ghost text-white rounded-lg">
                    Watch Trailer
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 btn btn-circle btn-ghost text-white z-30"
        onClick={prevSlide}
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 btn btn-circle btn-ghost text-white z-30"
        onClick={nextSlide}
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {movies.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentIndex === index ? "bg-white scale-125" : "bg-white/50"
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>

      {/* Auto Play Toggle */}
      <button
        className="absolute top-4 right-4 btn btn-sm btn-ghost text-white z-30"
        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
      >
        {isAutoPlaying ? "Pause" : "Play"}
      </button>
    </div>
  );
};

export default MovieCarousel;
