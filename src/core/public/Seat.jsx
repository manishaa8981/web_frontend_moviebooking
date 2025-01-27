// import { ArrowLeft } from "lucide-react";
// import React, { useState } from "react";

// const TheaterSeats = () => {
//   const [selectedSeats, setSelectedSeats] = useState([]);

//   const showTimes = [
//     { time: "08:20 AM", language: "Hindi" },
//     { time: "11:45 AM", language: "Hindi" },
//     { time: "04:00 PM", language: "Hindi", selected: true },
//     { time: "07:05 PM", language: "Hindi" },
//     { time: "10:10 PM", language: "Hindi" },
//   ];

//   const rows = {
//     EXECUTIVE: ["N", "O"],
//     CLUB: ["M", "L", "K", "J", "I", "H", "G"],
//     ROYAL: ["F", "E", "D", "C", "B", "A"],
//   };

//   const generateSeats = (start, end) => {
//     return Array.from({ length: end - start + 1 }, (_, i) => start + i);
//   };

//   const handleSeatClick = (seat) => {
//     if (selectedSeats.includes(seat)) {
//       setSelectedSeats(selectedSeats.filter((s) => s !== seat));
//     } else {
//       setSelectedSeats([...selectedSeats, seat]);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white shadow-sm">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="flex items-center h-16">
//             <button className="flex items-center text-gray-700">
//               <ArrowLeft className="w-5 h-5 mr-2" />
//               BACK
//             </button>
//             <div className="ml-8 flex space-x-4">
//               <span className="font-medium text-yellow-500">SELECT SEATS</span>
//               <span className="text-gray-400">CHOOSE CINEMA</span>
//               <span className="text-gray-400">GRAB FOOD</span>
//               <span className="text-gray-400">PAYMENT</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Show times */}
//       <div className="bg-white mt-4 p-4">
//         <div className="flex items-center space-x-4">
//           <div className="relative">
//             <button className="flex items-center space-x-2 px-4 py-2 border rounded-md">
//               <span>17 Jan, Friday</span>
//             </button>
//           </div>
//           <div className="flex space-x-4">
//             {showTimes.map((show, index) => (
//               <div
//                 key={index}
//                 className={`px-4 py-2 rounded-md text-sm ${
//                   show.selected
//                     ? "border-b-2 border-yellow-500 text-yellow-500"
//                     : "text-gray-600"
//                 }`}
//               >
//                 <div className="text-xs text-gray-500">{show.language}</div>
//                 <div>{show.time}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Seating layout */}
//       <div className="max-w-5xl mx-auto mt-8 px-4">
//         {/* Screen */}
//         <div className="w-full text-center mb-12">
//           <div className="h-4 bg-gradient-to-b from-gray-300 to-transparent rounded-t-full mx-auto max-w-3xl"></div>
//           <div className="mt-4 text-sm text-gray-500">SCREEN</div>
//         </div>

//         {/* Legend */}
//         <div className="flex justify-center space-x-8 mb-8 text-sm">
//           <div className="flex items-center">
//             <div className="w-4 h-4 border rounded mr-2"></div>
//             Available
//           </div>
//           <div className="flex items-center">
//             <div className="w-4 h-4 bg-yellow-500 rounded mr-2"></div>
//             Selected
//           </div>
//           <div className="flex items-center">
//             <div className="w-4 h-4 bg-red-600 rounded mr-2"></div>
//             Occupied
//           </div>
//         </div>

//         {/* Seats */}
//         {Object.entries(rows).map(([section, rowLetters]) => (
//           <div key={section} className="mb-8">
//             <div className="text-sm font-medium text-gray-500 mb-4">
//               {section} (₹112.00)
//             </div>
//             {rowLetters.map((letter) => (
//               <div key={letter} className="flex items-center mb-2">
//                 <div className="w-6 text-sm text-gray-500">{letter}</div>
//                 <div className="flex-1 flex justify-center space-x-1">
//                   {generateSeats(1, 16).map((num) => (
//                     <button
//                       key={`${letter}${num}`}
//                       className={`w-6 h-6 text-xs rounded ${
//                         selectedSeats.includes(`${letter}${num}`)
//                           ? "bg-yellow-500 text-white"
//                           : "border hover:bg-gray-50"
//                       }`}
//                       onClick={() => handleSeatClick(`${letter}${num}`)}
//                     >
//                       {num}
//                     </button>
//                   ))}
//                 </div>
//                 <div className="w-6 text-sm text-gray-500">{letter}</div>
//               </div>
//             ))}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TheaterSeats;
import { Calendar, Clock, Info } from "lucide-react";
import React, { useEffect, useState } from "react";

const TheaterSeats = () => {
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

export default TheaterSeats;
