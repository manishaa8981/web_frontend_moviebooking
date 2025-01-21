import { X } from "lucide-react";
import React, { useState } from "react";
import AsNavFor from "./AsNavFor"; // Import the slider component

const MovieTrailersSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrailer, setCurrentTrailer] = useState(null);

  const trailers = [
    {
      id: 1,
      title: "Kraven The Hunter",
      thumbnail: "/api/placeholder/300/200",
      youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    // Add more trailer objects...
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

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-6">Trailers</h2>
        <AsNavFor trailers={trailers} onPlayTrailer={handlePlayTrailer} />
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
