import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BookingSummary from "../../components/BookingSummary";
import MovieCard2 from "../../components/MovieCard2";
import Navbar from "../../components/NavBar";
import HeroCarousel from "./HeroCarousel";
import MovieDescription from "./MovieDescription";
import TheaterSeats from "./Seat";
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

  return (
    <div className="min-h-screen bg-base-400">
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

          <MovieCard2 />

          {/* <TrailersPlaying /> */}
          <TheaterSeats />
          <MovieDescription />
          <SeatBooking />
          <BookingSummary />
        </div>
      </div>
    </div>
  );
};

export default Home;
