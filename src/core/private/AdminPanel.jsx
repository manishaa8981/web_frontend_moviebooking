import {
  Armchair,
  BarChart3,
  CalendarDays,
  ChevronLeft,
  Film,
  LayoutDashboard,
  LogOut,
  Menu,
  Rows,
  Users,
} from "lucide-react";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminLoginContext } from "../../context/AdminLoginContext";
import AdminBookings from "./AdminBooking";
import AnalyticsDashboard from "./Analytics";
import AdminHallPanel from "./Hall";
import MovieAdminPanel from "./Movie";
import SeatPanel from "./SeatPanel";
import ShowTime from "./ShowTime";
import Logo from "/images/logo2.png";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { setIsAdminLoggedIn } = useContext(AdminLoginContext);
  const navigate = useNavigate();

  const tabs = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "Analytics", icon: BarChart3 },
    { name: "Users", icon: Users },
    { name: "Movies", icon: Film },
    { name: "Halls", icon: Rows },
    { name: "Shows", icon: CalendarDays },
    { name: "Seats", icon: Armchair },
  ];

  const handleSignOut = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-[#121212]">
      {/* Navbar */}
      <nav className="bg-black/95 text-white p-4 fixed w-full z-10 border-b border-neutral-800">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={toggleSidebar}
              className="p-2 hover:bg-neutral-800 rounded-lg transition-colors"
            >
              {isSidebarOpen ? (
                <ChevronLeft className="h-6 w-6 text-neutral-400" /> // Updated icon
              ) : (
                <Menu className="h-6 w-6 text-neutral-400" />
              )}
            </button>
            <div className="flex items-center gap-2">
              <img src={Logo} alt="Logo" className="h-8" />
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center px-3 py-2 text-sm bg-neutral-800 hover:bg-neutral-700 rounded-full transition-colors gap-2"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </nav>

      <div className="flex pt-16">
        {/* Sidebar */}
        <div
          className={`fixed h-full bg-black/95 border-r border-neutral-800 transition-all duration-300 ease-in-out ${
            isSidebarOpen ? "w-64" : "w-20"
          }`}
        >
          <div className="space-y-1 p-2">
            {tabs.map((tab, index) => {
              const isActive = activeTab === tab.name;
              const Icon = tab.icon;

              return (
                <button
                  key={index}
                  className={`flex items-center px-3 py-3 w-full rounded-lg transition-all duration-200 group ${
                    isActive
                      ? "bg-neutral-800 text-white"
                      : "text-neutral-400 hover:text-white hover:bg-neutral-800/50"
                  }`}
                  onClick={() => setActiveTab(tab.name)}
                >
                  <Icon
                    className={`${
                      isSidebarOpen ? "h-5 w-5" : "h-7 w-7"
                    } transition-all duration-200`}
                  />
                  <span
                    className={`ml-3 transition-opacity duration-200 ${
                      isSidebarOpen ? "opacity-100" : "opacity-0 w-0"
                    }`}
                  >
                    {tab.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <div
          className={`transition-all duration-300 ease-in-out ${
            isSidebarOpen ? "ml-64" : "ml-20"
          } flex-1 p-6 text-white overflow-y-auto h-[calc(100vh-64px)]`}
        >
          {activeTab === "Dashboard" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Dashboard Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard title="Today's Revenue" value="$1,250" trend="+15%" />
                <StatCard title="Tickets Sold" value="85" trend="+8%" />
                <StatCard title="Average Occupancy" value="78%" trend="+12%" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <MovieCard
                  title="Inception"
                  status="Now Showing"
                  screenings={8}
                  occupancy="85%"
                />
                <MovieCard
                  title="The Dark Knight"
                  status="Now Showing"
                  screenings={6}
                  occupancy="92%"
                />
                <MovieCard
                  title="Interstellar"
                  status="Coming Soon"
                  screenings={4}
                  occupancy="60%"
                />
              </div>
            </div>
          )}
          {activeTab === "Analytics" && <AnalyticsDashboard />}
          {activeTab === "Users" && <AdminBookings />}
          {activeTab === "Movies" && <MovieAdminPanel />}
          {activeTab === "Halls" && <AdminHallPanel />}
          {activeTab === "Shows" && <ShowTime />}
          {activeTab === "Seats" && <SeatPanel />}
        </div>
      </div>
    </div>
  );
};

const MovieCard = ({ title, status, screenings, occupancy }) => {
  return (
    <div className="bg-neutral-800/50 rounded-xl p-6 hover:bg-neutral-800 transition-colors border border-neutral-700">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <span
          className={`px-3 py-1 rounded-full text-sm ${
            status === "Now Showing"
              ? "bg-green-500/10 text-green-500"
              : "bg-yellow-500/10 text-yellow-500"
          }`}
        >
          {status}
        </span>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-neutral-400">
          <span>Daily Screenings</span>
          <span className="font-medium text-white">{screenings}</span>
        </div>
        <div className="flex justify-between text-neutral-400">
          <span>Average Occupancy</span>
          <span className="font-medium text-white">{occupancy}</span>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, trend }) => {
  return (
    <div className="bg-neutral-800/50 rounded-xl p-6 border border-neutral-700 hover:bg-neutral-800 transition-colors">
      <h3 className="text-neutral-400 mb-2">{title}</h3>
      <div className="flex items-end justify-between">
        <span className="text-2xl font-bold text-white">{value}</span>
        <span className="text-green-500 text-sm">{trend}</span>
      </div>
    </div>
  );
};

export default AdminPanel;
