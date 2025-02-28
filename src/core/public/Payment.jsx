import axios from "axios";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { movieId, showtimeId, seats, totalAmount, date, hallId } =
    location.state;

  const handlePayment = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log(
        "Check Payload:::",
        movieId,
        showtimeId,
        seats,
        totalAmount,
        date,
        hallId
      );
      const response = await axios.post(
        "http://localhost:4011/api/booking",
        { movieId, showtimeId, seats, totalAmount, date, hallId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data) {
        navigate(`/booking-confirmation/${response.data._id}`);
      }
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Payment failed. Try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-gray-800 text-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-center">Confirm Payment</h2>
      <p className="mt-4">
        <strong>Amount to Pay:</strong> ₹{totalAmount}
      </p>

      <button
        onClick={handlePayment}
        className="mt-4 w-full bg-green-500 hover:bg-green-600 text-black py-2 rounded"
      >
        Pay Now
      </button>
    </div>
  );
};

export default PaymentPage;
