import axios from "axios";
import { Edit, Plus, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function ShowTime() {
  const [showtimes, setShowtimes] = useState([]);
  const [movies, setMovies] = useState([]);
  const [halls, setHalls] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    movieId: "",
    hallId: "",
    start_time: "",
    end_time: "",
    date: "",
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchShowTimes();
    fetchMovies();
    fetchHalls();
  }, []);

  const fetchShowTimes = async () => {
    try {
      const res = await axios.get("http://localhost:4011/api/showtime/");
      setShowtimes(res.data);
    } catch (err) {
      console.error("Error fetching showtimes", err);
    }
  };

  const fetchMovies = async () => {
    try {
      const res = await axios.get("http://localhost:4011/api/movie/");
      setMovies(res.data);
    } catch (err) {
      console.error("Error fetching movies", err);
    }
  };

  const fetchHalls = async () => {
    try {
      const res = await axios.get("http://localhost:4011/api/hall/");
      setHalls(res.data);
    } catch (err) {
      console.error("Error fetching halls", err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(
          `http://localhost:4011/api/showtime/${editingId}`,
          formData
        );
      } else {
        await axios.post("http://localhost:4011/api/showtime/", formData);
      }
      fetchShowTimes();
      setFormData({
        movieId: "",
        hallId: "",
        start_time: "",
        end_time: "",
        date: "",
      });
      setEditingId(null);
      setIsModalOpen(false);
    } catch (err) {
      console.error("Error saving showtime", err);
    }
  };

  const handleEdit = (showtime) => {
    setFormData({
      movieId: showtime.movieId._id,
      hallId: showtime.hallId._id,
      start_time: showtime.start_time,
      end_time: showtime.end_time,
      date: showtime.date.split("T")[0],
    });
    setEditingId(showtime._id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4011/api/showtime/${id}`);
      fetchShowTimes();
    } catch (err) {
      console.error("Error deleting showtime", err);
    }
  };

  return (
    <div className="min-h-screen bg-black/95 text-white ">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold flex">Manage Showtimes</h2>

          {/* Toggle Form Button */}
          <button
            className="flex items-center gap-2 bg-neutral-600 hover:bg-neutral-700 text-white px-4 py-2 rounded-lg transition"
            onClick={() => {
              setIsModalOpen(true);
              setEditingId(null);
            }}
          >
            <Plus size={20} />
            Add Show
          </button>
        </div>

        {/* Showtime List */}
        <div className="bg-zinc-900 rounded-lg shadow-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-neutral-700">
                <th className="p-4 text-left font-medium">Movie</th>
                <th className="p-4 text-left font-medium">Hall</th>
                <th className="p-4 text-left font-medium">Start</th>
                <th className="p-4 text-left font-medium">End</th>
                <th className="p-4 text-left font-medium">Date</th>
                <th className="p-4 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {showtimes.map((showtime) => (
                <tr
                  key={showtime._id}
                  className="border-b border-neutral-800 hover:bg-neutral-700/50 transition-colors"
                >
                  <td className="px-4 py-4">
                    {showtime.movieId?.movie_name || "N/A"}
                  </td>
                  <td className="px-4 py-4">
                    {showtime.hallId?.hall_name || "N/A"}
                  </td>
                  <td className="px-4 py-4">{showtime.start_time}</td>
                  <td className="px-4 py-4">{showtime.end_time}</td>
                  <td className="px-4 py-4">
                    {new Date(showtime.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(showtime)}
                        className="text-[#1DB954] hover:text-[#1ed760] transition-colors"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(showtime._id)}
                        className="text-red-500 hover:text-red-400 transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showtimes.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No showtimes available. Add your first one!
          </div>
        )}
      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-neutral-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-white">
                  {editingId ? "Update Showtime" : "Add New Showtime"}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-red-500 hover:text-red-400 transition"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm text-neutral-300">
                    Movie Name
                  </label>
                  <select
                    name="movieId"
                    value={formData.movieId}
                    onChange={handleChange}
                    className="w-full  bg-neutral-600 p-3 bg-zinc-700 text-white rounded-md block text-sm text-white"
                    required
                  >
                    <option value="">Choose a movie...</option>
                    {movies.map((movie) => (
                      <option key={movie._id} value={movie._id}>
                        {movie.movie_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm text-neutral-300">
                    Hall Name
                  </label>
                  <select
                    name="hallId"
                    value={formData.hallId}
                    onChange={handleChange}
                    className="w-full p-3 bg-zinc-700 text-white rounded-md block text-sm bg-neutral-700 text-white"
                    required
                  >
                    <option value="">Choose a hall...</option>
                    {halls.map((hall) => (
                      <option key={hall._id} value={hall._id}>
                        {hall.hall_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm text-neutral-300">
                    Start time
                  </label>
                  <input
                    type="time"
                    name="start_time"
                    value={formData.start_time}
                    onChange={handleChange}
                    className="w-full p-3 bg-zinc-700 text-white rounded-md block text-sm bg-neutral-700 text-white"
                    required
                  />
                </div>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full p-3 bg-zinc-700 text-white rounded-md block text-sm bg-neutral-700 text-white"
                  required
                />

                <button
                  type="submit"
                  className="w-full p-3 bg-green-500 hover:bg-green-600 text-white rounded-md"
                >
                  {editingId ? "Update Showtime" : "Save"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
