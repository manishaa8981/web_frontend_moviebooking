import React, { useEffect } from "react";
import ComingSoon from "../../components/ComingSoonmovies";
import MovieCard from "../../components/MovieCard";
import Navbar from "../../components/NavBar";
import MovieCarousel from "./MovieCarousel";

const Home = () => {
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // Adjust the scroll threshold as needed
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    // <div className="min-h-screen bg-base-400">
    <div className="min-h-screen bg-neutral-900">
      <Navbar />
      <div className="pt-16">
        <MovieCarousel />
        <div className="container mx-auto px-4 py-6">
          <MovieCard />
          <ComingSoon />
        </div>
      </div>
    </div>
  );
};

export default Home;
