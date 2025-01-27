import axios from "axios";
import { PlusIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { FaEdit, FaTimes, FaTrash } from "react-icons/fa";
const ShowTime = () => {
  const [halls, setHalls] = useState([]);
  const [movies, setMovies] = useState([]);
  const [showTimes, setShowTimes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentShowTime, setCurrentShowTime] = useState(null);
  const [globalFilter, setGlobalFilter] = useState("");

  // Fetch movies from API
  const fetchMovies = async () => {
    try {
      const response = await axios.get("http://localhost:4011/api/movie/get");
      console.log("Movies fetched:", response.data); // Add this
      setMovies(response.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  // Fetch halls from API
  const fetchHalls = async () => {
    try {
      const response = await axios.get("http://localhost:4011/api/hall/get");
      setHalls(response.data);
    } catch (error) {
      console.error("Error fetching halls:", error);
    }
  };

  // Fetch showtimes from API
  const fetchShowTimes = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4011/api/showTime/get"
      );
      const showTimesWithNames = response.data.map((showTime) => ({
        ...showTime,
        movie_name:
          movies.find((movie) => movie._id === showTime.movieId)?.movie_name ||
          "Unknown Movie",
        hall_name:
          halls.find((hall) => hall._id === showTime.hallId)?.hall_name ||
          "Unknown Hall",
      }));
      setShowTimes(showTimesWithNames);
    } catch (error) {
      console.error(
        "Error fetching showtimes:",
        error.response || error.message
      );
    }
  };

  // Handle Save or Update
  const handleSaveShowTime = async (showTime) => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      if (showTime._id) {
        // Update existing showtime
        await axios.put(
          `http://localhost:4011/api/showTime/${showTime._id}`,
          showTime,
          { headers }
        );
      } else {
        // Create new showtime
        await axios.post("http://localhost:4011/api/showTime/save", showTime, {
          headers,
        });
      }
      fetchShowTimes();
      setIsModalOpen(false);
    } catch (error) {
      console.error(
        "Error saving showtime:",
        error.response?.data || error.message
      );
      alert(
        `Error: ${error.response?.data?.error || "Unable to save showtime"}`
      );
    }
  };

  // Handle Delete
  const handleDeleteShowTime = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:4011/api/showTime/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchShowTimes();
    } catch (error) {
      console.error("Error deleting showtime:", error);
      alert(
        `Error: ${error.response?.data?.message || "Unable to delete showtime"}`
      );
    }
  };

  const handleAddShowTime = () => {
    setCurrentShowTime(null);
    setIsModalOpen(true);
  };

  const handleEditShowTime = (showTime) => {
    setCurrentShowTime(showTime);
    setIsModalOpen(true);
  };

  useEffect(() => {
    fetchHalls();
    fetchMovies();
    fetchShowTimes();
  }, []);

  // Filter showtimes based on globalFilter
  const filteredShowTimes = showTimes.filter((showTime) =>
    `${showTime.movie_name} ${showTime.hall_name} ${showTime.start_time} ${showTime.end_time}`
      .toLowerCase()
      .includes(globalFilter.toLowerCase())
  );

  return (
    <>
      <div className="p-4 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-indigo-900">
            Today's Schedule
          </h2>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Search movies..."
              className="input input-bordered"
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
            />
            <button onClick={handleAddShowTime} className="btn btn-primary">
              <PlusIcon size={20} /> Add Showtime
            </button>
          </div>
        </div>

        {/* ShowTime Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredShowTimes.map((showTime) => (
            <div
              key={showTime._id}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition relative"
            >
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold text-indigo-900">
                  {showTime.start_time} - {showTime.end_time}
                </span>
                <span className="text-sm text-black">{showTime.hall_name}</span>
                <div className="flex gap-2">
                  {/* Edit Icon */}
                  <FaEdit
                    className="text-blue-500 cursor-pointer hover:text-blue-700"
                    onClick={() => handleEditShowTime(showTime)}
                  />
                  {/* Delete Icon */}
                  <FaTrash
                    className="text-red-500 cursor-pointer hover:text-red-700"
                    onClick={() => handleDeleteShowTime(showTime._id)}
                  />
                </div>
              </div>
              <h3 className="text-lg font-medium mb-3">
                {showTime.movie_name}
              </h3>
              <div className="flex justify-between items-center text-gray-600">
                <span>Bookings</span>
                <span className="font-medium">{showTime.bookings}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Add/Edit */}
        {isModalOpen && (
          <div className="modal modal-open">
            <div className="modal-box">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-lg">
                  {currentShowTime ? "Edit Showtime" : "Add New Showtime"}
                </h3>
                <FaTimes
                  className="text-xl cursor-pointer hover:text-red-600"
                  onClick={() => setIsModalOpen(false)}
                />
              </div>

              <form
                className="space-y-4 mt-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  const showTimeData = {
                    _id: currentShowTime?._id, // Include ID only for editing
                    start_time: e.target.start_time.value,
                    end_time: e.target.end_time.value,
                    date: e.target.date.value,
                    movieId: e.target.movieId.value,
                    hallId: e.target.hallId.value,
                  };
                  handleSaveShowTime(showTimeData);
                }}
              >
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Start Time</span>
                  </label>
                  <input
                    type="time"
                    name="start_time"
                    className="input input-bordered"
                    defaultValue={currentShowTime?.start_time}
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">End Time</span>
                  </label>
                  <input
                    type="time"
                    name="end_time"
                    className="input input-bordered"
                    defaultValue={currentShowTime?.end_time}
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Date</span>
                  </label>
                  <input
                    type="date"
                    name="date"
                    className="input input-bordered"
                    defaultValue={currentShowTime?.date}
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Movie</span>
                  </label>
                  <select
                    name="movieId"
                    className="select select-bordered"
                    defaultValue={currentShowTime?.movieId || ""}
                    required
                  >
                    <option value="">Select Movie</option>
                    {movies.map((movie) => (
                      <option key={movie._id} value={movie._id}>
                        {movie.movie_name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Hall</span>
                  </label>
                  <select
                    name="hallId"
                    className="select select-bordered"
                    defaultValue={currentShowTime?.hallId || ""}
                    required
                  >
                    <option value="">Select Hall</option>
                    {halls.map((hall) => (
                      <option key={hall._id} value={hall._id}>
                        {hall.hall_name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="modal-action">
                  <button type="submit" className="btn btn-primary">
                    Save
                  </button>
                  <button
                    type="button"
                    className="btn"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ShowTime;
