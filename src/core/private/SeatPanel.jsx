// import axios from "axios";
// import { Plus } from "lucide-react";
// import React, { useEffect, useState } from "react";

// const SeatPanel = () => {
//   const [halls, setHalls] = useState([]);
//   const [showtimes, setShowtimes] = useState([]);
//   const [seats, setSeats] = useState([]);
//   const [selectedHall, setSelectedHall] = useState("");
//   const [selectedShowtime, setSelectedShowtime] = useState("");
//   const [totalRows, setTotalRows] = useState("");
//   const [seatsPerRow, setSeatsPerRow] = useState("");
//   const [showAddForm, setShowAddForm] = useState(false);

//   useEffect(() => {
//     if (selectedHall) fetchSeats();
//   }, [selectedHall]);

//   useEffect(() => {
//     fetchHalls();
//     fetchShowtimes();
//   }, []);

//   const fetchHalls = async () => {
//     try {
//       const response = await axios.get("http://localhost:4011/api/hall");
//       setHalls(response.data);
//     } catch (error) {
//       console.error("Error fetching halls:", error);
//     }
//   };

//   const fetchShowtimes = async () => {
//     try {
//       const response = await axios.get("http://localhost:4011/api/showtime");
//       setShowtimes(response.data);
//     } catch (error) {
//       console.error("Error fetching showtimes:", error);
//     }
//   };

//   const fetchSeats = async () => {
//     if (!selectedHall) return;
//     try {
//       const response = await axios.get(
//         `http://localhost:4011/api/seat/hall/${selectedHall}`
//       );
//       setSeats(response.data);
//     } catch (error) {
//       console.error("Error fetching seats:", error);
//     }
//   };

//   const createSeats = async () => {
//     if (!selectedHall || !selectedShowtime || !totalRows || !seatsPerRow) {
//       alert("Please fill all fields.");
//       return;
//     }

//     try {
//       await axios.post("http://localhost:4011/api/seat", {
//         hallId: selectedHall,
//         showtimeId: selectedShowtime,
//         totalRows: parseInt(totalRows),
//         seatsPerRow: parseInt(seatsPerRow),
//       });

//       alert("Seats added successfully!");
//       setShowAddForm(false);
//       fetchSeats();
//       setTotalRows("");
//       setSeatsPerRow("");
//     } catch (error) {
//       console.error("Error creating seats:", error);
//       alert("Failed to create seats.");
//     }
//   };

//   const deleteSeat = async (seatId) => {
//     try {
//       await axios.delete(`http://localhost:4011/api/seat/${seatId}`);
//       alert("Seat deleted successfully");
//       fetchSeats();
//     } catch (error) {
//       console.error("Error deleting seat:", error);
//       alert("Failed to delete seat.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-black/95 text-white ">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-8">
//           <h2 className="text-2xl font-bold">Seat Management</h2>
//           <button
//             onClick={() => setShowAddForm(!showAddForm)}
//             className="bg-neutral-600 hover:bg-neutral-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center"
//           >
//             <Plus size={20} />
//             Add Seats
//           </button>
//         </div>

//         {/* Add Form */}
//         {showAddForm && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
//             <div className="bg-neutral-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
//               <div className="p-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div className="space-y-2">
//                     <label className="text-sm text-gray-300">Select Hall</label>
//                     <select
//                       value={selectedHall}
//                       onChange={(e) => setSelectedHall(e.target.value)}
//                       className="w-full bg-neutral-700 border-0 rounded-md p-3 text-white focus:ring-2 focus:ring-[#1DB954]"
//                     >
//                       <option value="">Select Hall</option>
//                       {halls.map((hall) => (
//                         <option
//                           key={hall._id}
//                           value={hall._id}
//                           className="text-sm text-gray-300"
//                         >
//                           {hall.hall_name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   <div className="space-y-2">
//                     <label className="text-sm text-gray-300">
//                       Select Showtime
//                     </label>
//                     <select
//                       value={selectedShowtime}
//                       onChange={(e) => setSelectedShowtime(e.target.value)}
//                       className="w-full bg-neutral-700 border-0 rounded-md p-3 text-white focus:ring-2 focus:ring-[#1DB954]"
//                     >
//                       <option value="">Select Showtime</option>
//                       {showtimes.map((showtimeId) => (
//                         <option
//                           key={showtimeId._id}
//                           value={showtimeId._id}
//                           className="text-sm text-gray-300"
//                         >
//                           {showtimeId.start_time} - {showtimeId.end_time}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   <div className="space-y-2">
//                     <label className="text-sm text-gray-300">Total Rows</label>
//                     <input
//                       type="number"
//                       value={totalRows}
//                       onChange={(e) => setTotalRows(e.target.value)}
//                       className="w-full bg-neutral-700 border-0 rounded-md p-3 text-white focus:ring-2 focus:ring-[#1DB954]"
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <label className="text-sm text-gray-300">
//                       Seats Per Row
//                     </label>
//                     <input
//                       type="number"
//                       value={seatsPerRow}
//                       onChange={(e) => setSeatsPerRow(e.target.value)}
//                       className="w-full bg-neutral-700 border-0 rounded-md p-3 text-white focus:ring-2 focus:ring-[#1DB954]"
//                     />
//                   </div>
//                 </div>

//                 <div className="flex justify-end gap-4 mt-4">
//                   <button
//                     onClick={() => setShowAddForm(false)}
//                     className="px-4 py-2 rounded-full border border-gray-600 hover:border-gray-400 transition-colors"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={createSeats}
//                     className="bg-[#1DB954] text-black px-6 py-2 rounded-full font-medium hover:bg-[#1ed760] transition-colors"
//                   >
//                     Create Seats
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Seats Table */}
//         <div className="bg-neutral-800 rounded-lg overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="bg-neutral-700">
//                   <th className="text-left p-4 text-sm font-medium text-gray-300">
//                     Hall
//                   </th>
//                   <th className="text-left p-4 text-sm font-medium text-gray-300">
//                     Showtime
//                   </th>
//                   <th className="text-left p-4 text-sm font-medium text-gray-300">
//                     Seat
//                   </th>
//                   <th className="text-left p-4 text-sm font-medium text-gray-300">
//                     Status
//                   </th>
//                   <th className="text-left p-4 text-sm font-medium text-gray-300">
//                     Action
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-neutral-700">
//                 {seats.map((seat) => (
//                   <tr
//                     key={seat._id}
//                     className="hover:bg-neutral-700/50 transition-colors"
//                   >
//                     <td className="p-4">
//                       {seat.hallId?.hall_name || "Unknown Hall"}
//                     </td>
//                     <td className="p-4">
//                       {seat.showtimeId
//                         ? `${seat.showtimeId.start_time} - ${seat.showtimeId.end_time}`
//                         : "Unknown Showtime"}
//                     </td>
//                     <td className="p-4">{seat.seatName}</td>
//                     <td className="p-4">
//                       <span
//                         className={`px-3 py-1 rounded-full text-sm ${
//                           seat.seatStatus
//                             ? "bg-red-500/20 text-red-400"
//                             : "bg-green-500/20 text-green-400"
//                         }`}
//                       >
//                         {seat.seatStatus ? "Booked" : "Available"}
//                       </span>
//                     </td>
//                     <td className="p-4">
//                       <button
//                         onClick={() => deleteSeat(seat._id)}
//                         className="text-red-400 hover:text-red-300 transition-colors"
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SeatPanel;
import axios from "axios";
import { Loader2, Plus, Trash2, X } from "lucide-react";
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHalls();
    fetchShowtimes();
  }, []);

  useEffect(() => {
    if (selectedHall && selectedShowtime) fetchSeats();
  }, [selectedHall, selectedShowtime]);

  const fetchHalls = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:4011/api/hall");
      setHalls(response.data);
      if (response.data.length > 0) {
        setSelectedHall(response.data[0]._id);
      }
    } catch (error) {
      console.error("Error fetching halls:", error);
      setError("Failed to load halls. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchShowtimes = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:4011/api/showtime");
      setShowtimes(response.data);
      if (response.data.length > 0) {
        setSelectedShowtime(response.data[0]._id);
      }
    } catch (error) {
      console.error("Error fetching showtimes:", error);
      setError("Failed to load showtimes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchSeats = async () => {
    if (!selectedHall || !selectedShowtime) return;

    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `http://localhost:4011/api/seat/hall/${selectedHall}?showtimeId=${selectedShowtime}`
      );

      if (response.data && Array.isArray(response.data)) {
        console.log("Seats data:", response.data);
        setSeats(response.data);
      } else {
        console.error("Invalid seats data format:", response.data);
        setSeats([]);
      }
    } catch (error) {
      console.error("Error fetching seats:", error);
      setError("Failed to load seats. Please try again.");
      setSeats([]);
    } finally {
      setLoading(false);
    }
  };

  const createSeats = async () => {
    if (!selectedHall || !selectedShowtime || !totalRows || !seatsPerRow) {
      alert("Please fill all fields.");
      return;
    }

    setLoading(true);
    setError(null);
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
      setError("Failed to create seats. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const deleteSeat = async (seatId) => {
    if (!confirm("Are you sure you want to delete this seat?")) return;

    setLoading(true);
    try {
      await axios.delete(`http://localhost:4011/api/seat/${seatId}`);
      alert("Seat deleted successfully");
      fetchSeats();
    } catch (error) {
      console.error("Error deleting seat:", error);
      alert("Failed to delete seat.");
    } finally {
      setLoading(false);
    }
  };

  const updateSeatStatus = async (seatId, newStatus) => {
    try {
      await axios.patch(`http://localhost:4011/api/seat/${seatId}`, {
        seatStatus: newStatus,
      });
      fetchSeats();
    } catch (error) {
      console.error("Error updating seat status:", error);
      alert("Failed to update seat status.");
    }
  };

  // Organize seats into a grid for the visual layout
  const organizeSeatsGrid = () => {
    if (!seats || seats.length === 0) return [];

    // Group seats by row
    const seatsByRow = {};
    seats.forEach((seat) => {
      const rowLabel = seat.seatName ? seat.seatName.charAt(0) : null;
      if (!rowLabel) return;

      if (!seatsByRow[rowLabel]) {
        seatsByRow[rowLabel] = [];
      }
      seatsByRow[rowLabel].push(seat);
    });

    // Sort each row by seat number
    Object.keys(seatsByRow).forEach((row) => {
      seatsByRow[row].sort((a, b) => {
        const numA = parseInt(a.seatName.substring(1));
        const numB = parseInt(b.seatName.substring(1));
        return numA - numB;
      });
    });

    // Convert to array of rows
    const sortedRows = Object.keys(seatsByRow).sort();
    return sortedRows.map((row) => ({
      rowLabel: row,
      seats: seatsByRow[row],
    }));
  };

  const seatGrid = organizeSeatsGrid();

  const getHallName = (hallId) => {
    const hall = halls.find((h) => h._id === hallId);
    return hall ? hall.hall_name : "Unknown Hall";
  };

  const getShowtimeName = (showtimeId) => {
    const showtime = showtimes.find((s) => s._id === showtimeId);
    return showtime
      ? `${showtime.start_time} - ${showtime.end_time}`
      : "Unknown Showtime";
  };

  return (
    <div className="min-h-screen bg-black/95 text-white">
      <div className="max-w-6xl mx-auto p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Seat Management</h2>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-neutral-600 hover:bg-neutral-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center"
          >
            <Plus size={20} className="mr-2" />
            Add Seats
          </button>
        </div>

        {/* Filter Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 bg-neutral-800 p-4 rounded-lg">
          <div className="space-y-2">
            <label className="text-sm text-gray-300">Select Hall</label>
            <select
              value={selectedHall}
              onChange={(e) => setSelectedHall(e.target.value)}
              className="w-full bg-neutral-700 border-0 rounded-md p-3 text-white focus:ring-2 focus:ring-[#1DB954]"
            >
              <option value="">Select Hall</option>
              {halls.map((hall) => (
                <option
                  key={hall._id}
                  value={hall._id}
                  className="text-sm text-gray-300"
                >
                  {hall.hall_name}
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
                <option
                  key={showtime._id}
                  value={showtime._id}
                  className="text-sm text-gray-300"
                >
                  {showtime.start_time} - {showtime.end_time}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-900/20 border border-red-800 text-red-300 p-4 rounded-lg mb-6">
            <p>{error}</p>
          </div>
        )}

        {/* Loading Indicator */}
        {loading && (
          <div className="flex justify-center items-center my-8">
            <Loader2 className="animate-spin h-8 w-8 text-[#1DB954]" />
          </div>
        )}

        {/* Seat Layout Preview */}
        {!loading && selectedHall && selectedShowtime && seats.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">
              Seat Layout: {getHallName(selectedHall)} |{" "}
              {getShowtimeName(selectedShowtime)}
            </h3>

            <div className="bg-neutral-800 p-8 rounded-lg">
              {/* Screen */}
              <div className="mb-10 relative">
                <div className="w-4/5 mx-auto h-8 bg-neutral-700 rounded-lg mb-2 transform perspective-500 rotateX-45 shadow-lg"></div>
                <p className="text-center text-gray-400 text-sm">SCREEN</p>
              </div>

              {/* Seat Grid */}
              <div className="flex flex-col gap-4 items-center">
                {seatGrid.map((row) => (
                  <div key={row.rowLabel} className="flex items-center gap-2">
                    <div className="w-6 text-gray-400 font-bold">
                      {row.rowLabel}
                    </div>
                    <div className="flex gap-2">
                      {row.seats.map((seat) => (
                        <button
                          key={seat._id}
                          onClick={() =>
                            updateSeatStatus(seat._id, !seat.seatStatus)
                          }
                          className={`w-8 h-8 rounded text-xs font-medium flex items-center justify-center transition-all ${
                            seat.seatStatus
                              ? "bg-red-500/40 text-red-300 cursor-not-allowed"
                              : "bg-green-500/40 text-green-300 hover:bg-green-500/60"
                          }`}
                          title={seat.seatStatus ? "Booked" : "Available"}
                        >
                          {parseInt(seat.seatName.substring(1))}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div className="flex gap-6 justify-center mt-10">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500/40 rounded"></div>
                  <span className="text-sm text-gray-300">Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500/40 rounded"></div>
                  <span className="text-sm text-gray-300">Booked</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* No Seats Message */}
        {!loading && selectedHall && selectedShowtime && seats.length === 0 && (
          <div className="bg-neutral-800 p-6 rounded-lg mb-8 text-center">
            <p className="text-gray-400">
              No seats found for this hall and showtime.
            </p>
            <button
              onClick={() => setShowAddForm(true)}
              className="mt-4 bg-[#1DB954]/20 text-[#1DB954] px-4 py-2 rounded-lg hover:bg-[#1DB954]/30 transition-colors"
            >
              Create Seats
            </button>
          </div>
        )}

        {/* Add Form Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4">
            <div className="bg-neutral-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold">Create New Seats</h3>
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <X size={24} />
                  </button>
                </div>

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
                        <option
                          key={hall._id}
                          value={hall._id}
                          className="text-sm text-gray-300"
                        >
                          {hall.hall_name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-gray-300">
                      Select Showtime
                    </label>
                    <select
                      value={selectedShowtime}
                      onChange={(e) => setSelectedShowtime(e.target.value)}
                      className="w-full bg-neutral-700 border-0 rounded-md p-3 text-white focus:ring-2 focus:ring-[#1DB954]"
                    >
                      <option value="">Select Showtime</option>
                      {showtimes.map((showtime) => (
                        <option
                          key={showtime._id}
                          value={showtime._id}
                          className="text-sm text-gray-300"
                        >
                          {showtime.start_time} - {showtime.end_time}
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
                      placeholder="e.g. 10"
                      min="1"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-gray-300">
                      Seats Per Row
                    </label>
                    <input
                      type="number"
                      value={seatsPerRow}
                      onChange={(e) => setSeatsPerRow(e.target.value)}
                      className="w-full bg-neutral-700 border-0 rounded-md p-3 text-white focus:ring-2 focus:ring-[#1DB954]"
                      placeholder="e.g. 12"
                      min="1"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-4 mt-6">
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="px-4 py-2 rounded-full border border-gray-600 hover:border-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={createSeats}
                    disabled={loading}
                    className="bg-[#1DB954] text-black px-6 py-2 rounded-full font-medium hover:bg-[#1ed760] transition-colors flex items-center"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={16} className="mr-2 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      "Create Seats"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Seats Table */}
        <div className="bg-neutral-800 rounded-lg overflow-hidden">
          <div className="p-4 bg-neutral-700">
            <h3 className="text-lg font-semibold">All Seats</h3>
          </div>
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
                {seats.length > 0 ? (
                  seats.map((seat) => (
                    <tr
                      key={seat._id}
                      className="hover:bg-neutral-700/50 transition-colors"
                    >
                      <td className="p-4">
                        {getHallName(seat.hallId.hall_name)}
                      </td>
                      <td className="p-4">
                        {getShowtimeName(seat.showtimeId.start_time)}
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
                        <div className="flex gap-3">
                          <button
                            onClick={() =>
                              updateSeatStatus(seat._id, !seat.seatStatus)
                            }
                            className={`text-sm px-2 py-1 rounded ${
                              seat.seatStatus
                                ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                                : "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                            }`}
                          >
                            {seat.seatStatus ? "Make Available" : "Mark Booked"}
                          </button>
                          <button
                            onClick={() => deleteSeat(seat._id)}
                            className="text-red-400 hover:text-red-300 transition-colors"
                          >
                            <Trash2 />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="p-4 text-center text-gray-400">
                      {loading ? "Loading seats..." : "No seats found"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatPanel;
