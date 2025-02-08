import axios from "axios";
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";

const AdminHallPanel = () => {
  const [halls, setHalls] = useState([]);
  const [movies, setMovies] = useState([]);
  const [hallName, setHallName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [price, setPrice] = useState("");
  const [editingHallId, setEditingHallId] = useState(null);
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [selectedMovieIds, setSelectedMovieIds] = useState([]);

  const fetchHalls = async () => {
    try {
      const response = await axios.get("http://localhost:4011/api/hall");
      console.log("Fetched halls:", response.data);
      setHalls(response.data);
    } catch (error) {
      console.error("Error fetching halls:", error);
    }
  };

  const fetchMovies = async () => {
    try {
      const response = await axios.get("http://localhost:4011/api/movie");
      console.log("Fetched movies:", response.data);
      setMovies(response.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    fetchHalls();
    fetchMovies();
  }, []);

  const handleMovieSelect = (e) => {
    const movieId = e.target.value;
    if (!movieId) return;

    const movie = movies.find((m) => m._id === movieId);
    if (movie && !selectedMovieIds.includes(movieId)) {
      setSelectedMovieIds((prev) => [...prev, movieId]);
      setSelectedMovies((prev) => [...prev, movie]);
    }
  };

  const handleRemoveMovie = (movieId) => {
    setSelectedMovieIds((prev) => prev.filter((id) => id !== movieId));
    setSelectedMovies((prev) => prev.filter((movie) => movie._id !== movieId));
  };

  const handleSaveHall = async () => {
    if (!hallName || !capacity || !price) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const payload = {
        hall_name: hallName,
        capacity: Number(capacity),
        price: Number(price),
        movies: selectedMovieIds, // Make sure we're sending the movie IDs array
      };

      console.log("Saving hall with payload:", payload);

      if (editingHallId) {
        await axios.put(
          `http://localhost:4011/api/hall/${editingHallId}`,
          payload
        );
        alert("Hall updated successfully!");
      } else {
        await axios.post("http://localhost:4011/api/hall", payload);
        alert("Hall added successfully!");
      }

      fetchHalls(); // Refresh the halls list
      resetForm();
      setIsAddFormVisible(false);
    } catch (error) {
      console.error("Error saving hall:", error);
      alert(
        `Failed to save hall: ${error.response?.data?.message || error.message}`
      );
    }
  };

  const handleDeleteHall = async (hallId) => {
    if (!window.confirm("Are you sure you want to delete this hall?")) return;

    try {
      await axios.delete(`http://localhost:4011/api/hall/${hallId}`);
      alert("Hall deleted successfully!");
      fetchHalls(); // Refresh the halls list after deletion
    } catch (error) {
      console.error("Error deleting hall:", error);
      alert("Failed to delete hall.");
    }
  };

  const handleEditHall = (hall) => {
    console.log("Editing hall:", hall);
    setHallName(hall.hall_name);
    setCapacity(hall.capacity);
    setPrice(hall.price);
    setEditingHallId(hall._id);
    setSelectedMovies(hall.movies || []);
    setSelectedMovieIds(hall.movies?.map((movie) => movie._id) || []);
    setIsAddFormVisible(true);
  };

  const resetForm = () => {
    setHallName("");
    setCapacity("");
    setPrice("");
    setEditingHallId(null);
    setSelectedMovies([]);
    setSelectedMovieIds([]);
  };

  const toggleAddForm = () => {
    setIsAddFormVisible(!isAddFormVisible);
    if (isAddFormVisible) {
      resetForm();
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-white">Hall Management</h2>
        <button
          onClick={toggleAddForm}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
        >
          {isAddFormVisible ? "Cancel" : "Add New Hall"}
        </button>
      </div>

      {isAddFormVisible && (
        <div className="bg-gray-800 rounded-lg p-6 mb-6 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <input
              type="text"
              placeholder="Hall Name"
              value={hallName}
              onChange={(e) => setHallName(e.target.value)}
              className="bg-gray-700 text-white rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Capacity"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              className="bg-gray-700 text-white rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="bg-gray-700 text-white rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm text-gray-300 mb-2">
              Select Movies
            </label>
            <select
              onChange={handleMovieSelect}
              value=""
              className="bg-gray-700 text-white rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a movie</option>
              {movies
                .filter((movie) => !selectedMovieIds.includes(movie._id))
                .map((movie) => (
                  <option key={movie._id} value={movie._id}>
                    {movie.movie_name}
                  </option>
                ))}
            </select>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {selectedMovies.map((movie) => (
              <span
                key={movie._id}
                className="inline-flex items-center gap-1 bg-gray-700 text-white px-3 py-1 rounded-full"
              >
                {movie.movie_name}
                <button
                  onClick={() => handleRemoveMovie(movie._id)}
                  className="hover:text-red-500 focus:outline-none"
                >
                  <X className="h-4 w-4" />
                </button>
              </span>
            ))}
          </div>

          <button
            onClick={handleSaveHall}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
          >
            {editingHallId ? "Update Hall" : "Save Hall"}
          </button>
        </div>
      )}

      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-700">
              <th className="p-4 text-left font-medium">Hall Name</th>
              <th className="p-4 text-left font-medium">Capacity</th>
              <th className="p-4 text-left font-medium">Price</th>
              <th className="p-4 text-left font-medium">Movies</th>
              <th className="p-4 text-left font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {halls.map((hall) => (
              <tr
                key={hall._id}
                className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors"
              >
                <td className="p-4">{hall.hall_name}</td>
                <td className="p-4">{hall.capacity}</td>
                <td className="p-4">Rs. {hall.price}</td>
                <td className="p-4">
                  <div className="flex flex-wrap gap-2">
                    {hall.movies && hall.movies.length > 0 ? (
                      hall.movies.map((movie) => (
                        <span
                          key={movie._id}
                          className="bg-gray-600 text-white px-3 py-1 rounded-full text-sm"
                        >
                          {movie.movie_name}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-400 text-sm">
                        No movies assigned
                      </span>
                    )}
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditHall(hall)}
                      className="bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded-lg transition-colors duration-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteHall(hall._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition-colors duration-200"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminHallPanel;
