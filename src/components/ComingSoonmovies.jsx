import React, { useState } from "react";

const movieData = [
  {
    id: 1,
    title: "Kantara Chapter 1",
    poster:
      "https://m.media-amazon.com/images/M/MV5BNjkxZDRhYTYtODY1YS00MDlhLWJiMjgtOWUxNzlkYWY0M2ZhXkEyXkFqcGc@._V1_.jpg",
    genre: "Action Thriller",
    rating: "PG-13",
    duration: "166 min",
    details:
      "Kantara: Chapter 1 is an upcoming Indian Kannada-language period fantasy action thriller film set during the reign of Kadambas of Banavasi written and directed by Rishab Shetty, and produced by Vijay Kiragandur, under Hombale Films. It is a prequel to the 2022 film Kantara.",
    releaseDate: "October 2, 2025",
  },
  {
    id: 2,
    title: "Baaghi 4 ",
    poster:
      "https://pbs.twimg.com/media/Gco_MDpagAAb1hU?format=jpg&name=900x900",
    genre: "Action, Sci-Fi",
    rating: "PG-13",
    duration: "115 min",
    details:
      "Baaghi 4 is an action-packed Bollywood film that is scheduled for release in September 2025. It stars Tiger Shroff and Sanjay Dutt, and is directed by A. Harsha. The film is expected to be darker and bloodier than previous installments in the franchise.",
    releaseDate: "September 5, 2025",
  },
  {
    id: 3,
    title: "Baby John",
    poster:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSynWOvj7PHtDqV8pm5EDS5sK4CE3nVD7zTpvkNcIK4cxZ8XEB",
    genre: "Action, Adventure",
    rating: "R",
    duration: "150 min",
    details:
      "Baby John follows DCP Satya Verma IPS, who clashes with a powerful politician, Babbar Sher, after killing his son for a serious crime. In retaliation, Sher destroys Satya's family, leaving only his young daughter, Kushi, alive.",
    releaseDate: "May 24, 2025",
  },
  {
    id: 4,
    title: "Nadaaniyan",
    poster:
      "https://assets.gadgets360cdn.com/pricee/assets/product/202502/Nadaaniyan_Poster1_1739273562.jpg?downsize=220:308",
    genre: "Romance Drama",
    rating: "PG",
    duration: "105 min",
    details:
      "Nadaaniyan is a romantic comedy marking the acting debut of Ibrahim Ali Khan and Khushi Kapoor. Directed by Shauna Gautam and produced by Karan Johar's Dharmatic Entertainment, the film explores youthful love and its complexities. ",
    releaseDate: "March 14, 2025",
  },
  {
    id: 5,
    title: "Mere Husband Ki Biwi ",
    poster:
      "https://cdn.hyprop.co.za/movies/images/6762/6762-1-1-3-1739528970.jpg?w=1734&h=2572&webp",
    genre: "Action, Drama, Thriller",
    rating: "R",
    duration: "168 min",
    details:
      "A Delhi professional faces a love triangle when his old flame returns as he falls for someone new. This leads to a series of comedic misunderstandings in his relationships.",
    releaseDate: "February 21, 2025",
  },
  {
    id: 6,
    title: "Paddington in Peru",
    poster:
      "	https://cdn.hyprop.co.za/movies/images/6656/6656-1-2-3-1737558029.jpg?w=1734&h=2572&webp",
    genre: "Action, Adventure, Fantasy",
    rating: "PG-13",
    duration: "190 min",
    details:
      "When Paddington discovers his beloved aunt has gone missing from the Home for Retired Bears, he and the Brown family head to the jungles of Peru to find her. Determined to solve the mystery, they soon stumble across a legendary treasure as they make their way through the rainforests of the Amazon.",
    releaseDate: "February 21, 2025",
  },
];

const Badge = ({ children }) => (
  <span className="px-3 py-1 rounded-full text-sm font-medium bg-neutral-800 text-white">
    {children}
  </span>
);

const MovieCard = ({ movie, onClick }) => (
  <div
    className="bg-neutral-800 rounded-lg overflow-hidden transform transition-all duration-300 hover:bg-neutral-700 cursor-pointer group"
    onClick={onClick}
  >
    <div className="relative aspect-[2.5/3] overflow-hidden">
      <img
        src={movie.poster}
        alt={movie.title}
        className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
      />
      {/* <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" /> */}
    </div>
    <div className="p-4">
      <h2 className="text-lg font-semibold text-white mb-2">{movie.title}</h2>
      <div className="flex flex-wrap gap-2 mb-4">
        <Badge>{movie.genre.split(", ")[0]}</Badge>
        <Badge>{movie.rating}</Badge>
      </div>
      <button className="w-full mt-6 p-3 bg-orange-400 hover:bg-orange-500 text-white font-semibold rounded-lg flex items-center justify-center transition duration-300">
        More Details
      </button>
    </div>
  </div>
);

const Modal = ({ movie, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50 p-4">
    <div className="bg-neutral-800 rounded-lg p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-white">{movie.title}</h2>

        <div className="flex flex-wrap gap-2">
          <Badge>{movie.genre}</Badge>
          <Badge>{movie.rating}</Badge>
          <Badge>{movie.duration}</Badge>
        </div>

        <div className="space-y-3 text-neutral-300">
          <p>{movie.details}</p>
          <p>
            <span className="text-neutral-400">Release Date: </span>
            {movie.releaseDate}
          </p>
        </div>

        <button
          className="w-full mt-6 p-3 bg-orange-400 hover:bg-orange-500 text-white font-semibold rounded-lg flex items-center justify-center transition duration-300"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  </div>
);

const ComingSoon = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-900 to-black p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-8">Coming Soon</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {movieData.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onClick={() => setSelectedMovie(movie)}
            />
          ))}
        </div>

        {selectedMovie && (
          <Modal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
        )}
      </div>
    </div>
  );
};

export default ComingSoon;
