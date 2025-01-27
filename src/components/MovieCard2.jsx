import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const MovieCard2 = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://localhost:4011/api/movie/get"); // Replace with your API endpoint
        setMovies(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch movie data");
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-800 text-white">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-800 text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      {/* Movies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 m-10">
        {movies.map((movie) => (
          <div
            key={movie.id}
            onClick={() => navigate(`/movie/${movie._id}`)}
            className="group relative bg-transparent
             rounded-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            {/* Image Container */}
            <div className="relative h-60 overflow-hidden">
              <img
                src={`http://localhost:4011/public/uploads/images/${movie.movie_image}`}
                alt={movie.title}
                className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
            </div>

            {/* Content Container */}
            <div className="p-2 space-y-2">
              {/* Release Date Badge */}
              <div className="flex items-center justify-end">
                <span className="px-2 py-1 text-xs font-semibold bg-yellow-100 text-yellow-700 rounded-full">
                  {movie.status}
                </span>
                {/* <span className="px-2 py-1 text-xs font-semibold bg-purple-100 text-purple-700 rounded-full">
                      {movie.rating}
                    </span> */}
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
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent the button from triggering the parent click
                  navigate(`/movie/${movie._id}`);
                }}
                className="w-full py-2 mt-2 text-sm font-semibold text-white bg-orange-400 rounded-lg transition-all duration-300 hover:bg-orange-600 hover:shadow-md transform hover:-translate-y-0.5"
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieCard2;
