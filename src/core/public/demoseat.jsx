import axios from "axios";
import { useEffect, useState } from "react";

const SeatBooking = ({ selectedShowtime, movieDetails, currentUser }) => {
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch seats for a specific showtime
  const fetchSeats = async (showtimeId) => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/seats?showtimeId=${showtimeId}`);
      setSeats(response.data); // Update seat map
    } catch (error) {
      console.error("Error fetching seats", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle seat selection
  const handleSeatSelect = async (seatId) => {
    try {
      await axios.post("/api/seats/select", {
        showtimeId: selectedShowtime,
        seatIds: [seatId],
      });
      setSelectedSeats((prev) => [...prev, seatId]); // Add to selected seats
      updateSeatStatus(seatId, "selected"); // Update local state
    } catch (error) {
      console.error("Error selecting seat", error);
    }
  };

  // Confirm booking
  const handleBooking = async () => {
    try {
      await axios.post("/api/seats/confirm", {
        userId: currentUser.id,
        showtimeId: selectedShowtime,
        seatIds: selectedSeats,
      });
      alert("Booking successful!");
      fetchSeats(selectedShowtime); // Refresh seat map after booking
      setSelectedSeats([]); // Reset selected seats
    } catch (error) {
      console.error("Error confirming booking", error);
    }
  };

  // Update local seat status
  const updateSeatStatus = (seatId, status) => {
    setSeats((prevSeats) =>
      prevSeats.map((seat) => (seat.id === seatId ? { ...seat, status } : seat))
    );
  };

  // Calculate total price
  const calculateTotalPrice = () => {
    const pricePerSeat = 300; // Adjust based on hall/section
    return selectedSeats.length * pricePerSeat;
  };

  // Fetch seats when showtime changes
  useEffect(() => {
    if (selectedShowtime) {
      fetchSeats(selectedShowtime);
    }
  }, [selectedShowtime]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Movie Details */}
      <div className="bg-white mt-4 p-4">
        {/* <h2 className="text-2xl font-bold">{movieDetails.title}</h2> */}
        {/* <p className="text-gray-500">{movieDetails.description}</p> */}
      </div>

      {/* Seat Map */}
      <div className="max-w-5xl mx-auto mt-8 px-4">
        {/* Screen */}
        <div className="w-full text-center mb-12">
          <div className="h-4 bg-gradient-to-b from-gray-300 to-transparent rounded-t-full mx-auto max-w-3xl"></div>
          <div className="mt-4 text-sm text-gray-500">SCREEN</div>
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="text-center text-gray-500">Loading seats...</div>
        ) : (
          <>
            <div className="grid grid-cols-10 gap-4 justify-center">
              {seats.map((seat) => (
                <button
                  key={seat.id}
                  className={`w-12 h-12 rounded-lg ${
                    seat.status === "selected"
                      ? "bg-yellow-500 text-black cursor-pointer"
                      : seat.status === "reserved"
                      ? "bg-red-500 text-white cursor-not-allowed"
                      : "bg-green-500 text-white cursor-pointer hover:bg-green-600"
                  }`}
                  disabled={seat.status !== "available"}
                  onClick={() => handleSeatSelect(seat.id)}
                >
                  {seat.number}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Selection Summary */}
      <div className="max-w-5xl mx-auto mt-8 px-4">
        {selectedSeats.length > 0 && (
          <div className="p-4 bg-white shadow-md rounded-lg">
            <h3 className="text-lg font-semibold">Booking Summary</h3>
            <p>Selected Seats: {selectedSeats.join(", ")}</p>
            <p>Total Price: ₹{calculateTotalPrice()}</p>
            <button
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
              onClick={handleBooking}
            >
              Confirm Booking
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SeatBooking;

// import axios from "axios";
// import React, { useEffect, useState } from "react";

// const SeatSelection = ({ selectedShowtime, currentUser }) => {
//   const [seats, setSeats] = useState([]); // Holds the seat map
//   const [selectedSeats, setSelectedSeats] = useState([]); // Tracks selected seats

//   // Fetch seats for a specific showtime
//   const fetchSeats = async (showtimeId) => {
//     try {
//       const response = await axios.get(`/api/seats?showtimeId=${showtimeId}`);
//       setSeats(response.data); // Update seat map
//     } catch (error) {
//       console.error("Error fetching seats", error);
//     }
//   };

//   // Handle seat selection
//   const handleSeatSelect = async (seatId) => {
//     try {
//       await axios.post("/api/seats/select", {
//         showtimeId: selectedShowtime,
//         seatIds: [seatId],
//       });
//       setSelectedSeats((prev) => [...prev, seatId]); // Add to selected seats
//       updateSeatStatus(seatId, "selected"); // Update local state
//     } catch (error) {
//       console.error("Error selecting seat", error);
//     }
//   };

//   // Confirm booking
//   const handleBooking = async () => {
//     try {
//       await axios.post("/api/seats/confirm", {
//         userId: currentUser.id,
//         showtimeId: selectedShowtime,
//         seatIds: selectedSeats,
//       });
//       alert("Booking successful!");
//       fetchSeats(selectedShowtime); // Refresh seat map after booking
//       setSelectedSeats([]); // Reset selected seats
//     } catch (error) {
//       console.error("Error confirming booking", error);
//     }
//   };

//   // Update local seat status
//   const updateSeatStatus = (seatId, status) => {
//     setSeats((prevSeats) =>
//       prevSeats.map((seat) => (seat.id === seatId ? { ...seat, status } : seat))
//     );
//   };

//   // Render seat as a button
//   const renderSeat = (seat) => {
//     const isAvailable = seat.status === "available";
//     const isSelected = selectedSeats.includes(seat.id);
//     const isReserved = seat.status === "reserved";

//     const seatStyles = isSelected
//       ? "bg-yellow-500 text-black cursor-pointer"
//       : isReserved
//       ? "bg-red-500 text-white cursor-not-allowed"
//       : "bg-green-500 text-white cursor-pointer hover:bg-green-600";

//     return (
//       <button
//         key={seat.id}
//         className={`w-12 h-12 rounded-lg ${seatStyles} font-semibold`}
//         disabled={!isAvailable}
//         onClick={() => handleSeatSelect(seat.id)}
//       >
//         {seat.number}
//       </button>
//     );
//   };

//   // Fetch seats when showtime changes
//   useEffect(() => {
//     if (selectedShowtime) {
//       fetchSeats(selectedShowtime);
//     }
//   }, [selectedShowtime]);

//   return (
//     <div className="p-4 space-y-6">
//       <h2 className="text-2xl font-bold text-center mb-4">Seat Selection</h2>

//       {/* Seat Map */}
//       <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
//         <h3 className="text-lg font-semibold mb-3 text-center">
//           Select Your Seats
//         </h3>
//         <div className="grid grid-cols-10 gap-4 justify-center">
//           {seats.map((seat) => renderSeat(seat))}
//         </div>
//       </div>

//       {/* Selection Summary */}
//       {selectedSeats.length > 0 && (
//         <div className="border border-gray-300 rounded-lg p-4 bg-gray-100">
//           <h3 className="text-lg font-semibold mb-2">Selected Seats</h3>
//           <p className="mb-4">{selectedSeats.join(", ")}</p>
//           <button
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
//             onClick={handleBooking}
//           >
//             Confirm Booking
//           </button>
//         </div>
//       )}

//       {/* Legend */}
//       <div className="flex justify-center items-center space-x-4">
//         <div className="flex items-center">
//           <div className="w-6 h-6 bg-green-500 rounded-full mr-2"></div>
//           <span>Available</span>
//         </div>
//         <div className="flex items-center">
//           <div className="w-6 h-6 bg-yellow-500 rounded-full mr-2"></div>
//           <span>Selected</span>
//         </div>
//         <div className="flex items-center">
//           <div className="w-6 h-6 bg-red-500 rounded-full mr-2"></div>
//           <span>Reserved</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SeatSelection;
