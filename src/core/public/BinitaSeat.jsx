import { Calendar, Clock, Info } from "lucide-react";
import React, { useEffect, useState } from "react";

const TestPreparationSeatBooking = () => {
  const [seats, setSeats] = useState([]); // All seats in a single array
  const [error, setError] = useState("");
  const [popupMessage, setPopupMessage] = useState("");

  // Fetch the seat status from the backend
  useEffect(() => {
    const fetchSeatStatus = async () => {
      try {
        const response = await fetch("http://localhost:4011/api/seat/status", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        // Combine both available and unavailable seats in one array
        const combinedSeats = [
          ...data.availableSeats.map((seat) => ({
            ...seat,
            status: "Available",
          })),
          ...data.unavailableSeats.map((seat) => ({
            ...seat,
            status: "Booked",
          })),
        ];
        setSeats(combinedSeats);
      } catch (err) {
        console.error("Error fetching seat status:", err);
        setError("Failed to fetch the seat status.");
      }
    };

    fetchSeatStatus();
  }, []);

  // Handle seat booking click
  const handleSeatBooking = async (seatNumber) => {
    try {
      const response = await fetch("http://localhost:4011/api/seat/book", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ seatNumber }), // Send seat number to book
      });

      if (!response.ok) {
        throw new Error("Failed to book the seat");
      }

      // Update the seat status locally
      setSeats((prevSeats) =>
        prevSeats.map((seat) =>
          seat.seatNumber === seatNumber ? { ...seat, status: "Booked" } : seat
        )
      );

      // Calculate the nearest Saturday date
      const today = new Date();
      const daysUntilSaturday = (6 - today.getDay() + 7) % 7; // Ensure Saturday is calculated correctly
      const nextSaturday = new Date(today);
      nextSaturday.setDate(today.getDate() + daysUntilSaturday);

      // Format the Saturday date
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      const formattedDate = nextSaturday.toLocaleDateString(undefined, options);

      // Show confirmation popup message
      setPopupMessage(
        `Seat booked successfully for this Saturday (${formattedDate})!`
      );
    } catch (err) {
      console.error("Error booking seat:", err);
      setError("Failed to book the seat.");
    }
  };

  // Enhanced Seat Component with Monitor
  const ComputerSeat = ({ seat, onSelect }) => (
    <div
      onClick={() => seat.status === "Available" && onSelect(seat.seatNumber)}
      className={`relative group transition-transform duration-300 
        ${seat.status === "Available" && "hover:scale-105 cursor-pointer"} p-2`}
    >
      {/* Monitor */}
      <div
        className={`w-16 h-12 mx-auto mb-1 rounded-t-lg border-4 
        ${
          seat.status === "Booked"
            ? "border-gray-300 bg-gray-200"
            : seat.status === "Selected"
            ? "border-red-500 bg-red-100"
            : "border-blue-300 bg-blue-50"
        }
        transform group-hover:scale-105 transition-all duration-300`}
      >
        <div
          className={`h-2 w-8 mx-auto mt-1 rounded
          ${
            seat.status === "Booked"
              ? "bg-gray-400"
              : seat.status === "Selected"
              ? "bg-red-600"
              : "bg-blue-400"
          }`}
        ></div>
      </div>
      {/* Stand */}
      <div
        className={`w-4 h-4 mx-auto 
        ${
          seat.status === "Booked"
            ? "bg-gray-300"
            : seat.status === "Selected"
            ? "bg-red-500"
            : "bg-blue-300"
        }`}
      ></div>
      {/* Desk */}
      <div
        className={`w-20 h-6 mx-auto rounded-lg 
        ${
          seat.status === "Booked"
            ? "bg-gray-200"
            : seat.status === "Selected"
            ? "bg-red-200"
            : "bg-blue-100"
        }
        shadow-md transform group-hover:translate-y-1 transition-all duration-300`}
      >
        <span
          className={`text-xs font-medium flex items-center justify-center h-full
          ${
            seat.status === "Booked" || seat.status === "Available"
              ? "opacity-0"
              : "opacity-100 text-blue-700"
          }`}
        >
          {seat.seatNumber}
        </span>
      </div>
      {/* Chair */}
      <div
        className={`w-12 h-8 mx-auto mt-1 rounded-b-lg
        ${
          seat.status === "Booked"
            ? "bg-gray-300"
            : seat.status === "Selected"
            ? "bg-red-400"
            : "bg-blue-200"
        }
        transform group-hover:translate-y-1 transition-all duration-300`}
      >
        {(seat.status === "Selected" || seat.status === "Booked") && (
          <div
            className="w-6 h-6 mx-auto bg-current rounded-full 
            transform -translate-y-1 animate-bounce"
          ></div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Stylish Header */}
        <div className="bg-white shadow-xl rounded-2xl p-6 grid md:grid-cols-3 gap-4 items-center">
          {[
            {
              Icon: Calendar,
              title: "Saturday Tests",
              subtitle: "Weekly Mock",
              color: "blue",
            },
            {
              Icon: Clock,
              title: "9:00 - 11:30",
              subtitle: "Fixed Time",
              color: "green",
            },
            {
              Icon: Info,
              title: "Limited Seats",
              subtitle: "Book Early",
              color: "red",
            },
          ].map(({ Icon, title, subtitle, color }, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <Icon
                className={`text-${color}-600 w-10 h-10 transform hover:rotate-6 transition-transform`}
              />
              <div>
                <h3 className={`text-base font-bold text-${color}-800`}>
                  {title}
                </h3>
                <p className="text-sm text-gray-600">{subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        <h1 className="text-3xl font-extrabold text-center text-blue-900 tracking-tight">
          Mock Test Seat Booking
        </h1>

        {/* Error and Success Messages */}
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-r-lg animate-pulse">
            {error}
          </div>
        )}

        {popupMessage && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-800 p-4 rounded-r-lg animate-bounce">
            {popupMessage}
          </div>
        )}

        {/* Display All Seats (Available & Booked mixed together) */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Limited Seat Available
          </h2>
          {seats.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {seats.map((seat) => (
                <ComputerSeat
                  key={seat._id}
                  seat={seat}
                  onSelect={handleSeatBooking}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No seats available or booked.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestPreparationSeatBooking;
