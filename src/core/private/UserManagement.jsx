import axios from "axios";
import { Pencil, Plus, Search, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminDashboard = () => {
  const [customers, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [newUser, setNewUser] = useState({ customername: "", email: "" });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:4011/api/customer");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
      toast.error("Failed to fetch customers.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      try {
        await axios.delete(`http://localhost:4011/api/customer/${id}`);
        toast.success("User deleted successfully!");
        fetchUsers(); // Refresh customer list
      } catch (error) {
        console.error("Error deleting customer:", error);
        toast.error("Failed to delete customer.");
      }
    }
  };

  const handleEdit = (customer) => {
    setEditingUser(customer);
  };

  const handleUpdateUser = async () => {
    try {
      await axios.put(
        `http://localhost:4011/api/customer/${editingUser._id}`,
        editingUser
      );
      toast.success("User updated successfully!");
      setEditingUser(null);
      fetchUsers(); // Refresh customer list
    } catch (error) {
      console.error("Error updating customer:", error);
      toast.error("Failed to update customer.");
    }
  };

  const handleAddUser = async () => {
    try {
      await axios.post("http://localhost:4011/api/customer/", newUser);
      toast.success("User added successfully!");
      setNewUser({ username: "", email: "" });
      fetchUsers(); // Refresh customer list
    } catch (error) {
      console.error("Error adding customer:", error);
      toast.error("Failed to add customer.");
    }
  };

  return (
    <div className="bg-black text-white min-h-screen p-8">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-6 text-green-400">
        Admin Dashboard 🎬
      </h1>

      {/* Search Bar */}
      <div className="flex mb-4 space-x-4">
        <input
          type="text"
          placeholder="Search customers..."
          className="bg-gray-800 text-white px-4 py-2 rounded w-full"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="bg-green-500 p-2 rounded">
          <Search className="text-white" />
        </button>
        <button
          onClick={() => setNewUser({ username: "", email: "" })}
          className="bg-green-600 px-4 py-2 rounded flex items-center"
        >
          <Plus className="text-white mr-2" /> Add User
        </button>
      </div>

      {/* Users Table */}
      <div className="overflow-auto bg-gray-900 p-4 rounded">
        <table className="w-full border border-gray-700">
          <thead className="bg-green-600 text-black">
            <tr>
              <th className="p-2">Username</th>
              <th className="p-2">Email</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers
              .filter((customer) =>
                customer.username
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
              )
              .map((customer) => (
                <tr key={customer._id} className="border-b border-gray-700">
                  <td className="p-2">{customer.username}</td>
                  <td className="p-2">{customer.email}</td>
                  <td className="p-2 flex space-x-2">
                    <button
                      onClick={() => handleEdit(customer)}
                      className="bg-blue-600 px-2 py-1 rounded"
                    >
                      <Pencil className="text-white" size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(customer._id)}
                      className="bg-red-600 px-2 py-1 rounded"
                    >
                      <Trash className="text-white" size={16} />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Edit User Modal */}
      {editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center">
          <div className="bg-gray-800 p-6 rounded">
            <h2 className="text-green-400 text-xl mb-4">Edit User</h2>
            <input
              type="text"
              value={editingUser.customername}
              onChange={(e) =>
                setEditingUser({ ...editingUser, customername: e.target.value })
              }
              className="w-full bg-gray-700 text-white p-2 rounded mb-2"
            />
            <input
              type="email"
              value={editingUser.email}
              onChange={(e) =>
                setEditingUser({ ...editingUser, email: e.target.value })
              }
              className="w-full bg-gray-700 text-white p-2 rounded mb-2"
            />
            <button
              onClick={handleUpdateUser}
              className="bg-green-600 px-4 py-2 rounded"
            >
              Update
            </button>
            <button
              onClick={() => setEditingUser(null)}
              className="bg-red-600 px-4 py-2 rounded ml-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
