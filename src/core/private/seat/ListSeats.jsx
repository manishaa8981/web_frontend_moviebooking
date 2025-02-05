// Show all Available Seat Layouts
// Add Seat Button
// Actions Button Edit and Delete
import React from "react";

const SeatLayout = ({
  seatRow,
  seatColumn,
  selectedSeats = [],
  onSeatClick,
  seats = [],
}) => {
  const getRowLetter = (number) => String.fromCharCode(64 + number);

  const getSeatStatus = (rowLetter, column) => {
    const seat = seats.find(
      (s) => s.seatRow === rowLetter && s.seatColumn === column
    );
    return seat?.status || "available";
  };

  const renderSeats = () => {
    const rows = [];

    for (let i = 1; i <= seatRow; i++) {
      const rowLetter = getRowLetter(i);
      const seats = [];

      seats.push(
        <div
          key={`row-label-${i}`}
          className="w-8 h-8 flex items-center justify-center font-bold"
        >
          {rowLetter}
        </div>
      );

      for (let j = 1; j <= seatColumn; j++) {
        const seatId = `${rowLetter}${j}`;
        const isSelected = selectedSeats.includes(seatId);
        const status = getSeatStatus(rowLetter, j);

        seats.push(
          <button
            key={seatId}
            className={`w-8 h-8 m-1 rounded-md flex items-center justify-center text-sm 
              ${
                status === "booked"
                  ? "bg-red-500 text-white cursor-not-allowed"
                  : isSelected
                  ? "bg-green-500 text-white"
                  : status === "blocked"
                  ? "bg-gray-500 text-white cursor-not-allowed"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            onClick={() => status === "available" && onSeatClick?.(seatId)}
            disabled={status !== "available"}
          >
            {j}
          </button>
        );
      }

      rows.push(
        <div key={`row-${i}`} className="flex items-center mb-2">
          {seats}
        </div>
      );
    }

    return rows;
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <div className="mb-4 text-center font-bold text-lg text-gray-800">
        Seat Layout ({seatRow} rows × {seatColumn} columns)
      </div>
      <div className="flex flex-col items-center">{renderSeats()}</div>
      <div className="mt-4 flex justify-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-200 rounded"></div>
          <span className="text-sm">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span className="text-sm">Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded"></div>
          <span className="text-sm">Booked</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-500 rounded"></div>
          <span className="text-sm">Blocked</span>
        </div>
      </div>
    </div>
  );
};

export default SeatLayout;
