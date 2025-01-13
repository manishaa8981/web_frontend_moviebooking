import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TrailersPage from "./MovieTrailersSection";
import Logo from "/images/logo2.png";
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

  const formats = [
    { id: "imax", image: "/images/movie11.jpg", alt: "IMAX" },
    { id: "4dx", image: "/images/movie1.jpeg", alt: "4DX" },
    { id: "mx4d", image: "/images/movie1.jpeg", alt: "MX4D" },
    { id: "screenx", image: "/images/movie1.jpeg", alt: "SCREEN X" },
    { id: "playhouse", image: "/images/movie1.jpeg", alt: "PLAYHOUSE" },
    { id: "laser", image: "/images/movie1.jpeg", alt: "LASER" },
  ];

  return (
    <div className="min-h-screen bg-base-200">
      {/* Header */}
      <header
        className={`fixed top-0 w-full z-50 transition-colors duration-300 ${
          isScrolled
            ? "bg-white text-black shadow-md"
            : "bg-blue-950 text-white"
        }`}
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center justify-center gap-2 mb-4">
                <img src={Logo} alt="Logo" className=" h-10 " />
              </div>
              <nav className="hidden md:flex space-x-4">
                <button className="btn btn-ghost">Home</button>
                <button className="btn btn-ghost">Showtimings</button>
                <button className="btn btn-ghost">Cinemas</button>
                <button className="btn btn-ghost">Offers</button>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className={`input input-bordered w-64 ${
                    isScrolled ? "bg-gray-200" : "bg-gray-400 text-white"
                  }`}
                />
                <Search
                  className={`absolute right-3 top-3 h-4 w-10 ${
                    isScrolled ? "text-gray-300" : "text-gray-100"
                  }`}
                />
              </div>
              <button
                className="btn  bg-orange-400  border-none"
                onClick={() => navigate("/Login")} // Navigate to Login Page
                // className={`btn  w-25
                //   ${
                //   isScrolled ? "btn" : "bg-orange-400 text-white border-none"
                // }`
                // }
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="pt-16">
        {/* Gift Card Banner */}

        <div className="border-b-2  p-8">
          <div className="container mx-auto flex items-center justify-between">
            <img src="/images/moviee3.jpg" alt="Gift Card" className="w-64" />
            <div className="max-w-2xl">
              <h2 className="text-4xl font-bold text-red-600 mb-4">
                IMPORTANT UPDATE
              </h2>
              <p className="text-xl font-semibold mb-2">
                YOU CAN NOW REDEEM YOUR GIFT CARDS ONLINE AND PHYSICALLY AT
                CINEMAS.
              </p>
              <p className="text-lg mb-2">
                ONLINE PURCHASE WILL RESUME SHORTLY.
              </p>
              <p className="text-base">
                FOR IMMEDIATE ASSISTANCE, PLEASE CONTACT OUR CUSTOMER EXPERIENCE
                CENTRE +91 8800900009
              </p>
            </div>
          </div>
        </div>

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
          {/* Format Icons */}
          {/* <div className="flex space-x-4 mb-8 overflow-x-auto">
            {formats.map((format) => (
              <div key={format.id} className="shrink-0">
                <img
                  src={format.image}
                  alt={format.alt}
                  className="h-10 w-20 object-contain"
                />
              </div>
            ))}
          </div> */}
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
          <TrailersPage />
        </div>
      </div>
    </div>
  );
};

export default Home;
