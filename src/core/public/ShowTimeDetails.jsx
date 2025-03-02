import axios from "axios";
import {
  Calendar,
  Clock,
  Film,
  Loader2,
  MapPin,
  Star,
  Ticket,
  Users,
  X,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/NavBar";

const ShowTimeDetails = () => {
  const navigate = useNavigate();
  const [showtimes, setShowtimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState("all");
  const [modalShowtime, setModalShowtime] = useState(null);

  useEffect(() => {
    const fetchShowtimes = async () => {
      try {
        const response = await axios.get("http://localhost:4011/api/showtime");
        console.log("Showtimes Data:", response.data);
        setShowtimes(response.data);
      } catch (error) {
        console.error("Error fetching showtimes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchShowtimes();
  }, []);

  // Get unique dates from showtimes
  const uniqueDates = [
    ...new Set(
      showtimes.map((showtime) =>
        new Date(showtime.date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })
      )
    ),
  ];

  const filteredShowtimes =
    selectedDate === "all"
      ? showtimes
      : showtimes.filter(
          (showtime) =>
            new Date(showtime.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            }) === selectedDate
        );

  const openModal = (showtime) => {
    setModalShowtime(showtime);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setModalShowtime(null);
    document.body.style.overflow = "auto";
  };

  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-neutral-900 to-neutral-800 text-white">
        <Loader2 className="w-12 h-12 text-orange-500 animate-spin" />
        <p className="mt-4 text-gray-300 font-medium">Loading showtimes...</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-neutral-900 to-neutral-800 text-white py-10 px-4 mt-4">
        <div className="max-w-6xl mx-auto">
          <header className="text-center mb-10">
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-400 to-orange-500 inline-block">
              Available Showtimes
            </h1>
            <p className="text-gray-400 mt-2 max-w-2xl mx-auto">
              Browse and book tickets for upcoming movie showtimes at our
              theaters
            </p>
          </header>

          {/* Date Filter */}
          <div className="mb-8 flex items-center justify-center overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedDate("all")}
              className={`px-5 py-2 rounded-full text-sm font-medium mx-1 transition-all ${
                selectedDate === "all"
                  ? "bg-orange-500 text-white"
                  : "bg-neutral-700 text-gray-300 hover:bg-neutral-600"
              }`}
            >
              All Dates
            </button>

            {uniqueDates.map((date) => (
              <button
                key={date}
                onClick={() => setSelectedDate(date)}
                className={`px-5 py-2 rounded-full text-sm font-medium mx-1 transition-all ${
                  selectedDate === date
                    ? "bg-orange-500 text-white"
                    : "bg-neutral-700 text-gray-300 hover:bg-neutral-600"
                }`}
              >
                {date}
              </button>
            ))}
          </div>

          {filteredShowtimes.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-10 bg-neutral-800/50 rounded-xl">
              <Film className="w-16 h-16 text-gray-600 mb-4" />
              <p className="text-center text-xl font-medium text-gray-400">
                No showtimes available for this selection.
              </p>
              <button
                onClick={() => setSelectedDate("all")}
                className="mt-4 px-6 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors"
              >
                View All Dates
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredShowtimes.map((showtime) => (
                <div
                  key={showtime._id}
                  className="bg-neutral-800/60 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:shadow-orange-500/10 transition-all duration-300 group border border-neutral-700/50"
                >
                  {/* Top Image Banner */}
                  <div className="h-32 bg-gradient-to-r from-blue-600 to-purple-600 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')] bg-cover bg-center"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-800 to-transparent"></div>

                    <div className="absolute bottom-3 left-4 right-4">
                      <h3 className="text-xl font-bold text-white truncate">
                        {showtime?.movieId?.movie_name || "Unknown Movie"}
                      </h3>
                      <div className="flex items-center text-gray-300 text-sm">
                        <Star className="w-4 h-4 text-yellow-400 mr-1" />
                        <span>8.5/10</span>
                        <span className="mx-2">•</span>
                        <span>2h 15m</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex flex-col space-y-3 mb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-gray-300">
                          <Calendar className="w-4 h-4 text-blue-400 flex-shrink-0" />
                          <span className="text-sm">
                            {new Date(showtime.date).toLocaleDateString(
                              "en-US",
                              {
                                weekday: "short",
                                month: "short",
                                day: "numeric",
                              }
                            )}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-gray-300">
                          <Clock className="w-4 h-4 text-green-400 flex-shrink-0" />
                          <span className="text-sm font-medium bg-neutral-700 px-2 py-0.5 rounded">
                            {showtime.start_time}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-gray-300">
                        <MapPin className="w-4 h-4 text-red-400 flex-shrink-0" />
                        <span className="text-sm">
                          {showtime.hallId?.hall_name || "Unknown Hall"}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-gray-300">
                        <Users className="w-4 h-4 text-purple-400 flex-shrink-0" />
                        <span className="text-sm">100 seats available</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => openModal(showtime)}
                        className="flex-1 p-2 bg-neutral-700 hover:bg-neutral-600 rounded-lg text-sm text-gray-300 font-medium transition-colors"
                      >
                        View Details
                      </button>

                      <button
                        onClick={() =>
                          navigate(`/book-showtime/${showtime._id}`)
                        }
                        className="flex-1 p-2 bg-gradient-to- bg-orange-500  hover:orange-600 text-white font-medium rounded-lg flex items-center justify-center transition-all"
                      >
                        <Ticket className="mr-1 w-4 h-4" />
                        Book
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {modalShowtime && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-neutral-800 rounded-xl overflow-hidden max-w-md w-full shadow-2xl animate-fadeIn">
            <div className="h-48 bg-gradient-to-r from-blue-600 to-purple-600 relative overflow-hidden">
              <div className="absolute inset-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1025&q=80')] bg-cover bg-center"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-800 to-transparent"></div>

              <button
                onClick={closeModal}
                className="absolute top-3 right-3 p-1 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>

              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-2xl font-bold text-white">
                  {modalShowtime?.movieId?.movie_name || "Unknown Movie"}
                </h3>
                <div className="flex items-center text-gray-300 text-sm">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                  <span>8.5/10</span>
                  <span className="mx-2">•</span>
                  <span>2h 15m</span>
                  <span className="mx-2">•</span>
                  <span>Action, Thriller</span>
                </div>
              </div>
            </div>

            <div className="p-5">
              <div className="grid grid-cols-2 gap-4 mb-5">
                <div className="bg-neutral-700/50 p-3 rounded-lg">
                  <div className="text-xs text-gray-400 mb-1">Date</div>
                  <div className="flex items-center text-white">
                    <Calendar className="w-4 h-4 text-blue-400 mr-2" />
                    {new Date(modalShowtime.date).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                </div>

                <div className="bg-neutral-700/50 p-3 rounded-lg">
                  <div className="text-xs text-gray-400 mb-1">Time</div>
                  <div className="flex items-center text-white">
                    <Clock className="w-4 h-4 text-green-400 mr-2" />
                    {modalShowtime.start_time} - {modalShowtime.end_time}
                  </div>
                </div>

                <div className="bg-neutral-700/50 p-3 rounded-lg">
                  <div className="text-xs text-gray-400 mb-1">Hall</div>
                  <div className="flex items-center text-white">
                    <MapPin className="w-4 h-4 text-red-400 mr-2" />
                    {modalShowtime.hallId?.hall_name || "Unknown Hall"}
                  </div>
                </div>

                <div className="bg-neutral-700/50 p-3 rounded-lg">
                  <div className="text-xs text-gray-400 mb-1">Price</div>
                  <div className="flex items-center text-white">
                    <Ticket className="w-4 h-4 text-yellow-400 mr-2" />
                    ₹150 - ₹300
                  </div>
                </div>
              </div>

              <p className="text-gray-400 text-sm mb-5">
                Experience the movie in our state-of-the-art theater with Dolby
                Atmos sound and 4K projection. Arrive 15 minutes early for the
                best seats!
              </p>

              <button
                onClick={() => {
                  closeModal();
                  navigate(`/book-showtime/${modalShowtime._id}`);
                }}
                className="w-full p-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold rounded-lg flex items-center justify-center transition-all"
              >
                <Ticket className="mr-2 w-5 h-5" />
                Book This Showtime
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add this to your CSS */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default ShowTimeDetails;
