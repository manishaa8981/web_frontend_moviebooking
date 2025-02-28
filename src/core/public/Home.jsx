import React from "react";
import ComingSoon from "../../components/ComingSoonmovies";
import Footer from "../../components/Footer";
import MovieCard from "../../components/MovieCard";
import Navbar from "../../components/NavBar";
import MovieCarousel from "./MovieCarousel";

const Home = () => {
  return (
    // <div className="min-h-screen bg-base-400">
    <div className="min-h-screen bg-neutral-900">
      <Navbar />
      <div className="pt-16">
        <MovieCarousel />
        <div className="container mx-auto px-4 py-6">
          <MovieCard />
          <ComingSoon />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Home;
