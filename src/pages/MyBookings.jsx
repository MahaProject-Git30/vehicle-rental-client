import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/bookings/my-bookings", {
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

  const handleCancelBooking = async (bookingId) => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.put(
        `/bookings/cancel/${bookingId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert(res.data.message);

      fetchBookings();
    } catch (error) {
      console.log("Cancel booking error:", error);
      alert("Failed to cancel booking");
    }
  };

  const handleDownloadInvoice = async (bookingId) => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get(`/bookings/invoice/${bookingId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));

      const link = document.createElement("a");
      link.href = url;
      link.download = "invoice.pdf";
      link.click();
    } catch (error) {
      console.log("Invoice download error:", error);
    }
  };

  if (loading) {
    return (
      <div className="bg-black text-green-400 min-h-screen flex items-center justify-center text-lg font-semibold">
        Loading bookings...
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-green-400 mb-6">My Bookings</h1>

        {bookings.length === 0 ? (
          <p className="text-gray-300">No bookings found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-gray-900 rounded-xl shadow-lg overflow-hidden"
              >
                <img
                  src={
                    booking.car?.image ||
                    "https://via.placeholder.com/600x300?text=No+Image"
                  }
                  alt={booking.car?.name}
                  className="w-full h-52 object-cover"
                />

                <div className="p-4">
                  <h2 className="text-xl font-bold text-green-400">
                    {booking.car?.name}
                  </h2>

                  <p className="text-gray-300 mt-2">
                    Brand: {booking.car?.brand}
                  </p>

                  <p className="text-gray-300">Model: {booking.car?.model}</p>

                  <p className="text-gray-300">
                    Location: {booking.car?.location}
                  </p>

                  <p className="text-gray-300 mt-3">
                    Start Date:{" "}
                    {new Date(booking.startDate).toLocaleDateString()}
                  </p>

                  <p className="text-gray-300">
                    End Date: {new Date(booking.endDate).toLocaleDateString()}
                  </p>

                  <p className="text-green-400 font-bold mt-3">
                    Total Price: ₹{booking.totalPrice}
                  </p>

                  <p
                    className={`mt-2 font-semibold ${
                      booking.status === "Cancelled"
                        ? "text-red-400"
                        : "text-green-400"
                    }`}
                  >
                    Status: {booking.status}
                  </p>

                  {booking.status === "Booked" && (
                    <button
                      onClick={() => handleCancelBooking(booking._id)}
                      className="mt-4 w-full bg-red-500 text-white py-2 rounded font-bold hover:bg-red-600"
                    >
                      Cancel Booking
                    </button>
                  )}
                  <button
                    onClick={() => handleDownloadInvoice(booking._id)}
                    className="mt-2 w-full bg-blue-500 text-white py-2 rounded font-bold"
                  >
                    Download Invoice
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

export default MyBookings;
