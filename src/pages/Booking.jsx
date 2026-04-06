import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [car, setCar] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [durationType, setDurationType] = useState("hour");
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [bookedDates, setBookedDates] = useState([]);

  useEffect(() => {
    fetchCar();
    fetchBookedDates();
  }, [id]);

  useEffect(() => {
    if (!car || !startDate || !endDate) return;

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (end <= start) {
      setTotalPrice(0);
      return;
    }

    const diffTime = end - start;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    let price = 0;

    const pricePerHour = Number(car.pricePerHour || 0);
    const pricePerDay = Number(car.pricePerDay || 0);
    const pricePerWeek = Number(car.pricePerWeek || 0);

    if (durationType === "hour") {
      price = diffDays * 24 * pricePerHour;
    }

    if (durationType === "day") {
      price = diffDays * pricePerDay;
    }

    if (durationType === "week") {
      const weeks = Math.ceil(diffDays / 7);
      price = weeks * pricePerWeek;
    }

    setTotalPrice(price);
  }, [startDate, endDate, car, durationType]);

  const fetchCar = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/cars/${id}`);
      setCar(res.data);
    } catch (error) {
      console.log("Car fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBookedDates = async () => {
    try {
      const res = await API.get(`/bookings/car/${id}`);
      setBookedDates(res.data);
    } catch (error) {
      console.log("Booked dates error:", error);
    }
  };

  const isDateBooked = (date) => {
    const selected = new Date(date);

    return bookedDates.some((booking) => {
      const start = new Date(booking.startDate);
      const end = new Date(booking.endDate);

      return selected >= start && selected <= end;
    });
  };

  const handleStartDateChange = (date) => {
    if (isDateBooked(date)) {
      alert("This date is already booked");
      return;
    }
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    if (isDateBooked(date)) {
      alert("This date is already booked");
      return;
    }
    setEndDate(date);
  };

  // 🔥 FINAL PAYMENT FUNCTION
  const handleProceedPayment = async () => {
    if (!startDate || !endDate) {
      alert("Select dates");
      return;
    }

    if (new Date(endDate) <= new Date(startDate)) {
      alert("End date must be after start date");
      return;
    }

    // ✅ NEW FIX
    if (totalPrice <= 0) {
      alert("Invalid price");
      return;
    }

    // ✅ Razorpay check
    if (!window.Razorpay) {
      alert("Razorpay not loaded. Refresh page.");
      return;
    }

    try {
      // STEP 1
      const { data } = await API.post("/payment/create-order", {
        amount: totalPrice,
        carId: id,
      });

      // STEP 2
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: data.amount,
        currency: "INR",
        order_id: data.orderId,

        handler: async function (response) {
          try {
            await API.post("/payment/verify", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              carId: id,
              startDate,
              endDate,
              totalPrice,
            });

            alert("Booking confirmed ✅");
            navigate("/my-bookings");
          } catch (err) {
            console.log(err);
            alert("Payment verification failed");
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.log(error);
      alert("Payment failed");
    }
  };

  if (loading) {
    return (
      <div className="bg-black text-green-400 min-h-screen flex items-center justify-center">
        Loading booking page...
      </div>
    );
  }

  if (!car) {
    return (
      <div className="bg-black text-red-400 min-h-screen flex items-center justify-center">
        Car not found
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen p-6">
      <div className="max-w-4xl mx-auto bg-gray-900 rounded-xl p-6 shadow-lg">
        <h1 className="text-3xl font-bold text-green-400 mb-6">
          Book {car.name}
        </h1>

        <img
          src={car.image || "https://dummyimage.com/600x400/000/fff"}
          alt={car.name}
          className="w-full h-72 object-cover rounded-lg mb-6"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p>
              <b>Brand:</b> {car.brand}
            </p>
            <p>
              <b>Model:</b> {car.model}
            </p>
            <p>
              <b>Fuel:</b> {car.fuelType}
            </p>
            <p>
              <b>Transmission:</b> {car.transmission}
            </p>
            <p>
              <b>Seats:</b> {car.seats}
            </p>
            <p>
              <b>Location:</b> {car.location}
            </p>

            <label className="block mt-4 font-bold">Booking Type</label>

            <select
              value={durationType}
              onChange={(e) => setDurationType(e.target.value)}
              className="w-full p-3 mt-2 bg-black border border-green-400"
            >
              <option value="hour">Hourly</option>
              <option value="day">Daily</option>
              <option value="week">Weekly</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-bold">Start Date</label>

            <DatePicker
              selected={startDate}
              onChange={(date) => handleStartDateChange(date)}
              minDate={new Date()}
              dateFormat="yyyy-MM-dd"
              className="w-full p-3 mb-4 bg-black border border-green-400 text-white"
              placeholderText="YYYY-MM-DD"
            />

            <label className="block mb-2 font-bold">End Date</label>


            <DatePicker
              selected={endDate}
              onChange={(date) => handleEndDateChange(date)}
              minDate={startDate || new Date()}
              dateFormat="yyyy-MM-dd"
              className="w-full p-3 mb-4 bg-black border border-green-400 text-white"
              placeholderText="YYYY-MM-DD"
            />

            <div className="bg-black p-4 border border-green-400 rounded mb-4">
              <p className="text-lg font-bold">Total Price</p>
              <p className="text-2xl text-green-400 font-bold">₹{totalPrice}</p>
            </div>

            <button
              onClick={handleProceedPayment}
              className="w-full bg-green-400 text-black py-3 rounded font-bold"
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Booking;
