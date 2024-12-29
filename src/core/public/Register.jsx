import { Eye, EyeOff, Lock, Mail, User, X } from "lucide-react";
import React, { useState } from "react";
import FacebookIcon from "/images/facebook.png"; // Replace with the correct path
import GoogleIcon from "/images/google.png"; // Replace with the correct path

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleClose = () => {
    console.log("Close button clicked");
    // Add navigation logic, e.g., redirecting to the homepage
  };

  return (
    <div className="h-screen bg-gray-900 flex justify-center overflow-hidden">
      {/* Left Side (Illustration) */}
      {/* <div className="hidden md:block md:w-[50%] bg-gradient-to-br from-gray-800 to-gray-900 text-white flex flex-col justify-center items-center">
        <img
          src={FourImage}
          alt="Theater Illustration"
          className="rounded-lg shadow-lg"
        />
      </div> */}

      {/* Right Side (Sign-Up Form) */}
      <div className="w-full md:w-[50%] flex items-center justify-center p-6 relative">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-300 transition-colors"
          aria-label="Close"
        >
          <X size={24} />
        </button>

        <div className="max-w-md w-full">
          {/* Logo and Welcome Text */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-4">
              {/* <img
                src={Logo}
                alt="Logo"
                className="w-20 h-20 rounded-full shadow-lg"
              /> */}
            </div>
            <h2 className="text-xl font-bold text-white mb-2">
              Create Your Account 🎥
            </h2>
            <p className="text-gray-400 text-sm">
              Sign up to start booking your favorite movies.
            </p>
          </div>

          {/* Sign-Up Form */}
          <div className="bg-gray-800 rounded-xl p-6 shadow-2xl">
            <form className="space-y-4">
              {/* Name Input */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-gray-300 text-sm font-medium mb-1"
                >
                  Full Name
                </label>
                <div className="relative">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-gray-700 text-white rounded-lg py-2.5 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                    placeholder="Enter your name"
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
                    className="w-full bg-gray-700 text-white rounded-lg py-2.5 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                    placeholder="Enter your email"
                  />
                  <Mail
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
                    className="w-full bg-gray-700 text-white rounded-lg py-2.5 px-4 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
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
                    className="w-full bg-gray-700 text-white rounded-lg py-2.5 px-4 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                    placeholder="Confirm your password"
                  />
                  <Lock
                    className="absolute left-3 top-3 text-gray-400"
                    size={16}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
                className="w-full bg-orange-800 text-white py-2.5 rounded-lg font-semibold hover:bg-amber-600 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                Sign Up
              </button>

              {/* Social Sign Up Buttons */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-600 transition-colors text-sm"
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
                  className="flex items-center justify-center gap-2 bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-600 transition-colors text-sm"
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
            <p className="mt-6 text-center text-sm text-gray-400">
              Already have an account?{" "}
              <button className="text-amber-500 hover:text-amber-400 font-medium transition-colors">
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
