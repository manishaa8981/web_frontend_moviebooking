// import { motion } from "framer-motion";
// import { Award, Calendar, Clock, Play, Plus, Share2, Star } from "lucide-react";
// import React, { useState } from "react";

// const MovieDescription = () => {
//   const [isTrailerPlaying, setIsTrailerPlaying] = useState(false);
//   const [selectedTab, setSelectedTab] = useState("overview");

//   // Sample movie data - replace with your actual data
//   const movie = {
//     title: "Inception",
//     tagline: "Your mind is the scene of the crime",
//     rating: 4.8,
//     duration: "2h 28min",
//     releaseDate: "2020",
//     genre: ["Sci-Fi", "Action", "Thriller"],
//     director: "Christopher Nolan",
//     description:
//       "Dom Cobb is a skilled thief, the absolute best in the dangerous art of extraction, stealing valuable secrets from deep within the subconscious during the dream state, when the mind is at its most vulnerable.",
//     cast: [
//       { name: "Leonardo DiCaprio", role: "Dom Cobb" },
//       { name: "Joseph Gordon-Levitt", role: "Arthur" },
//       { name: "Ellen Page", role: "Ariadne" },
//     ],
//     awards: [
//       "Academy Award for Best Visual Effects",
//       "Academy Award for Best Cinematography",
//     ],
//   };

//   const TabContent = () => {
//     switch (selectedTab) {
//       case "overview":
//         return (
//           <div className="space-y-4">
//             <p className="text-gray-200 leading-relaxed">{movie.description}</p>
//             <div className="grid grid-cols-2 gap-8">
//               <div>
//                 <h4 className="text-lg font-semibold mb-2 text-gray-100">
//                   Director
//                 </h4>
//                 <p className="text-gray-300">{movie.director}</p>
//               </div>
//               <div>
//                 <h4 className="text-lg font-semibold mb-2 text-gray-100">
//                   Genre
//                 </h4>
//                 <div className="flex flex-wrap gap-2">
//                   {movie.genre.map((g, index) => (
//                     <span
//                       key={index}
//                       className="px-3 py-1 bg-gray-700 rounded-full text-sm text-gray-300"
//                     >
//                       {g}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         );
//       case "cast":
//         return (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             {movie.cast.map((member, index) => (
//               <div key={index} className="bg-gray-800 p-4 rounded-lg">
//                 <div className="w-16 h-16 bg-gray-700 rounded-full mb-3 mx-auto" />
//                 <h4 className="text-gray-100 font-semibold text-center">
//                   {member.name}
//                 </h4>
//                 <p className="text-gray-400 text-sm text-center">
//                   {member.role}
//                 </p>
//               </div>
//             ))}
//           </div>
//         );
//       case "awards":
//         return (
//           <div className="space-y-4">
//             {movie.awards.map((award, index) => (
//               <div
//                 key={index}
//                 className="flex items-center gap-3 bg-gray-800 p-4 rounded-lg"
//               >
//                 <Award className="text-yellow-500" />
//                 <span className="text-gray-200">{award}</span>
//               </div>
//             ))}
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white">
//       {/* Hero Section */}
//       <div className="relative h-[70vh] overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10" />
//         <img
//           src="/api/placeholder/1920/1080"
//           alt="Movie Banner"
//           className="w-full h-full object-cover"
//         />

//         {/* Movie Info Overlay */}
//         <div className="absolute bottom-0 left-0 right-0 z-20 p-8">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="max-w-6xl mx-auto"
//           >
//             <h1 className="text-5xl font-bold mb-2">{movie.title}</h1>
//             <p className="text-xl text-gray-300 mb-6">{movie.tagline}</p>

//             <div className="flex flex-wrap items-center gap-6 mb-8">
//               <div className="flex items-center gap-2">
//                 <Star className="text-yellow-500" fill="currentColor" />
//                 <span className="text-lg">{movie.rating}/5.0</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <Clock />
//                 <span>{movie.duration}</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <Calendar />
//                 <span>{movie.releaseDate}</span>
//               </div>
//             </div>

//             <div className="flex gap-4">
//               <button
//                 className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg flex items-center gap-2 transition-colors"
//                 onClick={() => setIsTrailerPlaying(true)}
//               >
//                 <Play fill="currentColor" size={20} />
//                 Watch Trailer
//               </button>
//               <button className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center gap-2 transition-colors">
//                 <Plus size={20} />
//                 Add to Watchlist
//               </button>
//               <button className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center gap-2 transition-colors">
//                 <Share2 size={20} />
//                 Share
//               </button>
//             </div>
//           </motion.div>
//         </div>
//       </div>

//       {/* Content Tabs */}
//       <div className="max-w-6xl mx-auto px-8 py-12">
//         <div className="flex gap-8 mb-8 border-b border-gray-700">
//           {["overview", "cast", "awards"].map((tab) => (
//             <button
//               key={tab}
//               className={`pb-4 px-2 capitalize ${
//                 selectedTab === tab
//                   ? "text-red-500 border-b-2 border-red-500"
//                   : "text-gray-400 hover:text-gray-200"
//               }`}
//               onClick={() => setSelectedTab(tab)}
//             >
//               {tab}
//             </button>
//           ))}
//         </div>

//         <motion.div
//           key={selectedTab}
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.3 }}
//         >
//           <TabContent />
//         </motion.div>
//       </div>

//       {/* Trailer Modal */}
//       {isTrailerPlaying && (
//         <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
//           <div className="relative w-full max-w-4xl aspect-video">
//             <button
//               className="absolute -top-12 right-0 text-white hover:text-gray-300"
//               onClick={() => setIsTrailerPlaying(false)}
//             >
//               Close
//             </button>
//             <div className="w-full h-full bg-gray-800 rounded-lg flex items-center justify-center">
//               <span className="text-gray-400">Trailer Placeholder</span>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MovieDescription;

import axios from "axios";
import { motion } from "framer-motion";
import { Award, Calendar, Clock, Play, Plus, Share2, Star } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MovieDescription = () => {
  const [isTrailerPlaying, setIsTrailerPlaying] = useState(false);
  const [selectedTab, setSelectedTab] = useState("overview");
  const [movie, setMovie] = useState(null); // State to hold movie data
  const [loading, setLoading] = useState(true); // State to handle loading

  // Fetch movie data from API
  // useEffect(() => {
  //   const fetchMovieData = async () => {
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:4011/api/movie/${movie_id}`
  //       );

  //       if (!response.ok) throw new Error("Failed to fetch movie data");
  //       const data = await response.json();
  //       setMovie(data);
  //     } catch (error) {
  //       console.error(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchMovieData();
  // });
  // const fetchMovies = async () => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     const headers = {
  //       Authorization: `Bearer ${token}`,
  //       "Content-Type": "multipart/form-data",
  //     };
  //     const response = await axios.get(
  //       "http://localhost:4011/api/movie//movies/${id}",
  //       { headers }
  //     ); // Replace with your API endpoint
  //     setMovies(response.data);
  //     setLoading(false);
  //     console.error(err);
  //     setLoading(false);
  //   }
  // };

  const fetchMovies = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4011/api/movie/${_id}"
      );
      setMovies(response.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    fetchMovies();
  });

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  if (!movie) {
    return <div className="text-white">Movie not found</div>;
  }

  const TabContent = () => {
    switch (selectedTab) {
      case "overview":
        return (
          <div className="space-y-4">
            <p className="text-gray-200 leading-relaxed">{movie.description}</p>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-2 text-gray-100">
                  Director
                </h4>
                <p className="text-gray-300">{movie.director}</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-2 text-gray-100">
                  Genre
                </h4>
                <div className="flex flex-wrap gap-2">
                  {movie.genre.map((g, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-700 rounded-full text-sm text-gray-300"
                    >
                      {g}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case "cast":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {movie.cast.map((member, index) => (
              <div key={index} className="bg-gray-800 p-4 rounded-lg">
                <div className="w-16 h-16 bg-gray-700 rounded-full mb-3 mx-auto" />
                <h4 className="text-gray-100 font-semibold text-center">
                  {member.name}
                </h4>
                <p className="text-gray-400 text-sm text-center">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        );
      case "awards":
        return (
          <div className="space-y-4">
            {movie.awards.map((award, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-gray-800 p-4 rounded-lg"
              >
                <Award className="text-yellow-500" />
                <span className="text-gray-200">{award}</span>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <div className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10" />
        <img
          src={movie.bannerImageUrl} // Assuming the API provides a banner image URL
          alt="Movie Banner"
          className="w-full h-full object-cover"
        />

        {/* Movie Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 z-20 p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-6xl mx-auto"
          >
            <h1 className="text-5xl font-bold mb-2">{movie.title}</h1>
            <p className="text-xl text-gray-300 mb-6">{movie.tagline}</p>

            <div className="flex flex-wrap items-center gap-6 mb-8">
              <div className="flex items-center gap-2">
                <Star className="text-yellow-500" fill="currentColor" />
                <span className="text-lg">{movie.rating}/5.0</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock />
                <span>{movie.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar />
                <span>{movie.releaseDate}</span>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg flex items-center gap-2 transition-colors"
                onClick={() => setIsTrailerPlaying(true)}
              >
                <Play fill="currentColor" size={20} />
                Watch Trailer
              </button>
              <button className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center gap-2 transition-colors">
                <Plus size={20} />
                Add to Watchlist
              </button>
              <button className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center gap-2 transition-colors">
                <Share2 size={20} />
                Share
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="max-w-6xl mx-auto px-8 py-12">
        <div className="flex gap-8 mb-8 border-b border-gray-700">
          {["overview", "cast", "awards"].map((tab) => (
            <button
              key={tab}
              className={`pb-4 px-2 capitalize ${
                selectedTab === tab
                  ? "text-red-500 border-b-2 border-red-500"
                  : "text-gray-400 hover:text-gray-200"
              }`}
              onClick={() => setSelectedTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <motion.div
          key={selectedTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <TabContent />
        </motion.div>
      </div>

      {/* Trailer Modal */}
      {isTrailerPlaying && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <div className="relative w-full max-w-4xl aspect-video">
            <button
              className="absolute -top-12 right-0 text-white hover:text-gray-300"
              onClick={() => setIsTrailerPlaying(false)}
            >
              Close
            </button>
            <div className="w-full h-full bg-gray-800 rounded-lg flex items-center justify-center">
              <span className="text-gray-400">Trailer Placeholder</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDescription;
