import axios from "axios";
import { AlertCircle, CheckCircle } from "lucide-react";
import React, { useEffect, useState } from "react";

const AddExamSeat = () => {
  const [seatData, setSeatData] = useState({
    seatNumber: "",
    isBooked: false, // Default to "unbooked"
  });
  const [allSeats, setAllSeats] = useState([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { seatNumber, isBooked } = seatData;

  // Fetch all seats status (available and unavailable)
  useEffect(() => {
    const fetchSeatsStatus = async () => {
      try {
        const response = await axios.get("http://localhost:4011/api/seat/");
        setAllSeats(response.data);
        setError("");
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch seats.");
      }
    };

    fetchSeatsStatus();
  }, [success]);

  // Handle changes to input fields
  const onHandleChange = (name) => (e) => {
    const value = name === "isBooked" ? e.target.checked : e.target.value;
    setSeatData({ ...seatData, [name]: value });
    setError("");
  };

  // Submit seat data (create seat)
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSuccess(false); // Reset success state
    try {
      // Post request to add a new seat
      await axios.post("http://localhost:4011/api/seat/create", seatData);

      // Success message and reset form
      setSuccess(true);
      setError("");
      setSeatData({
        seatNumber: "",
        isBooked: false,
      });

      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
      setSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Toggle seat status (book/unbook)
  const toggleSeatStatus = async (seatNumber, currentStatus) => {
    try {
      // Determine whether to book or unbook
      const action = currentStatus ? "unbook" : "book";
      const response = await axios.post(
        `http://localhost:4011/api/seat/${action}`,
        { seatNumber }
      );

      // Update the seat list in the UI after a successful action
      if (response.status === 200) {
        setAllSeats((prevSeats) =>
          prevSeats.map((seat) =>
            seat.seatNumber === seatNumber
              ? { ...seat, booked: !currentStatus } // Toggle the booked status
              : seat
          )
        );
        setSuccess(true);
        setError("");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Failed to change seat status.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Add Exam Seat</h2>
          <p className="mt-2 text-gray-600">
            Add new exam seats for mock tests
          </p>
        </div>

        {error && (
          <div className="mb-6 flex items-center gap-2 p-4 rounded-lg bg-red-50 border border-red-200 animate-fadeIn">
            <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-6 flex items-center gap-2 p-4 rounded-lg bg-green-50 border border-green-200 animate-fadeIn">
            <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
            <p className="text-sm text-green-700">Seat added successfully!</p>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
        >
          <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
            <h3 className="text-lg font-medium text-gray-900">
              Exam Seat Information
            </h3>
          </div>

          <div className="p-6 space-y-6">
            {/* Seat Number */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Seat Number
              </label>
              <input
                type="text"
                value={seatNumber}
                onChange={onHandleChange("seatNumber")}
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter seat number"
                required
              />
            </div>

            {/* Booked / Unbooked Checkbox */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Seat Status
              </label>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={isBooked}
                    onChange={onHandleChange("isBooked")}
                    className="h-5 w-5 text-indigo-600 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">Booked</span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Add Exam Seat"}
            </button>
          </div>
        </form>

        {/* List of All Seats */}
        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-900">All Exam Seats</h3>
          <div className="mt-4">
            {allSeats.length === 0 ? (
              <p>No seats available.</p>
            ) : (
              <ul className="space-y-4">
                {allSeats.map((seat) => (
                  <li
                    key={seat.seatNumber}
                    className="flex justify-between items-center"
                  >
                    <span className="text-sm font-medium text-gray-800">
                      Seat {seat.seatNumber}
                    </span>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        seat.booked
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {seat.booked ? "Booked" : "Unbooked"}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddExamSeat;
