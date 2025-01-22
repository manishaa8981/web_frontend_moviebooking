import axios from "axios"; // Import Axios
import { Eye, EyeOff, Lock, UserRound, X } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../../components/NavBar";
import { AdminLoginContext } from "../../context/AdminLoginContext";
import FacebookIcon from "/images/facebook.png";
import GoogleIcon from "/images/google.png";
import Logo from "/images/logo2.png";
import FourImage from "/images/side_image.png";

const Login = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { setIsAdminLoggedIn } = useContext(AdminLoginContext); // Access the admin login state

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // Adjust the scroll threshold as needed
    };

    const debounce = (func, delay) => {
      let timer;
      return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => func(...args), delay);
      };
    };

    const debouncedScroll = debounce(handleScroll, 100);

    window.addEventListener("scroll", debouncedScroll);
    return () => window.removeEventListener("scroll", debouncedScroll);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setErrorMessage(""); // Reset error message

    if (!username || !password) {
      setErrorMessage("Username and Password are required");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:4011/api/auth/login`,
        {
          username,
          password,
        }
      );

      console.log("Response:", response.data);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);
      // localStorage.setItem("authToken", token);
      toast.success("Login successful");
      setIsAdminLoggedIn(true);

      if (response.data.role === "admin") {
        navigate("/admin"); // Navigates to an admin-specific route
      } else {
        navigate("/"); // Navigates to another route
      }
    } catch (error) {
      toast.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      setErrorMessage(
        "Login failed. Please check your credentials and try again."
      );
    }
  };

  return (
    <>
      <Navbar />
      <ToastContainer />
      <div
        className="h-screen bg-gray-900 flex justify-center overflow-hidden"
        // style={{
        //   backgroundImage: `url(${Loginbg})`,
        //   backgroundSize: "cover",
        //   backgroundPosition: "center",
        //   backgroundRepeat: "no-repeat",
        // }}
      >
        {/* Left Side (Illustration) */}
        <div className="hidden md:block md:w-[50%] bg-gradient-to-br from-gray-800 to-gray-900 text-white flex flex-col justify-center items-center">
          <img
            src={FourImage}
            alt="Theater Illustration"
            className="rounded-lg shadow-lg h-fit w-full"
          />
        </div>
        <div className="w-full md:w-[50%] flex items-center justify-center p-6 relative">
          <button
            onClick={() => navigate("/")} // Navigate to home page
            className="absolute top-20 right-4 text-gray-400 hover:text-gray-300 transition-colors"
            aria-label="Close"
          >
            <X size={24} />
          </button>

          <div className="max-w-md w-full">
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-2 mb-4">
                <img src={Logo} alt="Logo" className="h-10 shadow-lg" />
              </div>
              <h2 className="text-xl font-bold text-white mb-2">
                Hi, Welcome Back! 👋
              </h2>
              <p className="text-gray-400 text-sm">
                Please sign in to continue booking your favorite movies.
              </p>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 shadow-2xl">
              <form className="space-y-4" onSubmit={handleSubmit}>
                {errorMessage && (
                  <p className="text-red-500 text-sm">{errorMessage}</p>
                )}
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
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full bg-gray-700 text-white rounded-lg py-2.5 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                      placeholder="Enter your username"
                      aria-describedby="username-error"
                    />
                    <UserRound
                      className="absolute left-3 top-3 text-gray-400"
                      size={16}
                    />
                  </div>
                </div>

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
                      aria-describedby="password-error"
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

                <button
                  type="submit"
                  className="w-full bg-orange-500 text-white py-2.5 rounded-lg font-semibold hover:bg-amber-600 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  Login
                </button>

                <div className="grid grid-cols-2 gap-3 mt-4">
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-600 transition-colors text-sm"
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
                    className="flex items-center justify-center gap-2 bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-600 transition-colors text-sm"
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
              <p className="mt-6 text-center text-m font-medium text-gray-400">
                Don't have an account?{" "}
                <button
                  onClick={() => navigate("/Register")}
                  className="text-blue-500 hover:text-amber-400 text-m font-medium transition-colors"
                >
                  Sign up
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
