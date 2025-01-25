import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import axios from "axios";
import { PlusIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { FaEdit, FaTimes, FaTrash } from "react-icons/fa";

const HallAdminPanel = () => {
  const [halls, setHalls] = useState([]);
  const [movies, setMovies] = useState([]); // Fetch movie data
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentHall, setCurrentHall] = useState(null);
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState([]);

  // Fetch halls and movies from the backend
  const fetchHalls = async () => {
    try {
      const response = await axios.get("http://localhost:4011/api/hall/get");
      setHalls(response.data);
    } catch (error) {
      console.error("Error fetching halls:", error);
    }
  };

  const fetchMovies = async () => {
    try {
      const response = await axios.get("http://localhost:4011/api/movie/get");
      setMovies(response.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  // Save and Update Hall
  const handleSaveHall = async (hallData) => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      if (hallData._id) {
        // Update hall
        await axios.put(
          `http://localhost:4011/api/hall/${hallData._id}`,
          hallData,
          { headers }
        );
      } else {
        // Add new hall
        await axios.post("http://localhost:4011/api/hall/save", hallData, {
          headers,
        });
      }

      // Refresh halls and close modal
      await fetchHalls();
      setIsModalOpen(false);
      setCurrentHall(null);
    } catch (error) {
      console.error("Error saving hall:", error);
      alert("Failed to save hall. Please try again.");
    }
  };

  // Handle hall deletion
  const handleDeleteHall = async (id) => {
    try {
      await axios.delete(`http://localhost:4011/api/hall/${id}`);
      fetchHalls();
    } catch (error) {
      console.error("Error deleting hall:", error);
    }
  };

  // Open modal for adding a new hall
  const handleAddHall = () => {
    setCurrentHall(null);
    setIsModalOpen(true);
  };

  // Open modal for editing an existing hall
  const handleEditHall = (hall) => {
    setCurrentHall(hall);
    setIsModalOpen(true);
  };

  useEffect(() => {
    fetchHalls();
    fetchMovies(); // Fetch movies as well
  }, []);

  const columns = [
    {
      header: "Hall Name",
      accessorKey: "hall_name",
    },
    {
      header: "Hall Capacity",
      accessorKey: "capacity",
    },
    {
      header: "Movie",
      accessorKey: "movieId",
      cell: ({ row }) => {
        const movie = movies.find((m) => m._id === row.original.movieId);
        return movie ? movie.movie_name : "Not assigned";
      },
    },
    {
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleEditHall(row.original)}
            className="btn btn-ghost btn-sm"
          >
            <FaEdit size={16} />
          </button>
          <button
            onClick={() => handleDeleteHall(row.original?._id)}
            className="btn btn-ghost btn-sm text-error"
          >
            <FaTrash size={16} />
          </button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: halls,
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
        <h2 className="text-2xl font-bold text-indigo-900">Hall Management</h2>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search halls..."
            className="input input-bordered"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
          <button onClick={handleAddHall} className="btn btn-primary">
            <PlusIcon size={20} /> Add Hall
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
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-lg">
                {currentHall ? "Edit Hall" : "Add New Hall"}
              </h3>
              <FaTimes
                className="text-xl cursor-pointer hover:text-red-600"
                onClick={() => setIsModalOpen(false)}
              />
            </div>

            <form
              className="space-y-4 mt-4"
              onSubmit={(e) => {
                e.preventDefault();
                const hallData = {
                  _id: currentHall?._id, // Only include ID if editing
                  hall_name: e.target.hall_name.value,
                  capacity: e.target.capacity.value,
                  price: e.target.price.value, // Added price
                  rows: e.target.rows.value, // Added rows
                  seats_per_row: e.target.seats_per_row.value, // Added seats_per_row
                  movieId: e.target.movieId.value, // Assigned movie
                };
                handleSaveHall(hallData);
              }}
            >
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Hall Name</span>
                </label>
                <input
                  type="text"
                  name="hall_name"
                  className="input input-bordered"
                  defaultValue={currentHall?.hall_name}
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Capacity</span>
                </label>
                <input
                  type="number"
                  name="capacity"
                  className="input input-bordered"
                  defaultValue={currentHall?.capacity}
                  required
                />
              </div>

              {/* Price Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Price</span>
                </label>
                <input
                  type="number"
                  name="price"
                  className="input input-bordered"
                  defaultValue={currentHall?.price}
                  required
                />
              </div>

              {/* Rows Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Rows</span>
                </label>
                <input
                  type="number"
                  name="rows"
                  className="input input-bordered"
                  defaultValue={currentHall?.rows}
                  required
                />
              </div>

              {/* Seats per row Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Seats per Row</span>
                </label>
                <input
                  type="number"
                  name="seats_per_row"
                  className="input input-bordered"
                  defaultValue={currentHall?.seats_per_row}
                  required
                />
              </div>

              {/* Movie Dropdown */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Movie</span>
                </label>
                <select
                  name="movieId"
                  className="select select-bordered"
                  defaultValue={currentHall?.movieId}
                >
                  <option value="">Select Movie</option>
                  {movies.map((movie) => (
                    <option key={movie._id} value={movie._id}>
                      {movie.movie_name}
                    </option>
                  ))}
                </select>
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

export default HallAdminPanel;
