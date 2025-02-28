import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import axios from "axios";
import { ArrowUpDown, Edit, PlusIcon, Trash2 } from "lucide-react";
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
      const response = await axios.get("http://localhost:4011/api/movie/");
      setMovies(response.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  // Save and Update
  const handleSaveMovie = async (movieData) => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      };

      const formData = new FormData();
      Object.keys(movieData).forEach((key) => {
        formData.append(key, movieData[key]);
      });

      if (movieImage) {
        formData.append("movie_image", movieImage);
      }

      if (movieData._id) {
        await axios.put(
          `http://localhost:4011/api/movie/${movieData._id}`,
          formData,
          { headers }
        );
      } else {
        await axios.post("http://localhost:4011/api/movie/", formData, {
          headers,
        });
      }

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
      header: "Movie Image",
      accessorKey: "movie_image",
      cell: ({ row }) => (
        <div className="flex justify-center">
          {row.original.movie_image ? (
            <img
              src={`http://localhost:4011/public/uploads/images/${row.original.movie_image}`}
              alt="Movie"
              className="w-24 h-24 object-cover rounded-md"
            />
          ) : (
            <span className="text-neutral-500">No Image</span>
          )}
        </div>
      ),
    },
    {
      header: "Movie Info",
      accessorKey: "movie_name",
      cell: ({ row }) => (
        <div>
          <div className="font-bold text-white">{row.original.movie_name}</div>
        </div>
      ),
    },
    {
      header: "Genre",
      accessorKey: "genre",
      cell: ({ getValue }) => (
        <span className="text-neutral-300">{getValue()}</span>
      ),
    },
    {
      header: "Duration",
      accessorKey: "duration",
      cell: ({ getValue }) => (
        <span className="text-neutral-300">{getValue()}</span>
      ),
    },
    {
      header: ({ column }) => (
        <button
          className="flex items-center gap-2 text-neutral-300 hover:text-white"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Release Date
          <ArrowUpDown size={16} />
        </button>
      ),
      accessorKey: "release_date",
      cell: ({ getValue }) => (
        <span className="text-neutral-300">{getValue()}</span>
      ),
    },
    {
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleEditMovie(row.original)}
            className="text-[#1DB954] hover:text-[#1ed760] transition-colors"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => handleDeleteMovie(row.original?._id)}
            className="text-red-500 hover:text-red-400 transition-colors"
          >
            <Trash2 size={16} />
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
    <div className="min-h-screen bg-black/95 text-white ">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-white">Movie Management</h2>
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search movies..."
              className="bg-neutral-800 text-white border-0 rounded-full px-4 py-2 focus:ring-2 focus:ring-[#1DB954]"
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
            />
            <button
              onClick={handleAddMovie}
              className="bg-neutral-600 hover:bg-neutral-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
            >
              <div className="flex">
                <PlusIcon size={20} /> Add Movie
              </div>
            </button>
          </div>
        </div>

        {/* Movie Table */}
        <div className="bg-zinc-900 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-neutral-700">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="text-left p-4 text-sm font-medium text-neutral-300"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-neutral-700">
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-neutral-700/50 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="p-4">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center justify-between mt-4 text-white">
          <div className="flex items-center gap-2">
            <button
              className="px-3 py-1 bg-neutral-800 rounded hover:bg-neutral-700 disabled:opacity-50"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              First
            </button>
            <button
              className="px-3 py-1 bg-neutral-800 rounded hover:bg-neutral-700 disabled:opacity-50"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </button>
            <button
              className="px-3 py-1 bg-neutral-800 rounded hover:bg-neutral-700 disabled:opacity-50"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </button>
            <button
              className="px-3 py-1 bg-neutral-800 rounded hover:bg-neutral-700 disabled:opacity-50"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              Last
            </button>
          </div>
          <span className="text-sm text-neutral-300">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>
          <select
            className="bg-neutral-800 text-white rounded px-2 py-1"
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
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-neutral-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-white">
                    {currentMovie ? "Edit Movie" : "Add New Movie"}
                  </h3>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-neutral-400 hover:text-white"
                  >
                    <PlusIcon className="rotate-45" size={24} />
                  </button>
                </div>

                <form
                  className="space-y-6"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);

                    const movieData = {
                      _id: currentMovie?._id,
                      movie_name: formData.get("movie_name"),
                      genre: formData.get("genre"),
                      language: formData.get("language"),
                      duration: parseInt(formData.get("duration")),
                      description: formData.get("description"),
                      release_date: formData.get("release_date"),
                      status: formData.get("status"),
                      cast_name: formData.get("cast_name"),
                      rating: parseFloat(formData.get("rating")),
                      trailer_url: formData.get("trailer_url"),
                    };

                    handleSaveMovie(movieData);
                  }}
                >
                  <div className="space-y-2">
                    <label className="block text-sm text-neutral-300">
                      Movie Name
                    </label>
                    <input
                      type="text"
                      name="movie_name"
                      className="w-full bg-neutral-700 text-white border-0 rounded-md p-3 focus:ring-2 focus:ring-[#1DB954]"
                      defaultValue={currentMovie?.movie_name}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm text-neutral-300">
                        Genre
                      </label>
                      <select
                        name="genre"
                        className="w-full bg-neutral-700 text-white border-0 rounded-md p-3 focus:ring-2 focus:ring-[#1DB954]"
                        defaultValue={currentMovie?.genre || ""}
                        required
                      >
                        <option value="">Select Genre</option>
                        {[
                          "Action",
                          "Adventure",
                          "Comedy",
                          "Drama",
                          "Horror",
                          "Science Fiction (Sci-Fi)",
                          "Fantasy",
                          "Mystery",
                          "Thriller",
                          "Romance",
                          "Documentary",
                          "Musical",
                          "Animation",
                          "Crime",
                          "Family",
                          "History",
                          "War",
                          "Western",
                          "Slice of Life",
                        ].map((genre) => (
                          <option key={genre} value={genre}>
                            {genre}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm text-neutral-300">
                        Duration
                      </label>
                      <input
                        type="text"
                        name="duration"
                        className="w-full bg-neutral-700 text-white border-0 rounded-md p-3 focus:ring-2 focus:ring-[#1DB954]"
                        defaultValue={currentMovie?.duration}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm text-neutral-300">
                      Description
                    </label>
                    <textarea
                      name="description"
                      className="w-full bg-neutral-700 text-white border-0 rounded-md p-3 focus:ring-2 focus:ring-[#1DB954] h-24"
                      defaultValue={currentMovie?.description}
                    ></textarea>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm text-neutral-300">
                        Release Date
                      </label>
                      <input
                        type="date"
                        name="release_date"
                        className="w-full bg-neutral-700 text-white border-0 rounded-md p-3 focus:ring-2 focus:ring-[#1DB954]"
                        defaultValue={currentMovie?.release_date}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm text-neutral-300">
                        Status
                      </label>
                      <select
                        name="status"
                        className=" w-full bg-neutral-700 text-white border-0 rounded-md p-3 focus:ring-2 focus:ring-[#1DB954]"
                        defaultValue={currentMovie?.status || "upcoming"}
                        required
                      >
                        <option value="Upcoming">Upcoming</option>
                        <option value="Released">Released</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm text-neutral-300">
                      Cast Name
                    </label>
                    <input
                      type="text"
                      name="cast_name"
                      className=" w-full bg-neutral-700 text-white border-0 rounded-md p-3 focus:ring-2 focus:ring-[#1DB954]"
                      defaultValue={currentMovie?.cast_name}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm text-neutral-300">
                        Rating
                      </label>
                      <select
                        name="language"
                        className="w-full bg-neutral-700 text-white border-0 rounded-md p-3 focus:ring-2 focus:ring-[#1DB954]"
                        defaultValue={currentMovie?.rating || "Hindi"}
                        required
                      >
                        <option value="G">G</option>
                        <option value="PG">PG</option>
                        <option value="PG-13">PG-13</option>
                        <option value="R">R</option>
                        <option value="NC-17">NC-17</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm text-neutral-300">
                        Language
                      </label>
                      <select
                        name="language"
                        className=" w-full bg-neutral-700 text-white border-0 rounded-md p-3 focus:ring-2 focus:ring-[#1DB954]"
                        defaultValue={currentMovie?.language || "Hindi"}
                        required
                      >
                        <option value="Hindi">Hindi</option>
                        <option value="English">English</option>
                        <option value="English">Nepali</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm text-neutral-300">
                      Trailer URL
                    </label>
                    <input
                      type="url"
                      name="trailer_url"
                      className=" w-full bg-neutral-700 text-white border-0 rounded-md p-3 focus:ring-2 focus:ring-[#1DB954]"
                      defaultValue={currentMovie?.trailer_url}
                    />
                  </div>

                  {/* Add image upload */}
                  <div className="space-y-2">
                    <label className="block text-sm text-neutral-300">
                      Movie Image
                    </label>
                    <input
                      type="file"
                      className="file-input file-input-bordered w-full bg-neutral-700 text-white border-0 rounded-md p-3 focus:ring-2 focus:ring-[#1DB954]"
                      accept="image/*"
                      onChange={(e) => setMovieImage(e.target.files[0])}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full p-3 bg-green-500 hover:bg-green-600 text-white rounded-md"
                  >
                    Save
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieAdminPanel;
