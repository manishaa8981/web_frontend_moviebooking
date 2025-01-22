import axios from "axios";
import React, { useEffect, useState } from "react";

const MovieCard = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch movies from API
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
    <div className="bg-gray-800 min-h-screen p-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <div
              key={movie.id}
              onClick={() => navigate(`/movies/${movie.id}`)} // Navigate to the details page
              className="card bg-gray-900 shadow-xl group relative z-10 hover:z-20 transition-all duration-300 transform hover:scale-200 hover:-translate-y-4 hover:shadow-[0_0_30px_rgba(0,0,0,0.5)]"
            >
              {/* Image Container */}
              <figure className="relative overflow-hidden h-[400px]">
                <img
                  src={movie.movie_image || "/api/placeholder/400/600"}
                  alt={movie.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Image Overlay on Hover */}
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300" />

                {/* Rating Badge */}
                {/* <div className="absolute top-4 right-4 badge badge-warning gap-2 p-3 z-10">
                  ⭐ {movie.rating || 'N/A'}
                </div> */}

                {/* Play Trailer Button - Appears on Hover */}
                <button className="absolute inset-0 m-auto w-16 h-16 flex items-center justify-center rounded-full bg-orange-500 opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-50 group-hover:scale-100">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
              </figure>

              {/* Card Content */}
              <div className="card-body p-4 bg-gradient-to-b from-gray-900 to-gray-800">
                {/* Title */}
                <h2 className="card-title text-xl font-bold text-white mb-2 group-hover:text-orange-500 transition-colors">
                  {movie.title}
                  <div className="badge badge-error">
                    {movie.releaseDate || "Coming Soon"}
                  </div>
                </h2>

                {/* Movie Details */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-300">
                    <span className="text-orange-500">●</span>
                    {movie.duration || "N/A"}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <div className="badge badge-outline text-orange-400 border-orange-400">
                      {movie.genre || "N/A"}
                    </div>
                  </div>
                </div>

                {/* Booking Button */}
                <div className="card-actions mt-4">
                  <button className="btn btn-block bg-orange-500 hover:bg-orange-600 text-white border-none transform transition-transform duration-300 group-hover:scale-105">
                    Book Tickets
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
