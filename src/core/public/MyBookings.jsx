import axios from "axios";
import {
  Calendar,
  CheckCircle,
  Clock,
  TicketIcon,
  XCircle,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/NavBar";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:4011/api/booking", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Fetched Bookings:", response.data); //  Debugging API response
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };
    fetchBookings();
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen  bg-neutral-800 pt-28 pb-10">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-extrabold text-white text-center mb-8">
            🎟️ My Movie Bookings
          </h2>

          {bookings.length === 0 ? (
            <p className="text-center text-neutral-400">No bookings found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {bookings.map((booking) => (
                <div
                  key={booking._id}
                  className="bg-neutral-800 p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:bg-white/20"
                >
                  {/* Movie Details */}
                  <div className="flex items-center gap-4">
                    {booking.showtimeId?.movieId?.movie_image ? (
                      <img
                        src={booking.showtimeId.movieId.movie_image}
                        alt={booking.showtimeId.movieId.movie_name}
                        className="w-16 h-24 rounded-lg shadow-lg"
                      />
                    ) : (
                      <div className="w-16 h-24 bg-gray-700 rounded-lg flex items-center justify-center text-gray-400">
                        🎬
                      </div>
                    )}
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {booking.showtimeId?.movieId?.movie_name ||
                          "Unknown Movie"}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        {booking.showtimeId?.movieId?.duration ||
                          "Duration N/A"}
                      </p>
                    </div>
                  </div>

                  {/* Booking Details */}
                  <div className="mt-4 space-y-2 text-gray-300">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-blue-400" />
                      <span>{booking.showtimeId?.date || "N/A"}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-green-400" />
                      <span>
                        {booking.showtimeId?.start_time} -{" "}
                        {booking.showtimeId?.end_time}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <TicketIcon className="w-5 h-5 text-yellow-400" />
                      <span>
                        Seats:{" "}
                        {booking.seats
                          ?.map((seat) => seat.seatName)
                          .join(", ") || "N/A"}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-lg font-semibold text-white">
                        Rs.{booking.total_price || "0"}
                      </span>
                    </div>
                  </div>

                  {/* Payment Status */}
                  <div className="mt-4">
                    {booking.payment_status === "Paid" ? (
                      <span className="flex items-center text-green-500 font-semibold">
                        <CheckCircle className="w-5 h-5 mr-1" />
                        Payment Successful
                      </span>
                    ) : (
                      <span className="flex items-center text-red-500 font-semibold">
                        <XCircle className="w-5 h-5 mr-1" />
                        Payment Pending
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyBookings;
