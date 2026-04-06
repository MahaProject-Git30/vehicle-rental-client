import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../services/api";
import { FaUsers, FaCar, FaClipboardList, FaRupeeSign } from "react-icons/fa";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCars: 0,
    totalBookings: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/admin/stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStats(res.data);
    } catch (error) {
      console.log("Stats fetch error:", error);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen p-8">
      {/* Page Title */}

      <div className="mb-10">
        <h1 className="text-4xl font-bold text-green-400">Admin Dashboard</h1>

        <p className="text-gray-400 mt-2">
          Monitor your platform performance and manage cars & bookings.
        </p>
      </div>

      {/* Stats Cards */}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <Link to="/admin/users">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl shadow-lg hover:scale-105 transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400">Total Users</p>
                <h2 className="text-3xl font-bold text-green-400 mt-1">
                  {stats.totalUsers}
                </h2>
              </div>
              <FaUsers className="text-3xl text-green-400" />
            </div>
          </div>
        </Link>

        <Link to="/admin/cars">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl shadow-lg hover:scale-105 transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400">Total Cars</p>
                <h2 className="text-3xl font-bold text-green-400 mt-1">
                  {stats.totalCars}
                </h2>
              </div>
              <FaCar className="text-3xl text-green-400" />
            </div>
          </div>
        </Link>

        <Link to="/admin/bookings">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl shadow-lg hover:scale-105 transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400">Total Bookings</p>
                <h2 className="text-3xl font-bold text-green-400 mt-1">
                  {stats.totalBookings}
                </h2>
              </div>
              <FaClipboardList className="text-3xl text-green-400" />
            </div>
          </div>
        </Link>

        <Link to="/admin/revenue">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl shadow-lg hover:scale-105 transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400">Total Revenue</p>
                <h2 className="text-3xl font-bold text-green-400 mt-1">
                  ₹{stats.totalRevenue}
                </h2>
              </div>
              <FaRupeeSign className="text-3xl text-green-400" />
            </div>
          </div>
        </Link>
      </div>

      {/* Quick Actions */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* View Bookings */}

        <Link
          to="/admin/bookings"
          className="bg-gray-900 p-6 rounded-xl hover:bg-gray-800 hover:scale-105 transition shadow-lg border border-gray-800"
        >
          <h2 className="text-lg font-semibold text-green-400">
            View Bookings
          </h2>

          <p className="text-gray-400 mt-2">
            See all user bookings and payment details.
          </p>
        </Link>

        {/* Manage Cars */}

        <Link
          to="/admin/cars"
          className="bg-gray-900 p-6 rounded-xl hover:bg-gray-800 hover:scale-105 transition shadow-lg border border-gray-800"
        >
          <h2 className="text-lg font-semibold text-green-400">Manage Cars</h2>

          <p className="text-gray-400 mt-2">
            Add, edit, and manage available cars.
          </p>
        </Link>
      </div>
    </div>
  );
}

export default AdminDashboard;
