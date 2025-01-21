import { Play, X } from "lucide-react";
import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const TrailersPlaying = () => {
  const [selectedMovie, setSelectedMovie] = useState({
    title: "KRAVEN THE HUNTER",
    duration: "2h 09m",
    date: "Wednesday, Jan 1, 2025",
    languages: "Hindi,English",
    genres: ["ACTION", "ADVENTURE"],
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  });

  const [isPlaying, setIsPlaying] = useState(false);

  const trailers = [
    {
      id: 1,
      title: "New Movie",
      thumbnail: "/images/movie11.jpg",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      id: 2,
      title: "Bollywood Movie",
      thumbnail: "/images/movie22.jpg",
      videoUrl: "https://www.youtube.com/embed/VIDEO_ID_2",
    },
    {
      id: 3,
      title: "John",
      thumbnail: "/images/movie33.jpg",
      videoUrl: "https://www.youtube.com/embed/VIDEO_ID_3",
    },
    {
      id: 4,
      title: "Ruthless Hunter",
      thumbnail: "/images/movie44.jpg",
      videoUrl: "https://www.youtube.com/embed/VIDEO_ID_3",
    },
    {
      id: 5,
      title: "Park",
      thumbnail: "/images/movie55.jpg",
      videoUrl: "https://www.youtube.com/embed/VIDEO_ID_3",
    },
    {
      id: 6,
      title: "Park",
      thumbnail: "/images/movie66.jpg",
      videoUrl: "https://www.youtube.com/embed/VIDEO_ID_3",
    },
    {
      id: 7,
      title: "Park",
      thumbnail: "/images/movie77.jpg",
      videoUrl: "https://www.youtube.com/embed/VIDEO_ID_3",
    },
  ];

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 relative">
      {/* Main Page */}
      <div
        className={`container mx-auto px-4 py-8 ${isPlaying ? "blur-sm" : ""}`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Trailers</h1>
          <select className="p-2 border rounded-md">
            <option>All Languages</option>
          </select>
        </div>

        {/* Main Featured Trailer */}
        <div className="relative w-full h-[500px] mb-8 rounded-lg overflow-hidden group">
          <img
            src="/images/movie77.jpg"
            alt={selectedMovie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40">
            <div className="absolute bottom-0 left-0 p-8 text-white">
              <h2 className="text-4xl font-bold mb-4">{selectedMovie.title}</h2>
              <div className="flex items-center gap-4 text-sm">
                <span>A</span>
                <span>•</span>
                <span>{selectedMovie.duration}</span>
                <span>•</span>
                <span>{selectedMovie.date}</span>
                <span>•</span>
                <div className="flex gap-2">
                  {selectedMovie.genres.map((genre) => (
                    <span key={genre} className="px-2 py-1 border rounded-sm">
                      {genre}
                    </span>
                  ))}
                </div>
                <span>•</span>
                <span>{selectedMovie.languages}</span>
              </div>
            </div>
            <button
              onClick={() => setIsPlaying(true)}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-90 rounded-full p-8 group-hover:scale-110 transition-transform"
            >
              <Play className="w-12 h-12 text-black" />
            </button>
          </div>
        </div>

        {/* Trailer Thumbnails Slider */}
        <Slider {...sliderSettings}>
          {trailers.map((trailer) => (
            <div
              key={trailer.id}
              className="relative group cursor-pointer px-2"
              onClick={() =>
                setSelectedMovie({
                  ...selectedMovie,
                  title: trailer.title,
                  videoUrl: trailer.videoUrl,
                })
              }
            >
              <img
                src={trailer.thumbnail}
                alt={trailer.title}
                className="w-full h-36 object-cover rounded-lg"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                <Play className="w-12 h-12 text-white" />
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Video Overlay */}
      {isPlaying && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="relative w-full max-w-4xl aspect-video">
            <iframe
              src={selectedMovie.videoUrl}
              title="YouTube Video Player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
            <button
              onClick={() => setIsPlaying(false)}
              className="absolute top-2 right-2 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-80"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrailersPlaying;
