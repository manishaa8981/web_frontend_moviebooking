import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, X } from "lucide-react";
import FourImage from "./four.jpeg";
import Logo from "./logo2.png";
import GoogleIcon from "./google.png"; // Replace with the correct path
import FacebookIcon from "./facebook.png"; // Replace with the correct path

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClose = () => {
    console.log("Close button clicked");
    // Add navigation logic, e.g., redirecting to the homepage
  };

  return (
    <div className="h-screen bg-gray-900 flex overflow-hidden">
      {/* Left Side (Illustration) */}
      <div className="hidden md:block md:w-[50%] bg-gradient-to-br from-gray-800 to-gray-900 text-white flex flex-col justify-center items-center">
        <img
          src={FourImage}
          alt="Theater Illustration"
          className="rounded-lg shadow-lg"
        />
      </div>

      {/* Right Side (Login Form) */}
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
              <img src={Logo} alt="Logo" className=" h-10  shadow-lg" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">
              Hi, Welcome Back! 👋
            </h2>
            <p className="text-gray-400 text-sm">
              Please sign in to continue booking your favorite movies.
            </p>
          </div>

          {/* Login Form */}
          <div className="bg-gray-800 rounded-xl p-6 shadow-2xl">
            <form className="space-y-4">
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

              {/* Remember Me and Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    id="rememberMe"
                    name="rememberMe"
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-600 text-amber-500 focus:ring-amber-500 focus:ring-offset-gray-800"
                  />
                  <span className="ml-2 text-sm text-gray-300">
                    Remember me
                  </span>
                </label>
                <button
                  type="button"
                  className="text-sm text-blue-500 hover:text-blue-400 transition-colors"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                className="w-full bg-orange-500 text-white py-2.5 rounded-lg font-semibold hover:bg-amber-600 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                Login In
              </button>
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-800 text-gray-400">
                    Or continue with
                  </span>
                </div>
              </div>
              {/* Social Login Buttons */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 bg-transparent text-white py-2 rounded-lg hover:bg-gray-600 transition-colors text-sm"
                >
                  <img
                    src={GoogleIcon}
                    alt="Google"
                    className="w-6 h-6 rounded-full"
                  />
                  Google
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 bg-transparent text-white py-2 rounded-lg hover:bg-gray-600 transition-colors text-sm"
                >
                  <img
                    src={FacebookIcon}
                    alt="Facebook"
                    className="w-6 h-6 rounded-full"
                  />
                  Facebook
                </button>
              </div>
            </form>

            {/* Sign Up Link */}
            <p className="mt-6 text-center text-sm text-gray-400">
              Don't have an account?{" "}
              <button className="text-amber-500 hover:text-amber-400 font-medium transition-colors">
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
