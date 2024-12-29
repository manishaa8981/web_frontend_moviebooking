import { Menu, Search, X } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/images/logo2.png";
import { Button } from "../../components/Button";
import HeroCarousel from "./HeroSection";

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const navigate = useNavigate();

  const handleSignupClick = () => {
    navigate("/login");
  };

  const movies = [
    {
      title: "Inception",
      rating: "8.8",
      genre: "Sci-Fi",
      duration: "2h 28m",
    },
    {
      title: "The Dark Knight",
      rating: "9.0",
      genre: "Action",
      duration: "2h 32m",
    },
    {
      title: "Interstellar",
      rating: "8.6",
      genre: "Adventure",
      duration: "2h 49m",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Background Image with Overlay */}
      <div className="fixed inset-0 z-0 bg-gray-900">
        <div className="absolute inset-0 bg-black/50" /> {/* Dark overlay */}
      </div>

      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-start">
              {/* <Film className="h-8 w-8 text-red-500" /> */}
              <img src={Logo} alt="Logo" className=" h-10  shadow-lg" />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-white hover:text-red-500 transition">
                Now Showing
              </a>
              <a href="#" className="text-white hover:text-red-500 transition">
                Coming Soon
              </a>
              <a href="#" className="text-white hover:text-red-500 transition">
                Cinemas
              </a>
              <Button className="bg-red-500 hover:bg-red-600">Sign In</Button>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a
                href="#"
                className="block px-3 py-2 text-white hover:bg-red-500/20 rounded-lg"
              >
                Now Showing
              </a>
              <a
                href="#"
                className="block px-3 py-2 text-white hover:bg-red-500/20 rounded-lg"
              >
                Coming Soon
              </a>
              <a
                href="#"
                className="block px-3 py-2 text-white hover:bg-red-500/20 rounded-lg"
              >
                Cinemas
              </a>
              <Button
                onClick={handleSignupClick}
                className="w-full bg-red-500 hover:bg-red-600 mt-4"
              >
                Sign In
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <HeroCarousel />

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <input
              type="text"
              placeholder="Search for movies..."
              className="w-full px-6 py-4 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 focus:outline-none focus:border-red-500 pl-12"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Now Showing Section */}
        <div className="max-w-7xl mx-auto mt-20">
          <h2 className="text-2xl font-bold text-white mb-8">Now Showing</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {movies.map((movie, index) => (
              <div
                key={index}
                className="bg-black/30 backdrop-blur-md rounded-xl overflow-hidden hover:transform hover:scale-105 transition duration-300"
              >
                <img
                  src={`/api/placeholder/400/225`}
                  alt={movie.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {movie.title}
                  </h3>
                  <div className="flex items-center justify-between text-gray-300 text-sm mb-4">
                    <span>⭐ {movie.rating}</span>
                    <span>{movie.genre}</span>
                    <span>{movie.duration}</span>
                  </div>
                  <Button className="w-full bg-red-500 hover:bg-red-600">
                    Book Now
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
