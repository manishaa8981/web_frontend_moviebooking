import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import axios from "axios";
import { ArrowUpDown, PencilIcon, PlusIcon, TrashIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

const MovieAdminPanel = () => {
  const [movies, setMovies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMovie, setCurrentMovie] = useState(null);
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState([]);
  const [movieImage, setMovieImage] = useState(null);
  // Fetch movies from the backend
  const fetchMovies = async () => {
    try {
      const response = await axios.get("http://localhost:4011/api/movie/get");
      setMovies(response.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  // Handle movie submission (add or update)
  // const handleSaveMovie = async (movie) => {
  //   try {
  //     if (movie.id) {
  //       // Update movie
  //       await axios.put(`http://localhost:4011/api/movie/${movie.id}`, movie);
  //     } else {
  //       // Add new movie
  //       await axios.post("http://localhost:4011/api/movie/save", movie);
  //     }
  //     fetchMovies(); // Refresh the movie list
  //     setIsModalOpen(false);
  //   } catch (error) {
  //     console.error("Error saving movie:", error);
  //   }
  // };

  // const handleSaveMovie = async (movieData) => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     const headers = {
  //       Authorization: `Bearer ${token}`,
  //       "Content-Type": "multipart/form-data",
  //     };

  //     // Create FormData object to handle file upload
  //     const formData = new FormData();

  //     // Add all movie data to FormData
  //     Object.keys(movieData).forEach((key) => {
  //       formData.append(key, movieData[key]);
  //     });

  //     // Add image file if one was selected
  //     if (movieImage) {
  //       formData.append("movie_image", movieImage);
  //     }

  //     if (movieData?.id) {
  //       // Update movie
  //       await axios.put(
  //         `http://localhost:4011/api/movie/${movieData?.id}`,
  //         formData,
  //         {
  //           headers,
  //         }
  //       );
  //     } else {
  //       // Add new movie
  //       await axios.post("http://localhost:4011/api/movie/save", formData, {
  //         headers,
  //       });
  //     }

  //     // Clear form after saving
  //     setMovieImage(null); // Clear the selected movie image
  //     setIsModalOpen(false); // Close the modal
  //     setCurrentMovie(null); // Reset current movie
  //     fetchMovies(); // Refresh the movie list
  //   } catch (e) {
  //     console.error("Error saving movie:", e);
  //   }
  // };
  const handleSaveMovie = async (movieData) => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      };

      const formData = new FormData();

      // Add all movie data to FormData
      Object.keys(movieData).forEach((key) => {
        formData.append(key, movieData[key]);
      });

      // Add image file if one is selected
      if (movieImage) {
        formData.append("movie_image", movieImage);
      }

      if (movieData.id) {
        // Update movie
        await axios.put(
          `http://localhost:4011/api/movie/${movieData.id}`,
          formData,
          { headers }
        );
      } else {
        // Add new movie
        await axios.post("http://localhost:4011/api/movie/save", formData, {
          headers,
        });
      }

      // Refresh movies and close modal
      await fetchMovies();
      setIsModalOpen(false);
      setCurrentMovie(null);
      setMovieImage(null);
    } catch (error) {
      console.error("Error saving movie:", error);
      alert("Failed to save movie. Please try again.");
    }
  };

  // Handle movie deletion
  const handleDeleteMovie = async (id) => {
    try {
      await axios.delete(`http://localhost:4011/api/movie/${id}`);
      fetchMovies();
      // Refresh the movie list
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  // Open modal for adding a new movie
  const handleAddMovie = () => {
    setCurrentMovie(null);
    setIsModalOpen(true);
  };

  // Open modal for editing an existing movie
  const handleEditMovie = (movie) => {
    setCurrentMovie(movie);
    setIsModalOpen(true);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const columns = [
    {
      header: "Movie Info",
      accessorKey: "movie_name",
      cell: ({ row }) => (
        <div>
          <div className="font-bold">{row.original.movie_name}</div>
          <div className="text-sm opacity-50">{row.original.title}</div>
        </div>
      ),
    },
    { header: "Genre", accessorKey: "genre" },
    { header: "Duration", accessorKey: "duration" },
    {
      header: ({ column }) => (
        <button
          className="flex items-center gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Release Date
          <ArrowUpDown size={16} />
        </button>
      ),
      accessorKey: "release_date",
    },
    {
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleEditMovie(row.original)}
            className="btn btn-ghost btn-sm"
          >
            <PencilIcon size={16} />
          </button>
          <button
            onClick={() => handleDeleteMovie(row.original?._id)}
            className="btn btn-ghost btn-sm text-error"
          >
            <TrashIcon size={16} />
          </button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: movies,
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
        <h2 className="text-2xl font-bold">Movie Management</h2>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search movies..."
            className="input input-bordered"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
          <button onClick={handleAddMovie} className="btn btn-primary">
            <PlusIcon size={20} /> Add Movie
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
              {currentMovie ? "Edit Movie" : "Add New Movie"}
            </h3>
            <form
              className="space-y-4 mt-4"
              onSubmit={(e) => {
                e.preventDefault();
                const movieData = {
                  id: currentMovie?._id, // Only include ID if editing
                  movie_name: e.target.movie_name.value,
                  title: e.target.title.value,
                  genre: e.target.genre.value,
                  duration: e.target.duration.value,
                  description: e.target.description.value,
                  release_date: e.target.release_date.value,
                  status: e.target.status.value,
                  cast_name: e.target.cast_name.value,
                  rating: parseFloat(e.target.rating.value),
                };
                handleSaveMovie(movieData);
              }}
            >
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Movie Name</span>
                </label>
                <input
                  type="text"
                  name="movie_name"
                  className="input input-bordered"
                  defaultValue={currentMovie?.movie_name}
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  name="title"
                  className="input input-bordered"
                  defaultValue={currentMovie?.title}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Genre</span>
                  </label>
                  <input
                    type="text"
                    name="genre"
                    className="input input-bordered"
                    defaultValue={currentMovie?.genre}
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Duration</span>
                  </label>
                  <input
                    type="text"
                    name="duration"
                    className="input input-bordered"
                    defaultValue={currentMovie?.duration}
                    required
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <textarea
                  name="description"
                  className="textarea textarea-bordered h-24"
                  defaultValue={currentMovie?.description}
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Release Date</span>
                  </label>
                  <input
                    type="date"
                    name="release_date"
                    className="input input-bordered"
                    defaultValue={currentMovie?.release_date}
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Status</span>
                  </label>
                  <select
                    name="status"
                    className="select select-bordered"
                    defaultValue={currentMovie?.status || "upcoming"}
                    required
                  >
                    <option value="upcoming">Upcoming</option>
                    <option value="released">Released</option>
                  </select>
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Cast Name</span>
                </label>
                <input
                  type="text"
                  name="cast_name"
                  className="input input-bordered"
                  defaultValue={currentMovie?.cast_name}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Rating</span>
                </label>
                <input
                  type="number"
                  name="rating"
                  min="0"
                  max="5"
                  step="0.1"
                  className="input input-bordered"
                  defaultValue={currentMovie?.rating}
                />
              </div>
              {/* Add image upload */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Movie Image</span>
                </label>
                <input
                  type="file"
                  className="file-input file-input-bordered"
                  accept="image/*"
                  onChange={(e) => setMovieImage(e.target.files[0])}
                />
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

export default MovieAdminPanel;
