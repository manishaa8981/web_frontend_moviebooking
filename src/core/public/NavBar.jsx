import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // Adjust the scroll threshold as needed
    };
  });
  const navigate = useNavigate();
  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-colors duration-300 ${
          isScrolled
            ? "bg-white text-black shadow-md"
            : "bg-blue-950 text-white"
        }`}
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center justify-center gap-2 mb-4">
                <img src={Logo} alt="Logo" className=" h-10 " />
              </div>
              <nav className="hidden md:flex space-x-4">
                <button className="btn btn-ghost">Home</button>
                <button className="btn btn-ghost">Showtimings</button>
                <button className="btn btn-ghost">Cinemas</button>
                <button className="btn btn-ghost">Offers</button>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className={`input input-bordered w-64 ${
                    isScrolled ? "bg-gray-200" : "bg-gray-400 text-white"
                  }`}
                />
                <Search
                  className={`absolute right-3 top-3 h-4 w-10 ${
                    isScrolled ? "text-gray-300" : "text-gray-100"
                  }`}
                />
              </div>
              <button
                className="btn  bg-orange-400  border-none"
                onClick={() => navigate("/Login")} // Navigate to Login Page
                // className={`btn  w-25
                //   ${
                //   isScrolled ? "btn" : "bg-orange-400 text-white border-none"
                // }`
                // }
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default NavBar;
