import React, { useState } from 'react';

const BookingSummary = () => {
  const [seatSelected, setSeatSelected] = useState(false);
  const [seats, setSeats] = useState(['C5', 'B7']);
  const [total, setTotal] = useState(520.00);

  const handleSeatSelection = () => {
    setSeatSelected(true);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card w-96 bg-base-100 shadow-xl">
        <figure>
          <img
            src="https://via.placeholder.com/300x150"
            alt="Ramayana - The Legend of Prince Rama"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Ramayana - The Legend of Prince Rama</h2>
          <p>Adventure • {seatSelected ? 'Hindi' : 'English'}</p>
          <p>
            {seatSelected
              ? 'Sat, 25 Jan, 8:55 PM - 11:48 PM'
              : 'Sat, 25 Jan, 3:05 PM - 5:58 PM'}
          </p>
          <p>PVR: Citi Mall, Andheri (W) Mumbai</p>

          {seatSelected && (
            <div>
              <div className="flex justify-between">
                <p>SEAT INFO</p>
                <div className="flex space-x-2">
                  {seats.map((seat, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-yellow-300 rounded-md"
                    >
                      {seat}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex justify-between">
                <p>TICKETS</p>
                <p>₹{total.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p>PAYMENT DETAILS</p>
                <p>₹{total.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p>TAXES & FEES</p>
                <p>₹{(total - 520).toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p>Grand Total</p>
                <p>₹{total.toFixed(2)}</p>
              </div>
            </div>
          )}

          {!seatSelected && (
            <div className="card-actions justify-end">
              <button
                className="btn btn-primary"
                onClick={handleSeatSelection}
              >
                Proceed
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;