import axios from "axios";
import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";

const SeatPanel = () => {
  const [halls, setHalls] = useState([]);
  const [showtimes, setShowtimes] = useState([]);
  const [seats, setSeats] = useState([]);
  const [selectedHall, setSelectedHall] = useState("");
  const [selectedShowtime, setSelectedShowtime] = useState("");
  const [totalRows, setTotalRows] = useState("");
  const [seatsPerRow, setSeatsPerRow] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    if (selectedHall) fetchSeats();
  }, [selectedHall]);

  useEffect(() => {
    fetchHalls();
    fetchShowtimes();
  }, []);

  const fetchHalls = async () => {
    try {
      const response = await axios.get("http://localhost:4011/api/hall");
      setHalls(response.data);
    } catch (error) {
      console.error("Error fetching halls:", error);
    }
  };

  const fetchShowtimes = async () => {
    try {
      const response = await axios.get("http://localhost:4011/api/showtime");
      setShowtimes(response.data);
    } catch (error) {
      console.error("Error fetching showtimes:", error);
    }
  };

  const fetchSeats = async () => {
    if (!selectedHall) return;
    try {
      const response = await axios.get(
        `http://localhost:4011/api/seat/hall/${selectedHall}`
      );
      setSeats(response.data);
    } catch (error) {
      console.error("Error fetching seats:", error);
    }
  };

  const createSeats = async () => {
    if (!selectedHall || !selectedShowtime || !totalRows || !seatsPerRow) {
      alert("Please fill all fields.");
      return;
    }

    try {
      await axios.post("http://localhost:4011/api/seat", {
        hallId: selectedHall,
        showtimeId: selectedShowtime,
        totalRows: parseInt(totalRows),
        seatsPerRow: parseInt(seatsPerRow),
      });

      alert("Seats added successfully!");
      setShowAddForm(false);
      fetchSeats();
      setTotalRows("");
      setSeatsPerRow("");
    } catch (error) {
      console.error("Error creating seats:", error);
      alert("Failed to create seats.");
    }
  };

  const deleteSeat = async (seatId) => {
    try {
      await axios.delete(`http://localhost:4011/api/seat/${seatId}`);
      alert("Seat deleted successfully");
      fetchSeats();
    } catch (error) {
      console.error("Error deleting seat:", error);
      alert("Failed to delete seat.");
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Seat Management</h2>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 bg-[#1DB954] text-black px-4 py-2 rounded-full font-medium hover:bg-[#1ed760] transition-colors"
          >
            <Plus size={20} />
            Add Seats
          </button>
        </div>

        {/* Add Form */}
        {showAddForm && (
          <div className="bg-neutral-800 p-6 rounded-lg mb-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm text-gray-300">Select Hall</label>
                <select
                  value={selectedHall}
                  onChange={(e) => setSelectedHall(e.target.value)}
                  className="w-full bg-neutral-700 border-0 rounded-md p-3 text-white focus:ring-2 focus:ring-[#1DB954]"
                >
                  <option value="">Select Hall</option>
                  {halls.map((hall) => (
                    <option key={hall._id} value={hall._id}>
                      {hall.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-300">Select Showtime</label>
                <select
                  value={selectedShowtime}
                  onChange={(e) => setSelectedShowtime(e.target.value)}
                  className="w-full bg-neutral-700 border-0 rounded-md p-3 text-white focus:ring-2 focus:ring-[#1DB954]"
                >
                  <option value="">Select Showtime</option>
                  {showtimes.map((showtime) => (
                    <option key={showtime._id} value={showtime._id}>
                      {showtime.time} - {showtime.movieTitle}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-300">Total Rows</label>
                <input
                  type="number"
                  value={totalRows}
                  onChange={(e) => setTotalRows(e.target.value)}
                  className="w-full bg-neutral-700 border-0 rounded-md p-3 text-white focus:ring-2 focus:ring-[#1DB954]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-300">Seats Per Row</label>
                <input
                  type="number"
                  value={seatsPerRow}
                  onChange={(e) => setSeatsPerRow(e.target.value)}
                  className="w-full bg-neutral-700 border-0 rounded-md p-3 text-white focus:ring-2 focus:ring-[#1DB954]"
                />
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 rounded-full border border-gray-600 hover:border-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={createSeats}
                className="bg-[#1DB954] text-black px-6 py-2 rounded-full font-medium hover:bg-[#1ed760] transition-colors"
              >
                Create Seats
              </button>
            </div>
          </div>
        )}

        {/* Seats Table */}
        <div className="bg-neutral-800 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-neutral-700">
                  <th className="text-left p-4 text-sm font-medium text-gray-300">
                    Hall
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-gray-300">
                    Showtime
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-gray-300">
                    Seat
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-gray-300">
                    Status
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-gray-300">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-700">
                {seats.map((seat) => (
                  <tr
                    key={seat._id}
                    className="hover:bg-neutral-700/50 transition-colors"
                  >
                    <td className="p-4">
                      {seat.hallId?.name || "Unknown Hall"}
                    </td>
                    <td className="p-4">
                      {seat.showtimeId?.time || "Unknown Showtime"}
                    </td>
                    <td className="p-4">{seat.seatName}</td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          seat.seatStatus
                            ? "bg-red-500/20 text-red-400"
                            : "bg-green-500/20 text-green-400"
                        }`}
                      >
                        {seat.seatStatus ? "Booked" : "Available"}
                      </span>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => deleteSeat(seat._id)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatPanel;
