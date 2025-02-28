import React, { useEffect, useState } from "react";
import axios from "axios";
import { Sofa } from "lucide-react";

const SeatSelection = ({ selectedShow, selectedSeats, setSelectedSeats }) => {
  const [seats, setSeats] = useState([]);

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const response = await axios.get(`http://localhost:4011/api/seat/hall/${selectedShow.hallId._id}`);
        setSeats(response.data);
      } catch (error) {
        console.error("Error fetching seats:", error);
      }
    };
    fetchSeats();
  }, [selectedShow]);

  const handleSeatSelection = (seat) => {
    if (seat.seatStatus) return;
    setSelectedSeats((prev) => prev.some((s) => s._id === seat._id) ? prev.filter((s) => s._id !== seat._id) : [...prev, seat]);
  };

  return (
    <div className="grid grid-cols-8 gap-2">
      {seats.map((seat) => (
        <button key={seat._id} onClick={() => handleSeatSelection(seat)} className={seat.seatStatus ? "text-red-500" : selectedSeats.includes(seat) ? "text-green-500" : "text-white"}>
          <Sofa /> {seat.seatName}
        </button>
      ))}
    </div>
  );
};

export default SeatSelection;
