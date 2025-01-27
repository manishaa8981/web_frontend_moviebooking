import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MovieDetails = () => {
  const { id } = useParams(); // Get the movie ID from the URL
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4011/api/movie/${id}`
        ); // Replace with your API endpoint
        setMovie(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch movie details");
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

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
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="relative h-60">
          <img
            src={`http://localhost:4011/public/uploads/images/${movie.movie_image}`}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800">{movie.title}</h1>
          <p className="text-gray-600 mt-4">{movie.description}</p>
          <div className="flex items-center space-x-4 mt-4">
            <span className="px-2 py-1 text-sm font-semibold bg-yellow-100 text-yellow-700 rounded-full">
              {movie.genre}
            </span>
            <span className="px-2 py-1 text-sm font-semibold bg-purple-100 text-purple-700 rounded-full">
              {movie.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
