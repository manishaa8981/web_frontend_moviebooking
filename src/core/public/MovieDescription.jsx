import axios from "axios";
import { Calendar, Clock, Play, Star, Ticket } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/NavBar";
import { Card, CardContent } from "../../components/UiCard";

const LoadingSpinner = () => (
  <div className="flex items-center justify-center space-x-2">
    <div className="w-4 h-4 rounded-full bg-green-500 animate-bounce [animation-delay:-0.3s]"></div>
    <div className="w-4 h-4 rounded-full bg-green-500 animate-bounce [animation-delay:-0.15s]"></div>
    <div className="w-4 h-4 rounded-full bg-green-500 animate-bounce"></div>
  </div>
);

const Badge = ({ children, variant = "default" }) => {
  const variants = {
    default: "bg-neutral-700 text-white",
    primary: "bg-green-500 text-black",
    secondary: "bg-neutral-600 text-white",
    danger: "bg-red-500 text-white",
    warning: "bg-yellow-500 text-black",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${variants[variant]}`}
    >
      {children}
    </span>
  );
};

const Button = ({
  children,
  variant = "default",
  className = "",
  ...props
}) => {
  const variants = {
    default: "bg-neutral-800 hover:bg-neutral-700 text-white",
    primary: "bg-green-500 hover:bg-green-400 text-black",
    danger: "bg-red-600 hover:bg-red-400 text-white",
  };

  return (
    <button
      className={`px-6 py-3 rounded-full flex items-center gap-2 transition-colors ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const MovieDescription = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isTrailerPlaying, setIsTrailerPlaying] = useState(false);
  const navigate = useNavigate();

  const fetchMovie = async () => {
    try {
      const response = await axios.get(`http://localhost:4011/api/movie/${id}`);
      setMovie(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching movie:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovie();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">
            Error Loading Movie
          </h2>
          <p className="text-neutral-400">{error}</p>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">
            Movie Not Found
          </h2>
          <p className="text-neutral-400">
            The requested movie could not be found.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-neutral-900 to-black text-white">
        {/* Hero Section */}
        <div className="relative h-[60vh] overflow-hidden rounded-b-lg">
          {/* Backdrop Image with Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/70 to-transparent z-10" />
          <img
            src={`http://localhost:4011/public/uploads/images/${movie.movie_image}`}
            alt={movie.movie_name}
            className="w-full h-full object-cover"
          />

          {/* Movie Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 z-20 p-8">
            <div className="max-w-6xl mx-auto">
              <div className="flex gap-4 mb-4">
                <Badge
                  variant={movie.status === "Released" ? "primary" : "warning"}
                >
                  {movie.status}
                </Badge>
                <Badge variant="danger">PG-13</Badge>
                <Badge variant="secondary">{movie.language}</Badge>
              </div>

              <h1 className="text-4xl font-bold mb-2 text-white">
                {movie.movie_name}
              </h1>
              <p className="text-xl text-neutral-300 mb-6">{movie.title}</p>

              <div className="flex flex-wrap items-center gap-6 mb-8 text-neutral-300">
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
                  <span>{movie.release_date}</span>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  variant="danger"
                  onClick={() => setIsTrailerPlaying(true)}
                >
                  <Play fill="currentColor" size={20} />
                  Watch Trailer
                </Button>
                <Button
                  variant="primary"
                  onClick={() => navigate("/movie-booking")}
                >
                  <Ticket size={20} />
                  Book Tickets
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-6xl mx-auto px-8 py-12">
          <Card className="mb-8 bg-neutral-800 border-none">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4 text-white">
                About the Movie
              </h2>
              <p className="text-neutral-300 leading-relaxed">
                {movie.description}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-neutral-800 border-none">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4 text-white">Cast</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center gap-4">
                  <img
                    src={movie.cast_image || "/api/placeholder/100/100"}
                    alt={movie.cast_name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-white">
                      {movie.cast_name}
                    </h3>
                    <p className="text-neutral-400">Actor</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Trailer Modal */}
        {isTrailerPlaying && (
          <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
            <div className="relative w-full max-w-4xl aspect-video">
              <button
                className="absolute -top-12 right-0 text-white hover:text-neutral-300"
                onClick={() => setIsTrailerPlaying(false)}
              >
                Close
              </button>
              <iframe
                src={movie.trailer_url}
                className="w-full h-full rounded-lg"
                allowFullScreen
                title="Movie Trailer"
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MovieDescription;
