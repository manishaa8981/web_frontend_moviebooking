import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import axios from "axios";
import { Check, PencilIcon, PlusIcon, TrashIcon, X } from "lucide-react";
import React, { useEffect, useState } from "react";

const SeatAdminPanel = () => {
  const [seats, setSeats] = useState([]);
  const [halls, setHalls] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSeat, setCurrentSeat] = useState(null);
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState([]);

  // Fetch seats from the backend
  const fetchSeats = async () => {
    try {
      const response = await axios.get("http://localhost:4011/api/seat/get");
      setSeats(response.data);
    } catch (error) {
      console.error("Error fetching seats:", error);
    }
  };

  // Fetch halls for dropdown
  const fetchHalls = async () => {
    try {
      const response = await axios.get("http://localhost:4011/api/hall/get");
      setHalls(response.data);
    } catch (error) {
      console.error("Error fetching halls:", error);
    }
  };

  // Handle seat submission (add or update)
  const handleSaveSeat = async (seatData) => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      if (seatData.id) {
        // Update seat
        await axios.put(
          `http://localhost:4011/api/seat/${seatData.id}`,
          seatData,
          {
            headers,
          }
        );
      } else {
        // Add new seat
        await axios.post("http://localhost:4011/api/seat/save", seatData, {
          headers,
        });
      }
      fetchSeats();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving seat:", error);
      alert(`Error: ${error.response?.data?.message || "Unable to save seat"}`);
    }
  };

  // Handle seat deletion
  const handleDeleteSeat = async (id) => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(`http://localhost:4011/api/seats/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchSeats();
    } catch (error) {
      console.error("Error deleting seat:", error);
      alert(
        `Error: ${error.response?.data?.message || "Unable to delete seat"}`
      );
    }
  };

  // Open modal for adding a new seat
  const handleAddSeat = () => {
    setCurrentSeat(null);
    setIsModalOpen(true);
  };

  // Open modal for editing an existing seat
  const handleEditSeat = (seat) => {
    setCurrentSeat(seat);
    setIsModalOpen(true);
  };

  useEffect(() => {
    fetchSeats();
    fetchHalls();
  }, []);

  const columns = [
    {
      header: "Seat Number",
      accessorKey: "seat_number",
    },
    {
      header: "Row Number",
      accessorKey: "row_number",
    },
    {
      header: "Hall",
      accessorKey: "hallId",
      cell: ({ row }) => {
        const hall = halls.find((h) => h._id === row.original.hallId);
        return hall ? hall.hall_name : "Not assigned";
      },
    },
    {
      header: "Availability",
      accessorKey: "is_available",
      cell: ({ row }) => (
        <div className="flex items-center">
          {row.original.is_available ? (
            <Check className="text-green-500" size={20} />
          ) : (
            <X className="text-red-500" size={20} />
          )}
        </div>
      ),
    },
    {
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleEditSeat(row.original)}
            className="btn btn-ghost btn-sm"
          >
            <PencilIcon size={16} />
          </button>
          <button
            onClick={() => handleDeleteSeat(row.original._id)}
            className="btn btn-ghost btn-sm text-error"
          >
            <TrashIcon size={16} />
          </button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: seats,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Seat Management</h2>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search seats..."
            className="input input-bordered"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
          <button onClick={handleAddSeat} className="btn btn-primary">
            <PlusIcon size={20} /> Add Seat
          </button>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="table w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2">
          <button
            className="btn btn-sm"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            First
          </button>
          <button
            className="btn btn-sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </button>
          <button
            className="btn btn-sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </button>
          <button
            className="btn btn-sm"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            Last
          </button>
        </div>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </strong>
        </span>
        <select
          className="select select-bordered select-sm"
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[5, 10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              {currentSeat ? "Edit Seat" : "Add New Seat"}
            </h3>
            <form
              className="space-y-4 mt-4"
              onSubmit={(e) => {
                e.preventDefault();
                const seatData = {
                  id: currentSeat?._id,
                  seat_number: e.target.seat_number.value,
                  row_number: e.target.row_number.value,
                  hallId: e.target.hallId.value,
                  is_available: e.target.is_available.checked,
                };
                handleSaveSeat(seatData);
              }}
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Seat Number</span>
                  </label>
                  <input
                    type="text"
                    name="seat_number"
                    className="input input-bordered"
                    defaultValue={currentSeat?.seat_number}
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Row Number</span>
                  </label>
                  <input
                    type="text"
                    name="row_number"
                    className="input input-bordered"
                    defaultValue={currentSeat?.row_number}
                    required
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Hall</span>
                </label>
                <select
                  name="hallId"
                  className="select select-bordered"
                  defaultValue={currentSeat?.hallId}
                  required
                >
                  <option value="">Select Hall</option>
                  {halls.map((hall) => (
                    <option key={hall._id} value={hall._id}>
                      {hall.hall_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">Available</span>
                  <input
                    type="checkbox"
                    name="is_available"
                    className="checkbox"
                    defaultChecked={currentSeat?.is_available ?? true}
                  />
                </label>
              </div>

              <div className="modal-action">
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeatAdminPanel;
