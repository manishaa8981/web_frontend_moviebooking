import axios from "axios";
import { Eye, EyeOff, Lock, Mail, Phone, User, X } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../../components/NavBar";
import FacebookIcon from "/images/facebook.png";
import GoogleIcon from "/images/google.png";
import FourImage from "/images/side_image.png";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [username, setusername] = useState("");
  const [contact_no, setcontact_no] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) {
      return;
    }

    if (!username || !email || !contact_no || !password || !confirmPassword) {
      toast.error("All fields are required!");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Invalid email format!");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters!");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post(
        "http://localhost:4011/api/auth/register",
        {
          username,
          email,
          contact_no,
          password,
        }
      );

      console.log("Response:", response.data);

      if (response.status === 201) {
        toast.success("Registration successful! Redirecting to login...", {
          autoClose: 3000, // Wait 3 seconds before redirecting
          position: "top-right",
        });

        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    } catch (error) {
      if (!error.response) {
        toast.error("Network error. Please try again.");
      } else {
        toast.error(
          error.response?.data?.message || "Registration failed. Try again."
        );
      }
    } finally {
      setIsSubmitting(false);
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

        {/* Right Side (Sign-Up Form) */}
        <div className="w-full md:w-[50%] flex items-center justify-center p-6 pt-16 relative">
          {/* Close Button */}
          <button
            onClick={() => navigate("/")}
            className="absolute top-20 right-4 text-gray-400 hover:text-gray-300 transition-colors"
            aria-label="Close"
          >
            <X size={24} />
          </button>

          <div className="max-w-md w-full">
            {/* Logo and Welcome Text */}
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-2 mb-4">
                {/* <img src={Logo} alt="Logo" className="w-20 h-20 rounded-full shadow-lg" /> */}
              </div>
              <h2 className="text-2xl font-bold text-white mt-1">
                Create Your Account 🎥
              </h2>
              {/* <p className="text-gray-400 text-sm">
                Sign up to start booking your favorite movies.
              </p> */}
            </div>

            {/* Sign-Up Form */}
            <div className="bg-neutral-700 rounded-xl p-6 shadow-2xl">
              <form className="space-y-4" onSubmit={handleSubmit}>
                {/* Username Input */}
                <div>
                  <label
                    htmlFor="username"
                    className="block text-gray-300 text-sm font-medium mb-1"
                  >
                    Username
                  </label>
                  <div className="relative">
                    <input
                      id="username"
                      name="username"
                      type="username"
                      value={username}
                      onChange={(e) => setusername(e.target.value)}
                      className="w-full bg-neutral-600 text-white rounded-lg py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                      placeholder="Enter your username"
                    />
                    <User
                      className="absolute left-3 top-3 text-gray-400"
                      size={16}
                    />
                  </div>
                </div>
                {/* Email Input */}
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
                      className="w-full bg-neutral-600 text-white rounded-lg py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                      placeholder="Enter your email"
                    />
                    <Mail
                      className="absolute left-3 top-3 text-gray-400"
                      size={16}
                    />
                  </div>
                </div>
                {/* Phone Input */}
                <div>
                  <label
                    htmlFor="contact_no"
                    className="block text-gray-300 text-sm font-medium mb-1"
                  >
                    Phone
                  </label>
                  <div className="relative">
                    <input
                      id="contact_no"
                      name="contact_no"
                      type="text"
                      value={contact_no}
                      onChange={(e) => setcontact_no(e.target.value)}
                      className="w-full bg-neutral-600 text-white rounded-lg py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                      placeholder="Enter your phone number"
                    />
                    <Phone
                      className="absolute left-3 top-3 text-gray-400"
                      size={16}
                    />
                  </div>
                </div>
                {/* Password Input */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-gray-300 text-sm font-medium mb-1"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-neutral-600 text-white rounded-lg py-2 px-4 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                      placeholder="Enter your password"
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
                {/* Confirm Password Input */}
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
                      className="w-full bg-neutral-600 text-white rounded-lg py-2 px-4 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                      placeholder="Confirm your password"
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
                {/* Sign Up Button */}
                <button
                  type="submit"
                  className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-amber-600 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  Sign Up
                </button>
                {/* Social Sign Up Buttons */}
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 bg-neutral-600 text-white py-2 rounded-lg hover:bg-gray-600 transition-colors text-sm"
                  >
                    <img
                      src={GoogleIcon}
                      alt="Google"
                      className="w-4 h-4 rounded-full"
                    />
                    Google
                  </button>
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 bg-neutral-600 text-white py-2 rounded-lg hover:bg-gray-600 transition-colors text-sm"
                  >
                    <img
                      src={FacebookIcon}
                      alt="Facebook"
                      className="w-4 h-4 rounded-full"
                    />
                    Facebook
                  </button>
                </div>
              </form>

              {/* Sign In Link */}
              <p className="mt-6 text-center text-m font-medium text-gray-400">
                Already have an account?{" "}
                <button
                  onClick={() => navigate("/Login")}
                  className="text-blue-500 text-m  hover:text-amber-400 font-medium transition-colors"
                >
                  Sign in
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
