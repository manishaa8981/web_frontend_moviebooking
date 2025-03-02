import axios from "axios";
import { Menu, Search, User, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "/images/logo2.png";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userImage, setUserImage] = useState(null);
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();

  // ✅ Fetch Movies for Search
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://localhost:4011/api/movie");
        setMovies(response.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchMovies();
  }, []);

  // ✅ Filter Movies Based on Search Query
  useEffect(() => {
    if (searchQuery) {
      const results = movies.filter(
        (movie) =>
          movie.movie_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          movie.genre.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredMovies(results);
    } else {
      setFilteredMovies([]);
    }
  }, [searchQuery, movies]);

  // ✅ Fetch User Profile After Login
  useEffect(() => {
    const token = localStorage.getItem("token");
    const customerId = localStorage.getItem("customerId");

    if (token && customerId) {
      setIsLoggedIn(true); // ✅ Properly set login state

      axios
        .get(`http://localhost:4011/api/customer/${customerId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setUserImage(res.data.image);
        })
        .catch((err) => {
          console.error("Error fetching profile:", err);
          setIsLoggedIn(false);
        });
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // ✅ Ensure State Updates After Profile Update
  useEffect(() => {
    const handleProfileUpdate = () => {
      const updatedImage = localStorage.getItem("profileImage");
      if (updatedImage) setUserImage(updatedImage);
    };

    window.addEventListener("profileImageUpdated", handleProfileUpdate);
    return () =>
      window.removeEventListener("profileImageUpdated", handleProfileUpdate);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-colors duration-300 ${
        isScrolled ? "bg-neutral-900 shadow-md" : "bg-neutral-900"
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* 🔵 Logo & Navigation */}
        <div className="flex items-center space-x-6">
          <img src={Logo} alt="Logo" className="h-8 md:h-10" />
          <nav className="hidden md:flex space-x-4">
            <button
              onClick={() => navigate("/")}
              className="text-white hover:text-orange-400 transition-colors"
            >
              Home
            </button>
            {isLoggedIn && (
              <button
                onClick={() => navigate("/my-bookings")}
                className="text-white hover:text-orange-400 transition-colors"
              >
                My Bookings
              </button>
            )}
            <button
              onClick={() => navigate("/showtimes")}
              className="text-white hover:text-orange-400 transition-colors"
            >
              Schedules
            </button>
          </nav>
        </div>

        {/* 🔵 Search Bar & User Profile */}
        <div className="relative flex items-center space-x-4">
          {/* Search Toggle Button */}
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="text-white"
          >
            {!showSearch ? <Search size={24} /> : <X size={24} />}
          </button>

          {/* 🔵 Search Bar Dropdown */}
          {showSearch && (
            <div className=" top-1 right-1 bg-neutral-900  w-60 rounded-lg shadow-lg z-50">
              <input
                type="text"
                placeholder="Search for movies..."
                className="w-full p-2 rounded-md bg-neutral-700 text-white focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {/* Display Search Results */}
              {filteredMovies.length > 0 && (
                <div className="mt-2 bg-neutral-800 rounded-lg p-2 max-h-48 overflow-y-auto">
                  {filteredMovies.map((movie) => (
                    <div
                      key={movie._id}
                      onClick={() => {
                        navigate(`/movie/${movie._id}`);
                        setShowSearch(false);
                      }}
                      className="p-2 text-white cursor-pointer hover:bg-neutral-700 rounded-md"
                    >
                      {movie.movie_name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Profile or Login Button */}
          {isLoggedIn ? (
            <button
              onClick={() => navigate("/profile")}
              className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-orange-500"
            >
              {userImage ? (
                <img
                  src={`http://localhost:4011${userImage}`}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-8 h-8 text-white" />
              )}
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Login
            </button>
          )}
        </div>

        {/* 🔵 Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* 🔵 Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 pb-4">
          <nav className="flex flex-col space-y-4">
            <button
              onClick={() => {
                navigate("/");
                setIsMenuOpen(false);
              }}
              className="text-white hover:text-orange-400 transition-colors"
            >
              Home
            </button>
            {isLoggedIn && (
              <button
                onClick={() => {
                  navigate("/my-bookings");
                  setIsMenuOpen(false);
                }}
                className="text-white hover:text-orange-400 transition-colors"
              >
                My Bookings
              </button>
            )}
            <button
              onClick={() => navigate("/showtimes")}
              className="text-white hover:text-orange-400 transition-colors"
            >
              Showtimes
            </button>

            <button
              onClick={() => navigate("/login")}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors w-full"
            >
              Login
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
