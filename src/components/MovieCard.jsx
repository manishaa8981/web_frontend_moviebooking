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
        const response = await axios.get("http://localhost:4011/api/movie/get");
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

  return (
    <div className="bg-neutral-900 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white">Popular Movies</h2>
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-[#1DB954] hover:underline font-medium"
        >
          {showAll ? "Show Less" : "See all"}
        </button>
      </div>

      {/* Movies Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {displayedMovies.map((movie) => (
          <div
            key={movie.id}
            onClick={() => navigate(`/movie/${movie._id}`)}
            className="group bg-neutral-800 rounded-lg p-4 cursor-pointer transition-all duration-300 hover:bg-[#282828] relative"
          >
            {/* Hover Border Effect */}
            <div className="absolute inset-0 rounded-lg transition-all duration-300 group-hover:ring-2 group-hover:ring-[#1DB954] " />

            {/* Image Container */}
            <div className="relative aspect-square mb-4 rounded-md overflow-hidden shadow-lg">
              <img
                src={`http://localhost:4011/public/uploads/images/${movie.movie_image}`}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/movie/${movie._id}`);
                  }}
                  className="bg-[#1DB954]  text-black rounded-full p-3 shadow-lg hover:scale-50 transition-transform"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-1">
              <h3 className="font-bold text-white truncate">{movie.title}</h3>
              <p className="text-sm text-gray-400 line-clamp-2">
                {movie.genre} • {movie.languages}
              </p>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 text-xs bg-[#282828] text-gray-300 rounded-full">
                  {movie.status}
                </span>
              </div>
              <button className="w-full bg-green-500 text-black py-2 rounded-full font-medium hover:bg-green-400 transition duration-300">
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieCard;
