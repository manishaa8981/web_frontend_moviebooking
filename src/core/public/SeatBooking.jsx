// import axios from "axios";
// import { Sofa } from "lucide-react";
// import { useEffect, useState } from "react";

// const SeatBooking = ({ hallId }) => {
//   const [seats, setSeats] = useState([]);
//   const [selectedSeats, setSelectedSeats] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const seatPrice = 250; // Example price per seat

//   const fetchSeats = async (hallId) => {
//     try {
//       const response = await axios.get(
//         `http://localhost:4011/api/seat/${hallId}`
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Error fetching seats:", error);
//       return [];
//     }
//   };

//   const bookSeat = async (seatId) => {
//     try {
//       const response = await axios.patch(
//         `http://localhost:4011/api/seat/${seatId}`
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Error booking seat:", error);
//     }
//   };

//   const cancelSeatBooking = async (seatId) => {
//     try {
//       const response = await axios.patch(
//         `http://localhost:4011/api/seat/cancel/${seatId}`
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Error canceling seat:", error);
//     }
//   };

//   useEffect(() => {
//     const loadSeats = async () => {
//       setLoading(true);
//       const data = await fetchSeats(hallId);
//       setSeats(data);
//       setLoading(false);
//     };
//     loadSeats();
//   }, [hallId]);

//   const handleBooking = async (seat) => {
//     if (seat.seatStatus) {
//       await cancelSeatBooking(seat._id);
//       setSelectedSeats((prev) => prev.filter((id) => id !== seat.seatName));
//     } else {
//       await bookSeat(seat._id);
//       setSelectedSeats((prev) => [...prev, seat.seatName]);
//     }

//     setSeats((prevSeats) =>
//       prevSeats.map((s) =>
//         s._id === seat._id ? { ...s, seatStatus: !s.seatStatus } : s
//       )
//     );
//   };

//   if (loading) return <p className="text-center text-lg">Loading seats...</p>;

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold text-center mb-4">Select Your Seats</h2>

//       {/* Screen */}
//       <div className="flex flex-col items-center mb-8">
//         <div className="w-3/4 h-1 bg-gradient-to-r from-transparent via-gray-400 to-transparent mb-2" />
//         <div className="bg-gray-700 text-white text-center py-1 px-8 rounded-lg text-sm">
//           Screen
//         </div>
//       </div>

//       {/* Legend */}
//       <div className="flex justify-center gap-8 mb-6">
//         <div className="flex items-center gap-2">
//           <Sofa className="w-6 h-6 text-gray-300" />
//           <span className="text-sm">Available</span>
//         </div>
//         <div className="flex items-center gap-2">
//           <Sofa className="w-6 h-6 text-red-500" />
//           <span className="text-sm">Booked</span>
//         </div>
//         <div className="flex items-center gap-2">
//           <Sofa className="w-6 h-6 text-green-500" />
//           <span className="text-sm">Selected</span>
//         </div>
//       </div>

//       {/* Seats Grid */}
//       <div className="grid gap-4 justify-center">
//         {seats
//           .reduce((rows, seat) => {
//             const rowIndex = seat.seatRow - 1;
//             if (!rows[rowIndex]) rows[rowIndex] = [];
//             rows[rowIndex].push(seat);
//             return rows;
//           }, [])
//           .map((row, index) => (
//             <div key={index} className="flex gap-3 justify-center items-center">
//               {/* Row Label */}
//               <span className="text-sm font-medium w-6 text-center">
//                 {String.fromCharCode(65 + index)}
//               </span>

//               {/* Seats */}
//               {row.map((seat) => (
//                 <button
//                   key={seat._id}
//                   onClick={() => handleBooking(seat)}
//                   disabled={seat.seatStatus}
//                   className={`relative group transition-all duration-200 hover:scale-110
//                     ${
//                       seat.seatStatus ? "cursor-not-allowed" : "cursor-pointer"
//                     }`}
//                 >
//                   <Sofa
//                     className={`w-8 h-8 transition-colors
//                       ${
//                         seat.seatStatus
//                           ? "text-red-500"
//                           : "text-gray-300 hover:text-green-500"
//                       }`}
//                   />
//                   <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-xs">
//                     {seat.seatName}
//                   </span>
//                 </button>
//               ))}

//               {/* Row Label (right side) */}
//               <span className="text-sm font-medium w-6 text-center">
//                 {String.fromCharCode(65 + index)}
//               </span>
//             </div>
//           ))}
//       </div>

//       {/* Walking Path */}
//       <div className="flex justify-center mt-12">
//         <div className="w-1/2 h-8 bg-gray-200 rounded-t-full opacity-10" />
//       </div>

//       {/* Selected Seats Summary */}
//       {selectedSeats.length > 0 && (
//         <div className="mt-8 p-4 bg-gray-50 rounded-lg">
//           <h3 className="font-bold mb-2">Selected Seats:</h3>
//           <div className="flex flex-wrap gap-2">
//             {selectedSeats.map((seat) => (
//               <span
//                 key={seat}
//                 className="px-3 py-1 bg-primary text-white rounded"
//               >
//                 {seat}
//               </span>
//             ))}
//           </div>
//           <div className="mt-4 flex justify-between items-center">
//             <span>Total Amount:</span>
//             <span className="font-bold">
//               ₹{selectedSeats.length * seatPrice}
//             </span>
//           </div>
//           <button className="btn btn-primary w-full mt-4">
//             Proceed to Payment
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SeatBooking;

import axios from "axios";
import { Sofa } from "lucide-react";
import { useEffect, useState } from "react";

const SeatBooking = ({ hallId }) => {
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const seatPrice = 250; // Example price per seat

  const fetchSeats = async (hallId) => {
    try {
      const response = await axios.get(
        `http://localhost:4011/api/seat/${hallId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching seats:", error);
      return [];
    }
  };

  const bookSeat = async (seatId) => {
    try {
      const response = await axios.patch(
        `http://localhost:4011/api/seat/${seatId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error booking seat:", error);
    }
  };

  const cancelSeatBooking = async (seatId) => {
    try {
      const response = await axios.patch(
        `http://localhost:4011/api/seat/cancel/${seatId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error canceling seat:", error);
    }
  };

  useEffect(() => {
    const loadSeats = async () => {
      setLoading(true);
      const data = await fetchSeats(hallId);
      setSeats(data);
      setLoading(false);
    };
    loadSeats();
  }, [hallId]);

  const handleBooking = async (seat) => {
    if (seat.seatStatus) {
      await cancelSeatBooking(seat._id);
      setSelectedSeats((prev) => prev.filter((id) => id !== seat.seatName));
    } else {
      await bookSeat(seat._id);
      setSelectedSeats((prev) => [...prev, seat.seatName]);
    }

    setSeats((prevSeats) =>
      prevSeats.map((s) =>
        s._id === seat._id ? { ...s, seatStatus: !s.seatStatus } : s
      )
    );
  };

  if (loading) return <p className="text-center text-lg">Loading seats...</p>;

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] bg-[#121212] text-[#1ed760]">
        <div className="animate-pulse">Loading seats...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white p-6">
      {/* Header Section */}
      <div className="max-w-5xl mx-auto mb-8">
        <h2 className="text-3xl font-bold text-center mb-2 text-[#1ed760]">
          Select Your Seats
        </h2>
        <p className="text-center text-gray-400 text-sm">
          Click on the seats you want to book
        </p>
      </div>

      {/* Screen */}
      <div className="flex flex-col items-center mb-12">
        <div className="w-3/4 h-1 bg-gradient-to-r from-[#121212] via-[#1ed760] to-[#121212] mb-3" />
        <div className="bg-[#282828] text-[#1ed760] text-center py-2 px-12 rounded-lg text-sm font-medium transform -translate-y-2">
          SCREEN
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-8 mb-8 bg-[#181818] p-4 rounded-lg max-w-md mx-auto">
        <div className="flex items-center gap-2">
          <Sofa className="w-6 h-6 text-gray-400" />
          <span className="text-sm text-gray-300">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <Sofa className="w-6 h-6 text-red-500" />
          <span className="text-sm text-gray-300">Booked</span>
        </div>
        <div className="flex items-center gap-2">
          <Sofa className="w-6 h-6 text-[#1ed760]" />
          <span className="text-sm text-gray-300">Selected</span>
        </div>
      </div>

      {/* Seats Container */}
      <div className="bg-[#181818] rounded-xl p-8 max-w-4xl mx-auto mb-8">
        <div className="grid gap-4 justify-center">
          {seats
            .reduce((rows, seat) => {
              const rowIndex = seat.seatRow - 1;
              if (!rows[rowIndex]) rows[rowIndex] = [];
              rows[rowIndex].push(seat);
              return rows;
            }, [])
            .map((row, index) => (
              <div
                key={index}
                className="flex gap-3 justify-center items-center"
              >
                <span className="text-sm font-medium w-6 text-center text-[#1ed760]">
                  {String.fromCharCode(65 + index)}
                </span>

                {row.map((seat) => (
                  <button
                    key={seat._id}
                    onClick={() => handleBooking(seat)}
                    disabled={seat.seatStatus}
                    className={`relative group transition-all duration-300 hover:scale-110 
                      ${
                        seat.seatStatus
                          ? "cursor-not-allowed"
                          : "cursor-pointer"
                      }`}
                  >
                    <Sofa
                      className={`w-8 h-8 transition-colors duration-300
                        ${
                          seat.seatStatus
                            ? "text-red-500"
                            : selectedSeats.includes(seat.seatName)
                            ? "text-[#1ed760]"
                            : "text-gray-400 hover:text-[#1ed760]"
                        }`}
                    />
                    <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      {seat.seatName}
                    </span>
                  </button>
                ))}

                <span className="text-sm font-medium w-6 text-center text-[#1ed760]">
                  {String.fromCharCode(65 + index)}
                </span>
              </div>
            ))}
        </div>
      </div>

      {/* Walking Path */}
      <div className="flex justify-center mb-8">
        <div className="w-1/2 h-8 bg-[#282828] rounded-t-full opacity-20" />
      </div>

      {/* Selected Seats Summary */}
      {selectedSeats.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-[#282828] border-t border-[#404040] p-6 transform transition-transform duration-300">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap gap-3 mb-4">
              {selectedSeats.map((seat) => (
                <span
                  key={seat}
                  className="px-3 py-1 bg-[#1ed760] text-black rounded-full text-sm font-medium"
                >
                  {seat}
                </span>
              ))}
            </div>
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-gray-400 text-sm">Total Amount</p>
                <p className="text-2xl font-bold text-white">
                  ₹{selectedSeats.length * seatPrice}
                </p>
              </div>
              <button
                className="bg-[#1ed760] text-black px-8 py-3 rounded-full font-bold 
                  hover:scale-105 transform transition-all duration-300 
                  hover:bg-[#1fdf64]"
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeatBooking;
