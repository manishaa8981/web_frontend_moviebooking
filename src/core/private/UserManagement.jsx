import axios from "axios";
import jwt_decode from "jwt-decode"; // ✅ Import jwt-decode
import { Search, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [decodedUser, setDecodedUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwt_decode(token);
        console.log("Decoded JWT:", decoded);
        setDecodedUser(decoded);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  // ✅ Fetch all bookings
  const fetchBookings = async () => {
    try {
      const response = await axios.get("http://localhost:4011/api/booking");
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast.error("Failed to fetch bookings.");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="bg-black text-white min-h-screen p-8">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-6 text-green-400">
        Admin - Manage Bookings 🎬
      </h1>

      {/* Search Bar */}
      <div className="flex mb-4 space-x-4">
        <input
          type="text"
          placeholder="Search bookings..."
          className="bg-gray-800 text-white px-4 py-2 rounded w-full"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="bg-green-500 p-2 rounded">
          <Search className="text-white" />
        </button>
      </div>

      {/* Bookings Table */}
      <div className="overflow-auto bg-gray-900 p-4 rounded">
        <table className="w-full border border-gray-700">
          <thead className="bg-green-600 text-black">
            <tr>
              <th className="p-2">User</th>
              <th className="p-2">Movie</th>
              <th className="p-2">Hall</th>
              <th className="p-2">Seats</th>
              <th className="p-2">Show Date</th>
              <th className="p-2">Show Time</th>
              <th className="p-2">Total Price</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings
              .filter((booking) =>
                booking.showtimeId.movieId.movie_name
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
              )
              .map((booking) => (
                <tr key={booking._id} className="border-b border-gray-700">
                  {/* ✅ Show username if available, else show "Unknown" */}
                  <td className="p-2">
                    {booking.customerId?.username ||
                      (booking.customerId &&
                      booking.customerId._id === decodedUser?.id
                        ? decodedUser.username
                        : "Manisha")}
                  </td>
                  <td className="p-2">
                    {booking.showtimeId.movieId.movie_name}
                  </td>
                  <td className="p-2">{booking.showtimeId.hallId.hall_name}</td>
                  <td className="p-2">
                    {booking.seats.map((seat) => seat.seatName).join(", ")}
                  </td>
                  <td className="p-2">{booking.showtimeId.date}</td>
                  <td className="p-2">
                    {booking.showtimeId.start_time} -{" "}
                    {booking.showtimeId.end_time}
                  </td>
                  <td className="p-2">₹{booking.total_price}</td>
                  <td className="p-2">{booking.payment_status}</td>
                  <td className="p-2">
                    <button
                      className="bg-red-600 px-2 py-1 rounded"
                      onClick={() => console.log("Delete booking", booking._id)}
                    >
                      <Trash className="text-white" size={16} />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
