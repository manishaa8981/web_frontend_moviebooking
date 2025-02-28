import React, { useEffect, useState } from "react";
import axios from "axios";

const HallSelection = ({ movieId, setSelectedShow, setSeatPrice }) => {
  const [showTimes, setShowTimes] = useState([]);

  useEffect(() => {
    const fetchShowTimes = async () => {
      try {
        const response = await axios.get(`http://localhost:4011/api/showtime/movie/${movieId}`);
        setShowTimes(response.data);
      } catch (error) {
        console.error("Error fetching showtimes:", error);
      }
    };
    fetchShowTimes();
  }, [movieId]);

  const handleShowSelection = async (show) => {
    setSelectedShow(show);
    try {
      const response = await axios.get(`http://localhost:4011/api/hall/${show.hallId._id}`);
      setSeatPrice(response.data.seatPrice);
    } catch (error) {
      console.error("Error fetching hall seat price:", error);
    }
  };

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-white mb-3">Select Hall</h3>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {showTimes.map((show) => (
          <button key={show._id} onClick={() => handleShowSelection(show)} className="bg-neutral-700 text-white p-4 rounded-lg">
            {show.hallId.hall_name} ({show.start_time} - {show.end_time})
          </button>
        ))}
      </div>
    </div>
  );
};

export default HallSelection;
