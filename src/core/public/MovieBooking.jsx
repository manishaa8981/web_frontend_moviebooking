import axios from "axios";
import { CircleArrowLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/NavBar";

const MovieBooking = () => {
  const { movieId } = useParams(); // Get movie ID from URL
  const navigate = useNavigate();

  // State variables
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedHall, setSelectedHall] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("All");
  const [hall, setHall] = useState([]);
  const [showTimes, setShowTimes] = useState([]);
  const [languages, setLanguages] = useState(["All"]);
  const [loading, setLoading] = useState(true);

  // Fetch cinemas for the selected movie

  useEffect(() => {
    const fetchCinemas = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4011/api/movie/${movieId}/hall/`
        );
        console.log("Fetched halls:", response.data); // Add this to debug
        setHall(response.data);
        setSelectedHall(response.data[0]?._id || ""); // Changed from name to _id
      } catch (error) {
        console.error("Error fetching cinemas:", error);
        console.log("Error details:", error.response); // Add this to debug
      }
    };

    if (movieId) {
      // Add this check
      fetchCinemas();
    }
  }, [movieId]);

  // Fetch showtimes when a cinema is selected
  useEffect(() => {
    if (!selectedHall) return;

    const fetchShowtimes = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:4011/api/hall/${selectedHall}/showtime`
        );
        setShowTimes(response.data);
        setLanguages(["All", ...new Set(response.data.map((s) => s.language))]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching showtimes:", error);
        setLoading(false);
      }
    };

    fetchShowtimes();
  }, [selectedHall]);

  // Available dates for booking
  const dates = [
    { day: "05", month: "Feb", weekday: "Mon" },
    { day: "06", month: "Feb", weekday: "Tue" },
    { day: "07", month: "Feb", weekday: "Wed" },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-neutral-900 to-black p-4 mt-10">
        <div className="max-w-6xl mx-auto bg-neutral-800 rounded-lg shadow-xl p-6">
          {/* Header with Back Button */}
          <div className="flex items-center gap-4 mb-8">
            <CircleArrowLeft
              className="text-neutral-300 hover:text-white transition-colors cursor-pointer w-8 h-8"
              onClick={() => navigate(-1)}
            />
            <h2 className="text-2xl font-bold text-white">
              Select Date, Cinema & Showtimes
            </h2>
          </div>

          {/* Date Selection */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-white mb-3">
              Select Date
            </h3>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {dates.map((date) => (
                <button
                  key={date.day}
                  onClick={() => setSelectedDate(date.day)}
                  className={`flex flex-col items-center p-4 rounded-lg min-w-[80px] ${
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
              {hall.map((hall) => (
                <button
                  key={hall._id} // Changed from id to _id
                  onClick={() => setSelectedHall(hall._id)} // Changed from id to _id
                  className={`px-6 py-3 rounded-full ${
                    selectedHall === hall._id // Changed from id to _id
                      ? "bg-green-500 text-black"
                      : "bg-neutral-700 text-white hover:bg-neutral-600"
                  }`}
                >
                  {hall.hall_name} // Changed from name to hall_name
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
                  className={`px-6 py-3 rounded-full ${
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

          {/* Showtimes */}
          <div className="space-y-4">
            {loading ? (
              <p className="text-neutral-400">Loading showtimes...</p>
            ) : showTimes.length === 0 ? (
              <p className="text-neutral-400">No showtimes available</p>
            ) : (
              showTimes
                .filter(
                  (show) =>
                    selectedLanguage === "All" ||
                    show.language === selectedLanguage
                )
                .map((show, index) => (
                  <div
                    key={index}
                    className="bg-neutral-700 rounded-lg overflow-hidden"
                  >
                    <div className="flex items-center justify-between p-4">
                      <div>
                        <h4 className="font-bold text-white">{show.hall}</h4>
                        <p className="text-sm text-neutral-400">
                          ({show.language})
                        </p>
                      </div>
                      <button
                        onClick={() => navigate(`/seats/${show.id}`)}
                        className="px-6 py-2 rounded-full bg-green-500 text-black hover:bg-green-400 flex items-center gap-2"
                      >
                        {show.time}
                        <span className="ml-2 text-sm bg-black text-white px-3 py-1 rounded-full">
                          {show.type}
                        </span>
                      </button>
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieBooking;
