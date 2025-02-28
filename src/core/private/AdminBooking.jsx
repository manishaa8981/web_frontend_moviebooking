import axios from "axios";
import { Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  // Function to get auth token
  const getAuthToken = () => {
    return localStorage.getItem("token"); // Retrieve token from localStorage
  };

  // Fetch all bookings with auth token
  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:4011/api/booking", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Fetched Bookings:", response.data); //  Debug log
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete booking with auth token
  const handleDelete = async (bookingId) => {
    if (!window.confirm("Are you sure you want to delete this booking?"))
      return;

    try {
      const token = getAuthToken();
      await axios.delete(`http://localhost:4011/api/booking/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` }, // Attach token
      });
      setBookings(bookings.filter((booking) => booking._id !== bookingId));
    } catch (error) {
      console.error("Error deleting booking:", error);
      alert("Failed to delete booking. Unauthorized access.");
    }
  };

  return (
    <div className="p-6 bg-black/95 min-h-screen text-white">
      <h2 className="text-2xl font-bold mb-4">Admin - Manage Bookings</h2>

      {loading ? (
        <p>Loading bookings...</p>
      ) : (
        <div className="bg-zinc-900 rounded-lg shadow-lg overflow-hidden">
          <table className="w-full ">
            <thead>
              <tr className="bg-neutral-700">
                <th className="p-3 border border-gray-800">User</th>
                <th className="p-3 border border-gray-800">Movie</th>
                <th className="p-3 border border-gray-800">Hall</th>
                <th className="p-3 border border-gray-800">Seats</th>
                <th className="p-3 border border-gray-800">Show Date</th>
                <th className="p-3 border border-gray-700">Show Time</th>
                <th className="p-3 border border-gray-700">Total Price</th>
                <th className="p-3 border border-gray-700">Status</th>
                <th className="p-3 border border-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr
                  key={booking._id}
                  className="border-b border-neutral-800 hover:bg-neutral-700/50 transition"
                >
                  <td className="p-3 border border-gray-700">
                    {booking.userId?.username || "Unknown"}
                  </td>
                  <td className="p-3 border border-gray-700">
                    {booking.showtimeId?.movieId?.movie_name || "Unknown"}
                  </td>
                  <td className="p-3 border border-gray-700">
                    {booking.showtimeId?.hallId?.hall_name || "Unknown"}
                  </td>
                  <td className="p-3 border border-gray-700">
                    {booking.seats?.length > 0
                      ? booking.seats.map((seat) => seat.seatName).join(", ")
                      : "No Seats"}
                  </td>
                  <td className="p-3 border border-gray-700">
                    {booking.showtimeId?.start_time &&
                    booking.showtimeId?.end_time
                      ? `${booking.showtimeId.start_time} - ${booking.showtimeId.end_time}`
                      : "No Show Time"}
                  </td>
                  <td className="p-3 border border-gray-700">
                    {booking.showtimeId?.start_time} -{" "}
                    {booking.showtimeId?.end_time}
                  </td>
                  <td className="p-3 border border-gray-700">
                    ₹{booking.total_price || 0}
                  </td>
                  <td className="p-3 border border-gray-700">
                    {booking.payment_status}
                  </td>
                  <td className="p-3 border border-gray-700">
                    <button
                      onClick={() => handleDelete(booking._id)}
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
      )}
    </div>
  );
};

export default AdminBookings;
