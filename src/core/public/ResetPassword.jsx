import axios from "axios";
import { Eye, EyeOff, Lock, X } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../../components/NavBar";
import Logo from "/images/logo2.png";
import FourImage from "/images/side_image.png";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Validate password length
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    // ✅ Validate password match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setLoading(true); // Start loading

    try {
      const res = await axios.post(
        `http://localhost:4011/api/auth/reset-password/${token}`,
        { password },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      toast.success(
        res.data.message || "Password reset successful! Redirecting..."
      );
      setTimeout(() => navigate("/login"), 3000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error resetting password");
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
                Reset Your Password 🔑
              </h2>
              <p className="text-gray-400 text-sm">
                Enter and confirm your new password.
              </p>
            </div>

            {/* Reset Password Form */}
            <div className="bg-neutral-700 rounded-xl p-6 shadow-2xl">
              <form className="space-y-4" onSubmit={handleSubmit}>
                {/* New Password Field */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-gray-300 text-sm font-medium mb-1"
                  >
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-neutral-600 text-white rounded-lg py-2.5 px-4 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                      placeholder="Enter new password"
                      required
                    />
                    <Lock
                      className="absolute left-3 top-3 text-gray-400"
                      size={16}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-300 transition-colors"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password Field */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-gray-300 text-sm font-medium mb-1"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full bg-neutral-600 text-white rounded-lg py-2.5 px-4 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                      placeholder="Confirm new password"
                      required
                    />
                    <Lock
                      className="absolute left-3 top-3 text-gray-400"
                      size={16}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-300 transition-colors"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={16} />
                      ) : (
                        <Eye size={16} />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-red-600 text-white py-2.5 rounded-lg font-semibold hover:bg-amber-600 transition-colors"
                  disabled={loading}
                >
                  {loading ? "Resetting..." : "Reset Password"}
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

export default ResetPassword;
