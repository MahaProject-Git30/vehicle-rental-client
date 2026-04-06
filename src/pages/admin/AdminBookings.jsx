import { useEffect, useState } from "react";
import API from "../../services/api";

function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/bookings/admin", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBookings(res.data);
    } catch (error) {
      console.log("Fetch bookings error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBooking = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await API.delete(`/bookings/admin/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Booking deleted successfully");

      fetchBookings();
    } catch (error) {
      console.log("Delete booking error:", error);
      alert("Failed to delete booking");
    }
  };

  return (
    <div className="bg-black text-white min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-green-400 mb-6">All Bookings</h1>

        {loading ? (
          <p>Loading bookings...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-gray-900 rounded-xl overflow-hidden shadow-lg"
              >
                <img
                  src={
                    booking.car?.image ||
                    "https://dummyimage.com/600x400/000/fff&text=No+Image"
                  }
                  alt={booking.car?.name}
                  className="w-full h-48 object-cover"
                />

                <div className="p-4">
                  <h2 className="text-xl text-green-400 font-bold">
                    {booking.car?.name}
                  </h2>

                  <p>User: {booking.user?.name}</p>

                  <p>Email: {booking.user?.email}</p>

                  <p>
                    Booking Dates:
                    {new Date(booking.startDate).toLocaleDateString()} to{" "}
                    {new Date(booking.endDate).toLocaleDateString()}
                  </p>

                  <p className="text-green-400 font-bold mt-2">
                    ₹{booking.totalPrice}
                  </p>

                  <button
                    onClick={() => handleDeleteBooking(booking._id)}
                    className="mt-3 w-full bg-red-500 text-white py-2 rounded font-bold hover:bg-red-600"
                  >
                    Delete Booking
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminBookings;
