import {
  ArrowDown,
  ArrowUp,
  DollarSign,
  Film,
  TrendingUp,
  Users,
} from "lucide-react";
import React from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const AnalyticsDashboard = () => {
  const revenueData = [
    { name: "Jan", revenue: 12000 },
    { name: "Feb", revenue: 15000 },
    { name: "Mar", revenue: 18000 },
    { name: "Apr", revenue: 16000 },
    { name: "May", revenue: 21000 },
    { name: "Jun", revenue: 24000 },
    { name: "Jul", revenue: 28000 },
  ];

  const attendanceData = [
    { name: "Mon", attendance: 345 },
    { name: "Tue", attendance: 290 },
    { name: "Wed", attendance: 438 },
    { name: "Thu", attendance: 520 },
    { name: "Fri", attendance: 650 },
    { name: "Sat", attendance: 780 },
    { name: "Sun", attendance: 710 },
  ];

  const genreData = [
    { name: "Action", value: 35 },
    { name: "Drama", value: 20 },
    { name: "Comedy", value: 25 },
    { name: "Sci-Fi", value: 15 },
    { name: "Horror", value: 5 },
  ];

  const showtimeData = [
    { time: "10 AM", bookings: 45 },
    { time: "1 PM", bookings: 75 },
    { time: "4 PM", bookings: 120 },
    { time: "7 PM", bookings: 180 },
    { time: "10 PM", bookings: 85 },
  ];

  const topMovies = [
    { title: "Inception", revenue: 42500, tickets: 2125, occupancy: "92%" },
    {
      title: "The Dark Knight",
      revenue: 38600,
      tickets: 1930,
      occupancy: "88%",
    },
    { title: "Interstellar", revenue: 31200, tickets: 1560, occupancy: "84%" },
    { title: "Tenet", revenue: 28400, tickets: 1420, occupancy: "78%" },
    { title: "Dune", revenue: 25800, tickets: 1290, occupancy: "75%" },
  ];

  const MetricCard = ({ icon, title, value, change, isPositive }) => (
    <div className="bg-neutral-800 rounded-xl p-6 hover:bg-neutral-750 transition-all">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 rounded-lg bg-neutral-700">{icon}</div>
        <div
          className={`flex items-center ${
            isPositive ? "text-green-400" : "text-red-400"
          }`}
        >
          {isPositive ? (
            <ArrowUp className="w-4 h-4 mr-1" />
          ) : (
            <ArrowDown className="w-4 h-4 mr-1" />
          )}
          <span className="text-sm">{change}</span>
        </div>
      </div>
      <h3 className="text-neutral-400 text-sm mb-1">{title}</h3>
      <p className="text-white text-2xl font-bold">{value}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-neutral-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-8">Analytics Dashboard</h1>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          icon={<DollarSign className="w-6 h-6 text-green-400" />}
          title="Total Revenue"
          value="$134,520"
          change="15.3%"
          isPositive={true}
        />
        <MetricCard
          icon={<Users className="w-6 h-6 text-blue-400" />}
          title="Tickets Sold"
          value="6,720"
          change="8.2%"
          isPositive={true}
        />
        <MetricCard
          icon={<Film className="w-6 h-6 text-purple-400" />}
          title="Screenings"
          value="245"
          change="12.5%"
          isPositive={true}
        />
        <MetricCard
          icon={<TrendingUp className="w-6 h-6 text-yellow-400" />}
          title="Avg. Occupancy"
          value="78.5%"
          change="3.2%"
          isPositive={false}
        />
      </div>

      {/* Revenue and Attendance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-neutral-800 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-6">Monthly Revenue</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient
                  id="revenueGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{ backgroundColor: "#1f2937", border: "none" }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#4f46e5"
                fillOpacity={1}
                fill="url(#revenueGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-neutral-800 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-6">Weekly Attendance</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{ backgroundColor: "#1f2937", border: "none" }}
              />
              <Bar dataKey="attendance" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Genre and Showtime Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-neutral-800 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-6">Ticket Sales by Genre</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={genreData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {genreData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      ["#4f46e5", "#06b6d4", "#8b5cf6", "#ec4899", "#f97316"][
                        index % 5
                      ]
                    }
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: "#1f2937", border: "none" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-neutral-800 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-6">Bookings by Showtime</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={showtimeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="time" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{ backgroundColor: "#1f2937", border: "none" }}
              />
              <Line
                type="monotone"
                dataKey="bookings"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Performing Movies */}
      <div className="bg-neutral-800 rounded-xl p-6 mb-8">
        <h2 className="text-xl font-bold mb-6">Top Performing Movies</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-neutral-700">
                <th className="pb-3 text-neutral-400">Movie Title</th>
                <th className="pb-3 text-neutral-400">Revenue</th>
                <th className="pb-3 text-neutral-400">Tickets Sold</th>
                <th className="pb-3 text-neutral-400">Occupancy Rate</th>
              </tr>
            </thead>
            <tbody>
              {topMovies.map((movie, index) => (
                <tr
                  key={index}
                  className="border-b border-neutral-700 hover:bg-neutral-750 transition-colors"
                >
                  <td className="py-4 pr-4">{movie.title}</td>
                  <td className="py-4 pr-4">
                    ${movie.revenue.toLocaleString()}
                  </td>
                  <td className="py-4 pr-4">
                    {movie.tickets.toLocaleString()}
                  </td>
                  <td className="py-4 pr-4">{movie.occupancy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
