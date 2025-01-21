import { ArrowLeft } from "lucide-react";
import React, { useState } from "react";

const TheaterSeats = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const showTimes = [
    { time: "08:20 AM", language: "Hindi" },
    { time: "11:45 AM", language: "Hindi" },
    { time: "04:00 PM", language: "Hindi", selected: true },
    { time: "07:05 PM", language: "Hindi" },
    { time: "10:10 PM", language: "Hindi" },
  ];

  const rows = {
    EXECUTIVE: ["N", "O"],
    CLUB: ["M", "L", "K", "J", "I", "H", "G"],
    ROYAL: ["F", "E", "D", "C", "B", "A"],
  };

  const generateSeats = (start, end) => {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const handleSeatClick = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center h-16">
            <button className="flex items-center text-gray-700">
              <ArrowLeft className="w-5 h-5 mr-2" />
              BACK
            </button>
            <div className="ml-8 flex space-x-4">
              <span className="font-medium text-yellow-500">SELECT SEATS</span>
              <span className="text-gray-400">CHOOSE CINEMA</span>
              <span className="text-gray-400">GRAB FOOD</span>
              <span className="text-gray-400">PAYMENT</span>
            </div>
          </div>
        </div>
      </div>

      {/* Show times */}
      <div className="bg-white mt-4 p-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button className="flex items-center space-x-2 px-4 py-2 border rounded-md">
              <span>17 Jan, Friday</span>
            </button>
          </div>
          <div className="flex space-x-4">
            {showTimes.map((show, index) => (
              <div
                key={index}
                className={`px-4 py-2 rounded-md text-sm ${
                  show.selected
                    ? "border-b-2 border-yellow-500 text-yellow-500"
                    : "text-gray-600"
                }`}
              >
                <div className="text-xs text-gray-500">{show.language}</div>
                <div>{show.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Seating layout */}
      <div className="max-w-5xl mx-auto mt-8 px-4">
        {/* Screen */}
        <div className="w-full text-center mb-12">
          <div className="h-4 bg-gradient-to-b from-gray-300 to-transparent rounded-t-full mx-auto max-w-3xl"></div>
          <div className="mt-4 text-sm text-gray-500">SCREEN</div>
        </div>

        {/* Legend */}
        <div className="flex justify-center space-x-8 mb-8 text-sm">
          <div className="flex items-center">
            <div className="w-4 h-4 border rounded mr-2"></div>
            Available
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-yellow-500 rounded mr-2"></div>
            Selected
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gray-200 rounded mr-2"></div>
            Occupied
          </div>
        </div>

        {/* Seats */}
        {Object.entries(rows).map(([section, rowLetters]) => (
          <div key={section} className="mb-8">
            <div className="text-sm font-medium text-gray-500 mb-4">
              {section} (₹112.00)
            </div>
            {rowLetters.map((letter) => (
              <div key={letter} className="flex items-center mb-2">
                <div className="w-6 text-sm text-gray-500">{letter}</div>
                <div className="flex-1 flex justify-center space-x-1">
                  {generateSeats(1, 16).map((num) => (
                    <button
                      key={`${letter}${num}`}
                      className={`w-6 h-6 text-xs rounded ${
                        selectedSeats.includes(`${letter}${num}`)
                          ? "bg-yellow-500 text-white"
                          : "border hover:bg-gray-50"
                      }`}
                      onClick={() => handleSeatClick(`${letter}${num}`)}
                    >
                      {num}
                    </button>
                  ))}
                </div>
                <div className="w-6 text-sm text-gray-500">{letter}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TheaterSeats;
