import axios from "axios";
import html2canvas from "html2canvas";
import {
  Calendar,
  Clock,
  Download,
  MapPin,
  QrCode,
  Sofa,
  Ticket as TicketIcon,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

const MovieTicket = () => {
  const { bookingId } = useParams(); // Get booking ID from URL
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const ticketRef = useRef(null);

  // Fetch booking details as a ticket
  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4011/api/bookings/${bookingId}`
        );
        setTicket(response.data);
      } catch (error) {
        console.error("Error fetching ticket:", error);
      } finally {
        setLoading(false);
      }
    };

    if (bookingId) {
      fetchBooking();
    }
  }, [bookingId]);

  // Save ticket as an image
  const saveTicket = async () => {
    if (ticketRef.current) {
      try {
        const canvas = await html2canvas(ticketRef.current);
        const image = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = image;
        link.download = `${ticket?.ticketId}-ticket.png`;
        link.click();
      } catch (error) {
        console.error("Error saving ticket:", error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black text-white">
        <div className="animate-pulse">Loading Ticket...</div>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black text-red-500">
        <p>Ticket not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-900 to-black p-4">
      <div className="max-w-2xl mx-auto">
        {/* Save Button */}
        <button
          onClick={saveTicket}
          className="mb-6 flex items-center gap-2 bg-green-500 text-black px-6 py-3 rounded-full hover:bg-green-600 transition-colors mx-auto"
        >
          <Download size={20} />
          <span className="font-semibold">Save Ticket</span>
        </button>

        {/* Ticket Container */}
        <div
          ref={ticketRef}
          className="bg-white rounded-xl overflow-hidden shadow-2xl"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 p-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-white">Movie Ticket</h1>
              <TicketIcon className="text-white" size={24} />
            </div>
          </div>

          {/* Main Content */}
          <div className="p-6 bg-neutral-50">
            <div className="flex gap-6">
              {/* Movie Poster */}
              <div className="w-1/3">
                <img
                  src={ticket.movie_image}
                  alt={ticket.movie_name}
                  className="w-full h-auto rounded-lg shadow-md"
                />
              </div>

              {/* Movie Details */}
              <div className="w-2/3 space-y-4">
                <h2 className="text-2xl font-bold text-neutral-800">
                  {ticket.movie_name}
                </h2>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-neutral-600">
                    <Calendar size={18} />
                    <span>{ticket.date}</span>
                  </div>

                  <div className="flex items-center gap-2 text-neutral-600">
                    <Clock size={18} />
                    <span>{ticket.showtime}</span>
                  </div>

                  <div className="flex items-center gap-2 text-neutral-600">
                    <MapPin size={18} />
                    <span>{ticket.hall_name}</span>
                  </div>

                  <div className="flex items-center gap-2 text-neutral-600">
                    <Sofa size={18} />
                    <span>Seats: {ticket.seats.join(", ")}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="my-6 border-t border-dashed border-neutral-300 relative">
              <div className="absolute -left-8 -mt-3 w-6 h-6 rounded-full bg-black" />
              <div className="absolute -right-8 -mt-3 w-6 h-6 rounded-full bg-black" />
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-neutral-500">Ticket ID</p>
                <p className="font-mono font-medium text-neutral-800">
                  {ticket.ticketId}
                </p>
              </div>

              <div className="text-right">
                <p className="text-sm text-neutral-500">Total Amount</p>
                <p className="font-bold text-neutral-800">
                  {ticket.totalAmount}
                </p>
              </div>
            </div>
          </div>

          {/* QR Code Section */}
          <div className="bg-neutral-100 p-4 flex justify-center border-t border-neutral-200">
            <QrCode size={100} className="text-neutral-800" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieTicket;
