import axios from "axios";
import { useEffect, useState } from "react";

export default function ShowTime() {
  const [showtimes, setShowtimes] = useState([]);
  const [movies, setMovies] = useState([]);
  const [halls, setHalls] = useState([]);
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
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Manage Showtimes</h2>
      <form onSubmit={handleSubmit} className="space-y-4 border p-4 rounded">
        {/* Movie Selection */}
        <select
          name="movieId"
          value={formData.movieId}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select a Movie</option>
          {movies.map((movie) => (
            <option key={movie._id} value={movie._id}>
              {movie.movie_name}
            </option>
          ))}
        </select>

        {/* Hall Selection */}
        <select
          name="hallId"
          value={formData.hallId}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select a Hall</option>
          {halls.map((hall) => (
            <option key={hall._id} value={hall._id}>
              {hall.hall_name}
            </option>
          ))}
        </select>

        <input
          type="time"
          name="start_time"
          value={formData.start_time}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="time"
          name="end_time"
          value={formData.end_time}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full"
        >
          {editingId ? "Update" : "Add"} Showtime
        </button>
      </form>

      {/* Showtime Table */}
      <table className="w-full mt-6 border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Movie</th>
            <th className="p-2">Hall</th>
            <th className="p-2">Start</th>
            <th className="p-2">End</th>
            <th className="p-2">Date</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {showtimes.map((showtime) => (
            <tr key={showtime._id} className="border-t">
              <td className="p-2">{showtime.movieId?.movie_name || "N/A"}</td>
              <td className="p-2">{showtime.hallId?.hall_name || "N/A"}</td>
              <td className="p-2">{showtime.start_time}</td>
              <td className="p-2">{showtime.end_time}</td>
              <td className="p-2">
                {new Date(showtime.date).toLocaleDateString()}
              </td>
              <td className="p-2">
                <button
                  onClick={() => handleEdit(showtime)}
                  className="bg-yellow-500 text-white p-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(showtime._id)}
                  className="bg-red-500 text-white p-1 rounded"
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
}
