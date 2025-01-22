import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MovieCard from "../../components/MovieCard";
import Navbar from "../../components/NavBar";
import HeroCarousel from "./HeroSection";
import MovieDescription from "./MovieDescription";
import TheaterSeats from "./Seat";
import TrailersPlaying from "./TrailerPlaying";
import SeatBooking from "./demoseat";
const Home = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // Adjust the scroll threshold as needed
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const movies = [
    {
      title: "Kraven The Hunter",
      releaseDate: "Wed Jan 01",
      languages: "Hindi,English",
      genre: "ACTION",
      rating: "A",
      imageUrl: "/images/movie1.jpg",
    },
    {
      title: "Mukkam Post Bombilwadi",
      releaseDate: "Wed Jan 01",
      languages: "Marathi",
      genre: "FANTASY",
      rating: "U",
      imageUrl: "/images/movie2.jpg",
    },
    {
      title: "Baby John",
      releaseDate: "New Release",
      languages: "Hindi",
      genre: "ACTION",
      rating: "UA 16+",
      imageUrl: "/images/moviee2.jpg",
    },
    {
      title: "Max",
      releaseDate: "New Release",
      languages: "Kannada",
      genre: "ACTION",
      rating: "UA 16+",
      imageUrl: "/images/moviee3.jpg",
    },
    {
      title: "Barroz",
      releaseDate: "New Release",
      languages: "Malayalam,Hindi",
      genre: "FANTASY",
      rating: "U",
      imageUrl: "/images/movie9.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-700">
      {/* <div className="min-h-screen bg-base-200">  */}
      <Navbar />

      <div className="pt-16">
        <HeroCarousel />

        {/* Quick Book */}
        <div className="container mx-auto px-4 py-6">
          <div className="flex space-x-4 mb-8">
            <select className="select select-bordered w-full max-w-xs">
              <option>Select Movie</option>
            </select>
            <select className="select select-bordered w-full max-w-xs">
              <option>Select Date</option>
            </select>
            <select className="select select-bordered w-full max-w-xs">
              <option>Select Cinema</option>
            </select>
            <select className="select select-bordered w-full max-w-xs">
              <option>Select Timing</option>
            </select>
            <button className="btn btn-warning bg-orange-400">Book</button>
          </div>

          <h1 className="text-2xl font-bold mb-6 ml-3">Now Showing</h1>
          {/* Movies Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {movies.map((movie, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Image Container */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={movie.imageUrl}
                    alt={movie.title}
                    className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
                </div>

                {/* Content Container */}
                <div className="p-3 space-y-2">
                  {/* Release Date Badge */}
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-1 text-xs font-semibold bg-yellow-100 text-yellow-700 rounded-full">
                      {movie.releaseDate}
                    </span>
                    <span className="px-2 py-1 text-xs font-semibold bg-purple-100 text-purple-700 rounded-full">
                      {movie.rating}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="font-bold text-gray-800 line-clamp-1 group-hover:text-yellow-600 transition-colors">
                    {movie.title}
                  </h2>

                  {/* Languages */}
                  <p className="text-xs text-gray-500">{movie.languages}</p>

                  {/* Genre Badge */}
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 text-xs border border-gray-300 rounded-full text-gray-600">
                      {movie.genre}
                    </span>
                  </div>

                  {/* Book Button */}
                  <button className="w-full py-2 mt-2 text-sm font-semibold text-white bg-orange-400 rounded-lg transition-all duration-300 hover:bg-orange-600 hover:shadow-md transform hover:-translate-y-0.5">
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
          <MovieCard />
          <TrailersPlaying />
          <TheaterSeats />
          <MovieDescription />
          <SeatBooking />
        </div>
      </div>
    </div>
  );
};

export default Home;
