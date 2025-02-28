import { Menu, Search, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Logo from "/images/logo2.png";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // You should get this from your auth context/state
  const navigate = useNavigate();

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check if user is logged in on component mount
  useEffect(() => {
    const token = localStorage.getItem("token"); // Or however you store your auth token
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      // Remove authentication details
      localStorage.removeItem("token");
      localStorage.removeItem("role");

      // Show logout success toast
      toast.success("Logout successful!", {
        position: "top-right",
        autoClose: 3000,
      });

      // Redirect to login page after delay
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-colors duration-300 ${
        isScrolled ? "bg-neutral-900 shadow-md" : "bg-neutral-900"
      }`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Desktop Navigation */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center justify-center gap-2">
              <img src={Logo} alt="Logo" className="h-8 md:h-10" />
            </div>
            <nav className="hidden md:flex space-x-4">
              <button
                onClick={() => navigate("/")}
                className="text-white hover:text-orange-400 transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => navigate("/my-bookings")}
                className="text-white hover:text-orange-400 transition-colors"
              >
                My Bookings
              </button>
              <button
                onClick={() => navigate("/showtimes")}
                className="text-white hover:text-orange-400 transition-colors"
              >
                Showtimes
              </button>
            </nav>
          </div>

          {/* Desktop Search and Auth */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="bg-neutral-800 text-white placeholder-gray-400 rounded-lg py-2 px-4 pr-10 w-64 focus:outline-none focus:ring-2 focus:ring-red-600"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>

            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => navigate("/Login")}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
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
              <button
                onClick={() => {
                  navigate("/my-bookings");
                  setIsMenuOpen(false);
                }}
                className="text-white hover:text-orange-400 transition-colors"
              >
                My Bookings
              </button>
              <button className="text-white hover:text-orange-400 transition-colors">
                Showtimes
              </button>

              {/* Mobile Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-neutral-800 text-white placeholder-gray-400 rounded-lg py-2 px-4 pr-10 w-full focus:outline-none focus:ring-2 focus:ring-red-600"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              </div>

              {/* Mobile Auth Button */}
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors w-full"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={() => {
                    navigate("/Login");
                    setIsMenuOpen(false);
                  }}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors w-full"
                >
                  Login
                </button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
