import axios from "axios";
import { Calendar, Clock, Film, MapPin, Ticket } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/NavBar";

const ShowTimeDetails = () => {
  const navigate = useNavigate();
  const [showtimes, setShowtimes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShowtimes = async () => {
      try {
        const response = await axios.get("http://localhost:4011/api/showtime");
        console.log("Showtimes Data:", response.data); //  Debugging API response
        setShowtimes(response.data);
      } catch (error) {
        console.error("Error fetching showtimes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchShowtimes();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-500"></div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-neutral-800 text-white py-20">
        <div className="max-w-6xl mx-auto px-6 ">
          <h2 className="text-3xl font-extrabold text-white text-center mb-8">
            🎥 Available Showtimes
          </h2>

          {showtimes.length === 0 ? (
            <p className="text-center text-gray-400">No showtimes available.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {showtimes.map((showtime) => (
                <div
                  key={showtime._id}
                  className="bg-neutral-800 rounded-lg p-6 shadow-lg transition-transform transform hover:scale-105 hover:bg-neutral-800"
                >
                  {/* Showtime Details */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-300">
                      <Film className="w-5 h-5 text-blue-400" />
                      {showtime?.movieId?.movie_name || "Unknown Movie"}
                    </div>

                    <div className="flex items-center gap-2 text-gray-300">
                      <Calendar className="w-5 h-5 text-yellow-400" />
                      {new Date(showtime.date).toLocaleDateString()}
                    </div>

                    <div className="flex items-center gap-2 text-gray-300">
                      <Clock className="w-5 h-5 text-green-400" />
                      {showtime.start_time} - {showtime.end_time}
                    </div>

                    <div className="flex items-center gap-2 text-gray-300">
                      <MapPin className="w-5 h-5 text-red-400" />
                      {showtime.hallId?.hall_name || "Unknown Hall"}
                    </div>
                  </div>

                  {/* Book Now Button */}
                  <button
                    onClick={() => navigate(`/book-showtime/${showtime._id}`)}
                    className="w-full mt-6 p-3 bg-orange-400 hover:bg-orange-500 text-white font-semibold rounded-lg flex items-center justify-center transition duration-300"
                  >
                    <Ticket className="mr-2 w-5 h-5" />
                    Book Now
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ShowTimeDetails;
