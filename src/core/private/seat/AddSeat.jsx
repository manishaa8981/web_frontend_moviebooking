import axios from "axios";
import { PencilIcon, PlusIcon, TrashIcon } from "lucide-react";
import { useEffect, useState } from "react";

const AddSeat = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [halls, setHalls] = useState([]); // List of all halls
  const [selectedHalls, setSelectedHalls] = useState([]); // Selected halls for shared layout
  const [formData, setFormData] = useState({
    seatRow: "",
    seatColumn: "",
    seatName: "",
  });

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setFormData({ seatRow: "", seatColumn: "", seatName: "" }); // Reset form
    setSelectedHalls([]); // Reset selected halls
  };

  // Fetch halls on component mount
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (hallId) => {
    setSelectedHalls((prev) =>
      prev.includes(hallId)
        ? prev.filter((id) => id !== hallId)
        : [...prev, hallId]
    );
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Logic to process shared layouts
    if (selectedHalls.length > 0) {
      console.log("Shared Layout for Halls:", selectedHalls);
    }
    console.log("Seat Layout Data Submitted:", formData);

    // Add your API call or logic here to save the data
    toggleModal(); // Close modal after submission
  };

  return (
    <>
      <div className="p-4 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-indigo-900">
            Seat Management
          </h2>
          <button onClick={toggleModal} className="btn btn-primary">
            <PlusIcon size={20} /> Add Seat
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Layout</th>
                <th>Hall Name</th>
                <th>Seat Row</th>
                <th>Seats Per Row</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* Replace this dummy data with dynamic rows */}
              {halls.map((hall, index) => (
                <tr key={hall.id}>
                  <td>{index + 1}</td>
                  <td>{hall.hall_name}</td>
                  <td>{hall.seatRow}</td>
                  <td>{hall.seatColumn}</td>
                  <td>
                    <div className="flex gap-2">
                      <button className="btn btn-sm btn-secondary">
                        <PencilIcon size={16} />
                      </button>
                      <button className="btn btn-sm btn-error">
                        <TrashIcon size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 max-w-lg w-full">
            <h3 className="text-xl font-bold mb-4">Add Seat</h3>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Select Halls (Shared Layout)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {halls.map((hall) => (
                    <label key={hall.id} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        value={hall.id}
                        checked={selectedHalls.includes(hall.id)}
                        onChange={() => handleCheckboxChange(hall.id)}
                        className="checkbox"
                      />
                      {hall.name} ({hall.seatRow} Rows, {hall.seatColumn}{" "}
                      Columns)
                    </label>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Seat Row
                </label>
                <input
                  type="text"
                  name="seatRow"
                  value={formData.seatRow}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Seat Column
                </label>
                <input
                  type="number"
                  name="seatColumn"
                  value={formData.seatColumn}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Seat Name
                </label>
                <input
                  type="text"
                  name="seatName"
                  value={formData.seatName}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={toggleModal}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddSeat;
