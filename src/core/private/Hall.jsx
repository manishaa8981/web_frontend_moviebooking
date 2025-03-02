import axios from "axios";
import { Edit, Plus, Trash2, X } from "lucide-react";
import React, { useEffect, useState } from "react";

const AdminHallPanel = () => {
  const [halls, setHalls] = useState([]);
  const [movies, setMovies] = useState([]);
  const [hallName, setHallName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [price, setPrice] = useState("");
  const [editingHallId, setEditingHallId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [selectedMovieIds, setSelectedMovieIds] = useState([]);

  useEffect(() => {
    fetchHalls();
    fetchMovies();
  }, []);

  const fetchHalls = async () => {
    try {
      const response = await axios.get("http://localhost:4011/api/hall");
      setHalls(response.data);
    } catch (error) {
      console.error("Error fetching halls:", error);
    }
  };

  const fetchMovies = async () => {
    try {
      const response = await axios.get("http://localhost:4011/api/movie");
      setMovies(response.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

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
        movies: selectedMovieIds,
      };

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

      fetchHalls();
      closeModal();
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
      fetchHalls();
    } catch (error) {
      console.error("Error deleting hall:", error);
      alert("Failed to delete hall.");
    }
  };

  const handleEditHall = (hall) => {
    setHallName(hall.hall_name);
    setCapacity(hall.capacity);
    setPrice(hall.price);
    setEditingHallId(hall._id);
    setSelectedMovies(hall.movies || []);
    setSelectedMovieIds(hall.movies?.map((movie) => movie._id) || []);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setHallName("");
    setCapacity("");
    setPrice("");
    setEditingHallId(null);
    setSelectedMovies([]);
    setSelectedMovieIds([]);
  };

  return (
    <div className="bg-black/95 text-white min-h-screen ">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Hall Management</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-neutral-600 hover:bg-neutral-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center"
          >
            <Plus size={20} />
            <span className="ml-2">Add Hall</span>
          </button>
        </div>

        {/* Hall List */}
        <div className="bg-zinc-900 rounded-lg shadow-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-neutral-700">
                <th className="p-4 text-left">Hall Name</th>
                <th className="p-4 text-left">Capacity</th>
                <th className="p-4 text-left">Price</th>
                <th className="p-4 text-left">Movies</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {halls.map((hall) => (
                <tr
                  key={hall._id}
                  className="border-b border-neutral-800 hover:bg-neutral-700/50 transition"
                >
                  <td className="p-4">{hall.hall_name}</td>
                  <td className="p-4">{hall.capacity}</td>
                  <td className="p-4">Rs. {hall.price}</td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-2">
                      {hall.movies?.length > 0 ? (
                        hall.movies.map((movie) => (
                          <span
                            key={movie._id}
                            className="bg-neutral-600 text-white px-3 py-1 rounded-full text-sm"
                          >
                            {movie.movie_name}
                          </span>
                        ))
                      ) : (
                        <span className="text-neutral-400 text-sm">
                          No movies assigned
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleEditHall(hall)}
                      className="text-[#1DB954] hover:text-[#1ed760] transition-colors"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteHall(hall._id)}
                      className="text-red-500 hover:text-red-400 ml-2 transition"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal Overlay */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-neutral-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold">
                    {editingHallId ? "Update Hall" : "Add New Hall"}
                  </h3>
                  <button
                    onClick={closeModal}
                    className="text-red-500 hover:text-red-400 transition"
                  >
                    <X size={24} />
                  </button>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm text-neutral-300">
                    Hall Name
                  </label>
                  <input
                    type="text"
                    value={hallName}
                    onChange={(e) => setHallName(e.target.value)}
                    className="w-full  bg-neutral-600 p-3 bg-zinc-700 text-white rounded-md block text-sm text-white"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm text-neutral-300">
                    Capacity
                  </label>
                  <input
                    type="number"
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    className="w-full  bg-neutral-600 p-3 bg-zinc-700 text-white rounded-md block text-sm text-white"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm text-neutral-300">
                    Price
                  </label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full  bg-neutral-600 p-3 bg-zinc-700 text-white rounded-md block text-sm text-white"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm text-gray-300 mb-2">
                    Select Movies
                  </label>
                  <select
                    onChange={handleMovieSelect}
                    value=""
                    className="w-full  bg-neutral-600 p-3 bg-zinc-700 text-white rounded-md block text-sm text-white"
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
                      className="w-full  bg-neutral-600 p-3 bg-zinc-700 text-white rounded-md block text-sm text-white"
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

                <div className="space-y-2 mt-4">
                  <button
                    onClick={handleSaveHall}
                    className="w-full bg-green-500 hover:bg-green-600 p-3 rounded-md"
                  >
                    {editingHallId ? "Update Hall" : "Save"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminHallPanel;
