import { useState } from "react";
import axios from "axios";
import { Mail, X } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/NavBar";
import FourImage from "/images/side_image.png";
import Logo from "/images/logo2.png";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:4011/api/auth/forgot-password",
        { email }
      );
      toast.success(res.data.message || "Reset link sent to your email");
    } catch (error) {
      toast.error("Error sending reset email. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className="h-screen bg-neutral-800 flex justify-center overflow-hidden">
        {/* Left Side (Illustration) */}
        <div className="hidden md:block md:w-[50%] bg-gradient-to-br from-gray-800 to-gray-900 text-white flex flex-col justify-center items-center">
          <img
            src={FourImage}
            alt="Theater Illustration"
            className="rounded-lg shadow-lg h-fit w-full"
          />
        </div>

        {/* Right Side (Form Section) */}
        <div className="w-full md:w-[50%] flex items-center justify-center p-6 relative">
          <button
            onClick={() => navigate("/login")}
            className="absolute top-20 right-4 text-gray-400 hover:text-gray-300 transition-colors"
            aria-label="Close"
          >
            <X size={24} />
          </button>

          <div className="max-w-md w-full">
            {/* Logo and Title */}
            <div className="text-center mb-6">
              <img src={Logo} alt="Logo" className="h-10 shadow-lg mx-auto" />
              <h2 className="text-xl font-bold text-white mt-2">
                Forgot Your Password? 🔒
              </h2>
              <p className="text-gray-400 text-sm">
                Enter your email below, and we'll send you a reset link.
              </p>
            </div>

            {/* Forgot Password Form */}
            <div className="bg-neutral-700 rounded-xl p-6 shadow-2xl">
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-gray-300 text-sm font-medium mb-1"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-neutral-600 text-white rounded-lg py-2.5 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                      placeholder="Enter your email"
                      required
                    />
                    <Mail className="absolute left-3 top-3 text-gray-400" size={16} />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-red-600 text-white py-2.5 rounded-lg font-semibold hover:bg-amber-600 transition-colors"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Reset Link"}
                </button>

                <button
                  onClick={() => navigate("/login")}
                  className="flex justify-center text-gray-400 mt-2 hover:text-amber-400 transition"
                >
                  Back to Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
