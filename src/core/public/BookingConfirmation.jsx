import axios from "axios";
import { Download, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
const BookingConfirmation = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    if (!bookingId || bookingId === "undefined") {
      console.error("Invalid booking ID:", bookingId);
      navigate("/");
      return;
    }

    const fetchBooking = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4011/api/booking/${bookingId}`
        );
        setBooking(response.data);
      } catch (error) {
        console.error("Error fetching booking details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [bookingId, navigate]);

  const handleDownloadTicket = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4011/api//send-booking-email/:bookingId`
      );
      if (response.data.ticketPath) {
        window.open(
          `http://localhost:4011${response.data.ticketPath}`,
          "_blank"
        );
      }
    } catch (error) {
      console.error("Error downloading ticket:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-900">
        <Loader2 className="w-12 h-12 text-orange-500 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-gray-800 text-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-green-400">
          Booking Confirmed! 🎟
        </h2>
        {booking && (
          <div className="mt-4">
            <p>
              <strong>Movie:</strong> {booking.showtimeId.movieId.movie_name}
            </p>
            <p>
              <strong>Hall:</strong> {booking.showtimeId.hallId.hall_name}
            </p>
            <p>
              <strong>Showtime:</strong> {booking.showtimeId.start_time} -{" "}
              {booking.showtimeId.end_time}
            </p>
            <p>
              <strong>Seats:</strong>{" "}
              {booking.seats.map((seat) => seat.seatName).join(", ")}
            </p>
            <p>
              <strong>Total Price:</strong> ₹{booking.total_price}
            </p>
            <p>
              <strong>Payment Status:</strong> {booking.payment_status}
            </p>

            <button
              onClick={handleDownloadTicket}
              className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-black py-2 rounded flex items-center justify-center gap-2"
            >
              <Download size={20} /> Download Ticket
            </button>

            <button
              onClick={() => navigate("/my-bookings")}
              className="mt-4 w-full bg-green-500 hover:bg-green-600 text-black py-2 rounded"
            >
              View My Bookings
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default BookingConfirmation;
