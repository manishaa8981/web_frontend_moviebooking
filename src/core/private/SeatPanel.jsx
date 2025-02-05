import axios from "axios";
import { Eye, Sofa, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

const AdminSeatPanel = () => {
  const [halls, setHalls] = useState([]);
  const [selectedHalls, setSelectedHalls] = useState([]);
  const [seatRows, setSeatRows] = useState(5);
  const [seatCols, setSeatCols] = useState(8);
  const [previewSeats, setPreviewSeats] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch halls on mount
  useEffect(() => {
    fetchHalls();
  }, []);

  const fetchHalls = async () => {
    try {
      const response = await axios.get("http://localhost:4011/api/hall/get");
      setHalls(response.data);
    } catch (error) {
      console.error("Error fetching halls:", error);
    }
  };

  const handleAddSeats = async () => {
    if (selectedHalls.length === 0) {
      alert("Please select at least one hall.");
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://localhost:4011/api/seat/create", {
        halls: selectedHalls,
        seatRows,
        seatCols,
      });
      alert("Seats added successfully!");
      fetchHalls();
    } catch (error) {
      console.error("Error adding seats:", error);
    }
    setLoading(false);
  };

  const handlePreviewSeats = async (hallId) => {
    try {
      const response = await axios.get(
        `http://localhost:4011/api/seat/${hallId}`
      );
      setPreviewSeats(response.data);
      setPreviewOpen(true);
    } catch (error) {
      console.error("Error fetching seat layout:", error);
    }
  };

  const handleDeleteHall = async (hallId) => {
    if (!window.confirm("Are you sure you want to delete this hall?")) return;
    try {
      await axios.delete(`http://localhost:4011/api/hall/${hallId}`);
      fetchHalls();
    } catch (error) {
      console.error("Error deleting hall:", error);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-900 text-white">
      <h2 className="text-3xl font-bold mb-6 text-center text-green-400">
        Admin Panel - Manage Seats
      </h2>

      {/* Seat Configuration Form */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-semibold mb-4 text-green-300">Add Seats</h3>

        <label className="block mb-2 text-sm">Select Halls:</label>
        <div className="flex flex-wrap gap-2 mb-4">
          {halls.map((hall) => (
            <label key={hall._id} className="flex items-center gap-2">
              <input
                type="checkbox"
                className="checkbox checkbox-success"
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedHalls([...selectedHalls, hall._id]);
                  } else {
                    setSelectedHalls(
                      selectedHalls.filter((id) => id !== hall._id)
                    );
                  }
                }}
              />
              {hall.name}
            </label>
          ))}
        </div>

        <div className="flex gap-4 mb-4">
          <div>
            <label className="block mb-1 text-sm">Rows:</label>
            <input
              type="number"
              min="1"
              value={seatRows}
              onChange={(e) => setSeatRows(Number(e.target.value))}
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm">Columns:</label>
            <input
              type="number"
              min="1"
              value={seatCols}
              onChange={(e) => setSeatCols(Number(e.target.value))}
              className="input input-bordered w-full"
            />
          </div>
        </div>

        <button
          onClick={handleAddSeats}
          className="btn btn-success w-full"
          disabled={loading}
        >
          {loading ? "Adding Seats..." : "Add Seats"}
        </button>
      </div>

      {/* Halls Table */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4 text-green-300">
          Manage Halls
        </h3>
        <table className="table w-full text-gray-300">
          <thead>
            <tr className="bg-gray-700 text-white">
              <th>Hall Name</th>
              <th>Seat Count</th>
              <th>Preview</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {halls.map((hall) => (
              <tr key={hall._id}>
                <td>{hall.name}</td>
                <td>{hall.seatCount}</td>
                <td>
                  <button
                    onClick={() => handlePreviewSeats(hall._id)}
                    className="btn btn-outline btn-sm btn-info"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteHall(hall._id)}
                    className="btn btn-outline btn-sm btn-error"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Seat Preview Modal */}
      {previewOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-1/2">
            <h3 className="text-lg font-bold mb-4 text-green-300">
              Seat Layout
            </h3>
            <div className="grid gap-2 justify-center">
              {previewSeats
                .reduce((rows, seat) => {
                  const rowIndex = seat.seatRow - 1;
                  if (!rows[rowIndex]) rows[rowIndex] = [];
                  rows[rowIndex].push(seat);
                  return rows;
                }, [])
                .map((row, index) => (
                  <div key={index} className="flex gap-2 justify-center">
                    {row.map((seat) => (
                      <Sofa key={seat._id} className="w-6 h-6 text-gray-400" />
                    ))}
                  </div>
                ))}
            </div>
            <button
              onClick={() => setPreviewOpen(false)}
              className="btn btn-warning w-full mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSeatPanel;
