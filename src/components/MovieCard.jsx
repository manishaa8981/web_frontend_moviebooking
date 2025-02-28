import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MovieCard = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://localhost:4011/api/movie/");
        setMovies(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch movie data");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  // Function to handle direct navigation to booking page
  const handleBookNow = (movieId, event) => {
    // Stop event propagation to prevent navigating to movie details
    event.stopPropagation();
    // Navigate to booking page with the movie ID
    navigate(`/movie-booking/${movieId}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#121212] text-white">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#121212] text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  const displayedMovies = showAll ? movies : movies.slice(0, 4);
  const Badge = ({ children }) => (
    <span className="px-3 py-1 rounded-full text-sm font-medium bg-neutral-800 text-white">
      {children}
    </span>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-900 to-black p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-white">Now Showing</h2>
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-[#1DB954] hover:underline font-medium"
          >
            {showAll ? "Show Less" : "See all"}
          </button>
        </div>

        {/* Movies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedMovies.map((movie) => (
            <div
              key={movie._id || movie.id}
              onClick={() => navigate(`/movie/${movie._id || movie.id}`)}
              className="bg-neutral-800 rounded-lg overflow-hidden transform transition-all duration-300 hover:bg-neutral-700 cursor-pointer group"
            >
              {/* Image Container */}
              <div className="relative aspect-[2.5/3] overflow-hidden">
                <img
                  src={`http://localhost:4011/public/uploads/images/${movie.movie_image}`}
                  alt={movie.movie_name}
                  className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white mb-2 truncate">
                  {movie.movie_name}
                </h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge>{movie.genre}</Badge>
                  <Badge>{movie.language}</Badge>
                  <Badge>{movie.rating}</Badge>
                </div>
                <button
                  className="w-full mt-6 p-3 bg-orange-400 hover:bg-orange-500 text-white font-semibold rounded-lg flex items-center justify-center transition duration-300"
                  onClick={(e) => handleBookNow(movie._id || movie.id, e)}
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
