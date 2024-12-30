import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import React, { useState } from "react";

const MovieTrailersSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrailer, setCurrentTrailer] = useState(null);

  const trailers = [
    {
      id: 1,
      title: "Kraven The Hunter",
      thumbnail: "/api/placeholder/300/200",
      youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      duration: "2h 09m",
      date: "Wednesday, Jan 1, 2025",
      rating: "A",
      genres: ["ACTION", "ADVENTURE"],
      language: "Hindi,English",
    },
    {
      id: 2,
      title: "Mukkam Post Bombilwadi",
      thumbnail: "/api/placeholder/300/200",
      youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      id: 3,
      title: "Baby John",
      thumbnail: "/api/placeholder/300/200",
      youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      id: 4,
      title: "Max",
      thumbnail: "/api/placeholder/300/200",
      youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      id: 5,
      title: "Barroz",
      thumbnail: "/api/placeholder/300/200",
      youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
  ];

  const handlePlayTrailer = (trailer) => {
    setCurrentTrailer(trailer);
    setIsPlaying(true);
    document.body.style.overflow = "hidden";
  };

  const handleCloseTrailer = () => {
    setIsPlaying(false);
    setCurrentTrailer(null);
    document.body.style.overflow = "auto";
  };

  const scrollTrailers = (direction) => {
    const container = document.getElementById("trailers-container");
    const scrollAmount = 300;
    if (container) {
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 w-full">
      {/* Main Content Container */}
      <div className="w-full min-h-screen bg-gray-900 text-white">
        {/* Header */}
        <div className="w-full bg-gray-800 py-6">
          <div className="container mx-auto px-6 flex justify-between items-center">
            <h2 className="text-3xl font-bold">Trailers</h2>
            <select className="select select-bordered w-48 bg-gray-700 text-white">
              <option>All Languages</option>
            </select>
          </div>
        </div>

        {/* Featured Trailer */}
        <div className="w-full h-[70vh] relative bg-blue-900">
          <img
            src="/api/placeholder/1920/1080"
            alt="Featured Trailer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent">
            <div className="absolute bottom-16 left-16 max-w-2xl">
              <h1 className="text-5xl font-bold mb-6">{trailers[0].title}</h1>
              <div className="flex items-center space-x-4 mb-8">
                <span className="badge badge-lg">{trailers[0].rating}</span>
                <span>{trailers[0].duration}</span>
                <span>{trailers[0].date}</span>
                {trailers[0].genres.map((genre) => (
                  <span key={genre} className="badge badge-outline">
                    {genre}
                  </span>
                ))}
                <span>{trailers[0].language}</span>
              </div>
              <button
                onClick={() => handlePlayTrailer(trailers[0])}
                className="btn btn-primary btn-lg gap-2"
              >
                <Play className="h-6 w-6" />
                Watch Trailer
              </button>
            </div>
          </div>
        </div>

        {/* Trailer Carousel Section */}
        <div className="bg-gray-900 py-12">
          <div className="container mx-auto px-6">
            <div className="relative">
              <button
                onClick={() => scrollTrailers("left")}
                className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 btn btn-circle btn-lg bg-gray-800/80 hover:bg-gray-700"
              >
                <ChevronLeft className="h-8 w-8" />
              </button>

              <div
                id="trailers-container"
                className="flex overflow-x-auto space-x-6 pb-4 scrollbar-hide"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {trailers.map((trailer) => (
                  <div key={trailer.id} className="flex-none w-80">
                    <div className="relative group rounded-xl overflow-hidden">
                      <img
                        src={trailer.thumbnail}
                        alt={trailer.title}
                        className="w-full h-44 object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div
                        className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                        onClick={() => handlePlayTrailer(trailer)}
                      >
                        <button className="btn btn-circle btn-lg bg-white/20 hover:bg-white/40 border-none">
                          <Play className="h-8 w-8 text-white" />
                        </button>
                      </div>
                    </div>
                    <h3 className="mt-4 text-lg font-semibold">
                      {trailer.title}
                    </h3>
                  </div>
                ))}
              </div>

              <button
                onClick={() => scrollTrailers("right")}
                className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 btn btn-circle btn-lg bg-gray-800/80 hover:bg-gray-700"
              >
                <ChevronRight className="h-8 w-8" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Trailer Modal */}
      {isPlaying && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
          <div className="relative w-full max-w-6xl mx-6">
            <button
              onClick={handleCloseTrailer}
              className="absolute -top-16 right-0 btn btn-circle btn-lg bg-gray-800/80 hover:bg-gray-700"
            >
              <X className="h-8 w-8" />
            </button>
            <div className="relative pt-[56.25%]">
              <iframe
                className="absolute inset-0 w-full h-full rounded-xl"
                src={currentTrailer?.youtubeUrl}
                title={currentTrailer?.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieTrailersSection;
