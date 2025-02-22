import axios from "axios";
import {
  Calendar,
  CircleArrowLeft,
  Clock,
  Film,
  Sofa,
  TicketIcon,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/NavBar";

const MovieBooking = () => {
  const navigate = useNavigate();
  const { movieId } = useParams();

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedHall, setSelectedHall] = useState("");
  const [showTimes, setShowTimes] = useState([]);
  const [seats, setSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedShow, setSelectedShow] = useState(null);
  const [movieDetails, setMovieDetails] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const fetchShowTimes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4011/api/showtime/movie/${movieId}`
        );
        setShowTimes(response.data);
      } catch (error) {
        console.error("Error fetching showtimes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchShowTimes();
  }, [movieId]);

  useEffect(() => {
    if (!selectedHall) return;

    const fetchSeats = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4011/api/seat/hall/${selectedHall}`
        );
        setSeats(response.data);
      } catch (error) {
        console.error("Error fetching seats:", error);
      }
    };
    fetchSeats();
    const fetchHallDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4011/api/hall/${selectedHall}`
        );
        setPrice(response.data?.price || 0);
      } catch (error) {
        console.error("Error fetching hall details:", error);
      }
    };
    fetchHallDetails();
  }, [selectedHall]);

  const handleSeatSelection = (seat) => {
    if (seat.seatStatus) return;
    const isSelected = selectedSeats.find((s) => s._id === seat._id);

    if (isSelected) {
      setSelectedSeats((prev) => prev.filter((s) => s._id !== seat._id));
    } else {
      setSelectedSeats((prev) => [...prev, seat]);
    }
  };

  const calculateTotal = () => {
    return selectedSeats.length * price;
  };

  const getSelectedSeatDetails = () => {
    return selectedSeats
      .sort(
        (a, b) => a.seatRow - b.seatRow || a.seatName.localeCompare(b.seatName)
      )
      .map((seat) => seat.seatName)
      .join(", ");
  };

  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token"); // or however you store your auth token
        if (token) {
          const response = await axios.get(
            "http://localhost:4011/api/auth/verify",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setIsAuthenticated(true);
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  const handleCheckout = () => {
    const token = localStorage.getItem("token"); // or however you store your auth token

    if (!token) {
      // Save booking data to localStorage before redirecting
      const bookingData = {
        movieId,
        selectedDate,
        selectedHall,
        selectedSeats,
        selectedShow,
        returnPath: `/movie-booking/${movieId}`,
      };
      localStorage.setItem("pendingBooking", JSON.stringify(bookingData));

      navigate("/login");
      return;
    }

    // If token exists, proceed with booking
    handleBooking();
  };

  const handleBooking = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const bookingData = {
        movieId,
        showId: selectedShow._id,
        seats: selectedSeats.map((seat) => seat._id),
        totalAmount: calculateTotal(),
        date: selectedDate,
        hallId: selectedHall,
      };

      const response = await axios.post(
        "http://localhost:4011/api/booking",
        bookingData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data) {
        navigate(`/booking-confirmation/${response.data._id}`);
      }
    } catch (error) {
      console.error("Booking failed:", error);
      alert("Failed to create booking. Please try again.");
    }
  };

  const handleShowSelection = (show) => {
    setSelectedHall(show.hallId._id);
    setSelectedShow(show);
  };

  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i <= 2; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const dates = generateDates();
  const formatDate = (date) => {
    return date.toLocaleString("default", { month: "short", day: "2-digit" });
  };

  const formatDateForAPI = (date) => {
    return date.toISOString().split("T")[0];
  };
  const handleDateSelection = (date) => {
    setSelectedDate(formatDateForAPI(date));
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-900 to-black">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8 mt-10">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Booking Actions */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2 rounded-full hover:bg-neutral-800 transition-colors"
              >
                <CircleArrowLeft className="w-6 h-6 text-neutral-300" />
              </button>
              <h1 className="text-2xl font-bold text-white">Book Tickets</h1>
            </div>

            {/* Date Selection */}
            <div className="bg-neutral-800/50 rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-green-500" />
                <h2 className="text-lg font-semibold text-white">
                  Select Date
                </h2>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {generateDates().map((date, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleDateSelection(date)}
                    className={`flex flex-col items-center p-4 rounded-lg transition-all duration-300 ${
                      selectedDate === formatDateForAPI(date)
                        ? "bg-green-500 text-black"
                        : "bg-neutral-700 text-white hover:bg-neutral-600"
                    }`}
                  >
                    <span className="text-sm">
                      {formatDate(date).split(" ")[0]}
                    </span>
                    <span className="text-2xl font-bold">
                      {formatDate(date).split(" ")[1]}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Show Selection */}
            <div className="bg-neutral-800/50 rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-green-500" />
                <h2 className="text-lg font-semibold text-white">
                  Select Show
                </h2>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {showTimes.map((show) => (
                  <button
                    key={show.hallId._id}
                    onClick={() => handleShowSelection(show)}
                    className={`flex flex-col items-center p-4 rounded-lg transition-all duration-300 ${
                      selectedHall === show.hallId._id
                        ? "bg-green-500 text-black"
                        : "bg-neutral-700 text-white hover:bg-neutral-600"
                    }`}
                  >
                    <span className="font-semibold">
                      {show.hallId.hall_name}
                    </span>
                    <span className="text-sm mt-1">
                      {show.start_time} - {show.end_time}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Seat Selection */}
            {selectedHall && (
              <div className="bg-neutral-800/50 rounded-xl p-6 space-y-6">
                <div className="flex items-center gap-2">
                  <Sofa className="w-5 h-5 text-green-500" />
                  <h2 className="text-lg font-semibold text-white">
                    Select Seats
                  </h2>
                </div>

                {/* Screen */}
                <div className="flex flex-col items-center">
                  <div className="w-3/4 h-1 bg-gradient-to-r from-neutral-800 via-green-500 to-neutral-800" />
                  <div className="mt-2 text-sm text-neutral-400">SCREEN</div>
                </div>

                {/* Seat Legend */}
                <div className="flex justify-center gap-6 py-4">
                  <div className="flex items-center gap-2">
                    <Sofa className="w-5 h-5 text-neutral-400" />
                    <span className="text-sm text-neutral-400">Available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sofa className="w-5 h-5 text-red-500" />
                    <span className="text-sm text-neutral-400">Booked</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sofa className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-neutral-400">Selected</span>
                  </div>
                </div>

                {/* Seat Grid */}
                <div className="grid gap-4">
                  {seats
                    .reduce((rows, seat) => {
                      const rowIndex = seat.seatRow - 1;
                      if (!rows[rowIndex]) rows[rowIndex] = [];
                      rows[rowIndex].push(seat);
                      return rows;
                    }, [])
                    .map((row, rowIndex) => (
                      <div
                        key={rowIndex}
                        className="flex items-center justify-center gap-4"
                      >
                        <span className="w-6 text-center text-sm text-green-500">
                          {String.fromCharCode(65 + rowIndex)}
                        </span>
                        {row.map((seat) => (
                          <button
                            key={seat._id}
                            onClick={() => handleSeatSelection(seat)}
                            disabled={seat.seatStatus}
                            className={`relative group transition-all duration-300 hover:scale-110
                              ${
                                seat.seatStatus
                                  ? "text-red-500 cursor-not-allowed"
                                  : selectedSeats.find(
                                      (s) => s._id === seat._id
                                    )
                                  ? "text-green-500"
                                  : "text-neutral-400 hover:text-green-500"
                              }`}
                          >
                            <Sofa className="w-6 h-6" />
                            <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-xs text-neutral-400 opacity-0 group-hover:opacity-100">
                              {seat.seatName}
                            </span>
                          </button>
                        ))}
                        <span className="w-6 text-center text-sm text-green-500">
                          {String.fromCharCode(65 + rowIndex)}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Movie Details & Summary */}
          <div className="space-y-6">
            {selectedShow && (
              <div className="bg-neutral-800/50 rounded-xl p-6 sticky top-24">
                <div className="space-y-6">
                  {/* Movie Details */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Film className="w-5 h-5 text-green-500" />
                      <h2 className="text-lg font-semibold text-white">
                        Movie Details
                      </h2>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Movie</span>
                        <span className="text-white">
                          {selectedShow.movieId.movie_name}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Duration</span>
                        <span className="text-white">
                          {selectedShow.movieId.duration}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-400">Genre</span>
                        <span className="text-white">
                          {selectedShow.movieId.genre}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Booking Summary */}
                  {selectedSeats.length > 0 && (
                    <div className="space-y-4 pt-6 border-t border-neutral-700">
                      <div className="flex items-center gap-2">
                        <TicketIcon className="w-5 h-5 text-green-500" />
                        <h2 className="text-lg font-semibold text-white">
                          Booking Summary
                        </h2>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-neutral-400">
                            Selected Seats
                          </span>
                          <span className="text-white">
                            {getSelectedSeatDetails()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-400">
                            Price per Ticket
                          </span>
                          <span className="text-white">₹{price}</span>
                        </div>
                        <div className="flex justify-between text-lg font-semibold">
                          <span className="text-neutral-400">Total Amount</span>
                          <span className="text-green-500">
                            ₹{calculateTotal()}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={handleCheckout}
                        className="w-full py-3 bg-green-500 text-black rounded-lg font-semibold hover:bg-green-600 transition-colors"
                      >
                        Proceed to Payment
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default MovieBooking;
