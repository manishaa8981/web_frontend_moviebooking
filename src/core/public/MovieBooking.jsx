// components/booking/MovieBooking.jsx
import { CircleArrowLeft } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/NavBar";
import SeatBooking from "./SeatBooking";

const MovieBooking = () => {
  const [selectedDate, setSelectedDate] = useState("29");
  const [selectedCinema, setSelectedCinema] = useState("Rising Mall");
  const [selectedLanguage, setSelectedLanguage] = useState("All");
  const [showSeatLayout, setShowSeatLayout] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const navigate = useNavigate();
  const dates = [
    { day: "29", month: "Jan", weekday: "Wed" },
    { day: "30", month: "Jan", weekday: "Thu" },
  ];
  const hallId = "65b3e8c2a90f5b001d2e4a7c";
  const cinemas = [
    "All",
    "Rising Mall",
    "Bhatbhateni Bhaktapur",
    "Civil Mall",
    "Labim Mall",
    "Chhaya Center",
  ];

  const languages = ["All", "Hindi Dubbed"];

  const showTimes = [
    { time: "06:15 PM", type: "2D", theater: "RISING MALL", language: "HIN" },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-neutral-900 to-black p-4 mt-10">
        <div className="max-w-6xl mx-auto bg-neutral-800 rounded-lg shadow-xl p-6">
          {/* Header with Back Button */}
          <div className="flex items-center gap-4 mb-8">
            <CircleArrowLeft className="text-neutral-300 hover:text-white transition-colors cursor-pointer w-8 h-8" />
            <h2 className="text-2xl font-bold text-white">
              Select Date, Language & Time Slots
            </h2>
          </div>

          {/* Date Selection */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-white mb-3">
              Select Date
            </h3>
            <p className="text-sm text-neutral-400 mb-2">Tomorrow</p>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {dates.map((date) => (
                <button
                  key={date.day}
                  onClick={() => setSelectedDate(date.day)}
                  className={`flex flex-col items-center p-4 rounded-lg transition-all min-w-[80px] ${
                    selectedDate === date.day
                      ? "bg-green-500 text-black"
                      : "bg-neutral-700 text-white hover:bg-neutral-600"
                  }`}
                >
                  <span className="text-sm">{date.month}</span>
                  <span className="text-2xl font-bold">{date.day}</span>
                  <span className="text-sm">{date.weekday}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Cinema Selection */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-white mb-3">
              Select Cinema
            </h3>
            <div className="flex flex-wrap gap-3">
              {cinemas.map((cinema) => (
                <button
                  key={cinema}
                  onClick={() => setSelectedCinema(cinema)}
                  className={`px-6 py-3 rounded-full transition-colors ${
                    selectedCinema === cinema
                      ? "bg-green-500 text-black"
                      : "bg-neutral-700 text-white hover:bg-neutral-600"
                  }`}
                >
                  {cinema}
                </button>
              ))}
            </div>
          </div>

          {/* Language Selection */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-white mb-3">
              Select Language
            </h3>
            <div className="flex flex-wrap gap-3">
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => setSelectedLanguage(lang)}
                  className={`px-6 py-3 rounded-full transition-colors ${
                    selectedLanguage === lang
                      ? "bg-green-500 text-black"
                      : "bg-neutral-700 text-white hover:bg-neutral-600"
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          {/* Show Times */}
          <div className="space-y-4">
            {showTimes.map((show, index) => (
              <div
                key={index}
                className="bg-neutral-700 rounded-lg overflow-hidden"
              >
                <div className="flex items-center justify-between p-4">
                  <div>
                    <h4 className="font-bold text-white">{show.theater}</h4>
                    <p className="text-sm text-neutral-400">
                      ({show.language})
                    </p>
                  </div>
                  <button
                    onClick={() => setShowSeatLayout(true)}
                    className="px-6 py-2 rounded-full bg-green-500 text-black hover:bg-green-400 transition-colors flex items-center gap-2"
                  >
                    {show.time}
                    <span className="ml-2 text-sm bg-black text-white px-3 py-1 rounded-full">
                      {show.type}
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Seat Booking Component */}
          <div className="mt-8">
            <SeatBooking hallId={hallId} />
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieBooking;
