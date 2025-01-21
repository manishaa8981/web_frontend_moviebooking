import React, { useEffect, useState } from "react";
import MovieForm from "./form";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [editingMovie, setEditingMovie] = useState(null);

  // Fetch movies from API or database
  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch("http://localhost:4011/api/movie"); // Replace with your API endpoint
      const data = await response.json();
      setMovies(data);
    };

    fetchMovies();
  }, []);

  const handleDelete = async (id) => {
    await fetch(`http://localhost:4011/api/movie/${id}`, { method: "DELETE" }); // Replace with your API endpoint
    setMovies(movies.filter((movie) => movie.id !== id));
  };

  const handleSave = (movieData) => {
    if (editingMovie) {
      // Update movie
      setMovies(
        movies.map((movie) =>
          movie.id === editingMovie.id ? { ...movie, ...movieData } : movie
        )
      );
    } else {
      // Add new movie
      setMovies([...movies, { id: Date.now(), ...movieData }]);
    }
    setEditingMovie(null); // Reset form
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Movies</h1>

      {/* Movie Form */}
      <MovieForm initialData={editingMovie} onSubmit={handleSave} />

      {/* Movie List */}
      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Genre</th>
            <th className="border px-4 py-2">Duration</th>
            <th className="border px-4 py-2">Release Date</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.id}>
              <td className="border px-4 py-2">{movie.title}</td>
              <td className="border px-4 py-2">{movie.genre}</td>
              <td className="border px-4 py-2">{movie.duration}</td>
              <td className="border px-4 py-2">{movie.releaseDate}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => setEditingMovie(movie)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(movie.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded ml-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MovieList;
