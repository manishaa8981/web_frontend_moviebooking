import React, { useState } from "react";

const movieData = [
  {
    id: 1,
    title: "Dune: Part Two",
    poster:
      "https://m.media-amazon.com/images/M/MV5BN2QyZGU4ZDctOWMzMy00NTc5LThlOGQtODhmNDI1NmY5YzAwXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg",
    genre: "Sci-Fi, Adventure",
    rating: "PG-13",
    duration: "166 min",
    details:
      "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
    releaseDate: "March 1, 2024",
  },
  {
    id: 2,
    title: "Godzilla x Kong: The New Empire",
    poster:
      "https://m.media-amazon.com/images/M/MV5BY2QwOGE2NGQtMWQwNi00M2IzLThlNWItYWMzNGQ5YWNiZDA4XkEyXkFqcGdeQXVyNTE1NjY5Mg@@._V1_QL75_UX190_CR0,2,190,281_.jpg",
    genre: "Action, Sci-Fi",
    rating: "PG-13",
    duration: "115 min",
    details:
      "Two ancient titans, Godzilla and Kong, clash in an epic battle as humans unravel their intertwined origins and connection to Skull Island's mysteries.",
    releaseDate: "April 12, 2024",
  },
  {
    id: 3,
    title: "Furiosa: A Mad Max Saga",
    poster:
      "https://m.media-amazon.com/images/M/MV5BNDRkNGNjNzMtYzE3MS00OWQyLTkzZGUtNWIyMmYwMjY3YzYxXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    genre: "Action, Adventure",
    rating: "R",
    duration: "150 min",
    details:
      "The origin story of renegade warrior Furiosa before she teamed up with Mad Max in 'Fury Road'.",
    releaseDate: "May 24, 2024",
  },
  {
    id: 4,
    title: "Inside Out 2",
    poster:
      "https://m.media-amazon.com/images/M/MV5BYTc1MDQ3NjAtOWEzMi00YzE1LWI2OWUtNjQ0OWJkMzI3MDhmXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg",
    genre: "Animation, Adventure, Comedy",
    rating: "PG",
    duration: "105 min",
    details:
      "Follow Joy, Sadness, Anger, Fear and Disgust as they navigate new challenges in Riley's teenage mind.",
    releaseDate: "June 14, 2024",
  },
  {
    id: 5,
    title: "Pushpa II: The Rule",
    poster:
      "https://m.media-amazon.com/images/M/MV5BNGZlNTFlOWMtMzUwNC00ZDdhLTk0MWUtOGZjYzFlOTBmNDdhXkEyXkFqcGdeQXVyMTUyNjIwMDEw._V1_.jpg",
    genre: "Action, Drama, Thriller",
    rating: "R",
    duration: "168 min",
    details:
      "The film tells the story of a daily labourer's rise in the underworld of redwood smuggling. The movie casts Allu Arjun and Rashmika Mandanna in the lead roles.",
    releaseDate: "December 6, 2024",
  },
  {
    id: 6,
    title: "Avatar 3",
    poster:
      "https://m.media-amazon.com/images/M/MV5BMzdjNjExMTgtZGFmNS00ZWRjLWJmNjAtOTliYzJjYjcxMWFhXkEyXkFqcGdeQXVyMjYwNDA2MDE@._V1_.jpg",
    genre: "Action, Adventure, Fantasy",
    rating: "PG-13",
    duration: "190 min",
    details:
      "Jake Sully and Ney'tiri's adventure continues as they face new challenges in Pandora.",
    releaseDate: "December 20, 2024",
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
      <button className="w-full bg-green-500 text-black py-2 rounded-full font-medium hover:bg-green-400 transition duration-300">
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
          className="w-full bg-green-500 text-black py-3 rounded-full font-medium hover:bg-green-400 transition duration-300 mt-4"
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
