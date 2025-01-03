import {
  BarChart,
  Calendar,
  Film,
  LogOut,
  Settings,
  Users,
} from "lucide-react";
import React, { useState } from "react";
import Logo from "/images/logo2.png";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("Movies & Showtimes");

  const tabs = [
    { name: "Movies & Showtimes", icon: Film },
    { name: "Users", icon: Users },
    { name: "Screening Schedule", icon: Calendar },
    { name: "Analytics", icon: BarChart },
    { name: "Settings", icon: Settings },
  ];

  const handleSignOut = () => {
    console.log("Signing out...");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-blue-950 text-white p-4 fixed w-full z-10 rounded-lg">
        <div className="flex justify-between items-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <img src={Logo} alt="Logo" className=" h-10  shadow-lg" />
          </div>{" "}
          <button
            onClick={handleSignOut}
            className="flex items-center px-3 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </button>
        </div>
      </nav>

      <div className="flex pt-16 rounded-lg">
        {/* Sidebar */}
        <div className="w-64 bg-blue-950 text-white min-h-screen fixed ">
          <div className="space-y-2 p-4">
            {tabs.map((tab, index) => {
              const isActive = activeTab === tab.name;
              const Icon = tab.icon;

              return (
                <button
                  key={index}
                  className={`flex items-center px-4 py-3 w-full text-left rounded-lg transition ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-lg"
                      : "hover:bg-indigo-800 text-indigo-100"
                  }`}
                  onClick={() => setActiveTab(tab.name)}
                >
                  <Icon
                    className={`mr-3 h-5 w-5 transition-transform ${
                      isActive ? "text-white scale-110" : "text-indigo-300"
                    }`}
                  />
                  {tab.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 ml-64 p-6">
          {activeTab === "Movies & Showtimes" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-indigo-900">
                Current Movies
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

          {activeTab === "Customer Management" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-indigo-900">
                Customer Management
              </h2>
              <Table
                headers={["Customer", "Bookings", "Total Spent", "Last Visit"]}
                data={[
                  ["John Doe", "3 tickets", "$45", "Today"],
                  ["Jane Smith", "2 tickets", "$30", "Yesterday"],
                  ["Mike Johnson", "1 ticket", "$15", "2 days ago"],
                ]}
              />
            </div>
          )}

          {activeTab === "Screening Schedule" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-indigo-900">
                Today's Schedule
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ScheduleCard
                  time="10:00 AM"
                  movie="Inception"
                  hall="Hall A"
                  bookings="45/100"
                />
                <ScheduleCard
                  time="1:30 PM"
                  movie="The Dark Knight"
                  hall="Hall B"
                  bookings="82/100"
                />
                <ScheduleCard
                  time="4:00 PM"
                  movie="Inception"
                  hall="Hall A"
                  bookings="30/100"
                />
                <ScheduleCard
                  time="7:30 PM"
                  movie="The Dark Knight"
                  hall="Hall B"
                  bookings="95/100"
                />
              </div>
            </div>
          )}

          {activeTab === "Analytics" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-indigo-900">Analytics</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard title="Today's Revenue" value="$1,250" trend="+15%" />
                <StatCard title="Tickets Sold" value="85" trend="+8%" />
                <StatCard title="Average Occupancy" value="78%" trend="+12%" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const MovieCard = ({ title, status, screenings, occupancy }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-indigo-900">{title}</h3>
        <span
          className={`px-3 py-1 rounded-full text-sm ${
            status === "Now Showing"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {status}
        </span>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-gray-600">
          <span>Daily Screenings</span>
          <span className="font-medium">{screenings}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Average Occupancy</span>
          <span className="font-medium">{occupancy}</span>
        </div>
      </div>
    </div>
  );
};

const ScheduleCard = ({ time, movie, hall, bookings }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
      <div className="flex justify-between items-center mb-4">
        <span className="text-lg font-semibold text-indigo-900">{time}</span>
        <span className="text-sm text-gray-500">{hall}</span>
      </div>
      <h3 className="text-lg font-medium mb-3">{movie}</h3>
      <div className="flex justify-between items-center text-gray-600">
        <span>Bookings</span>
        <span className="font-medium">{bookings}</span>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, trend }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-gray-600 mb-2">{title}</h3>
      <div className="flex items-end justify-between">
        <span className="text-2xl font-bold text-indigo-900">{value}</span>
        <span className="text-green-500 text-sm">{trend}</span>
      </div>
    </div>
  );
};

const Table = ({ headers, data }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="bg-indigo-900 text-white">
            {headers.map((header, index) => (
              <th key={index} className="px-6 py-3 text-left">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`hover:bg-indigo-50 transition ${
                rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"
              }`}
            >
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="px-6 py-4 border-t border-gray-200"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
