import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import { FaStar } from "react-icons/fa";

function CarDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  useEffect(() => {
    fetchSingleCar();
    fetchReviews();
  }, [id]);

  const fetchSingleCar = async () => {
    try {
      setLoading(true);

      const res = await API.get(`/cars/${id}`);

      setCar(res.data);
    } catch (error) {
      console.log("Single car fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await API.get(`/reviews/${id}`);
      setReviews(res.data);
    } catch (error) {
      console.log("Fetch reviews error:", error);
    }
  };

  const handleAddReview = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    if (!comment) {
      alert("Please write a review");
      return;
    }

    try {
      await API.post(
        "/reviews/add",
        {
          carId: id,
          rating,
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setComment("");
      setRating(5);

      fetchReviews();
    } catch (error) {
      console.log("Add review error:", error);
    }
  };

  const handleBookNow = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    navigate(`/booking/${car._id}`);
  };

  if (loading) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        Loading car details...
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
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Car Image */}
        <div>
          <img
            src={car.image || "https://via.placeholder.com/700x400"}
            alt={car.name}
            className="w-full rounded-xl h-[400px] object-cover"
          />
        </div>

        {/* Car Details */}
        <div>
          <h1 className="text-3xl font-bold text-green-400">{car.name}</h1>

          <p className="text-gray-300 mt-2 text-lg">
            {car.brand} • {car.model}
          </p>

          <p className="text-gray-300 mt-2">
            {car.transmission} • {car.fuelType} • {car.seats} Seater
          </p>

          <p className="text-gray-400 mt-2">📍 {car.location}</p>

          <p className="text-gray-400 mt-2">Year: {car.year}</p>

          <p className="text-yellow-400 mt-2">⭐ {car.rating || 0} Rating</p>

          {/* Description */}
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-2">Description</h2>

            <p className="text-gray-300">
              This {car.brand} {car.name} is a comfortable and reliable rental
              car. Perfect for city rides, family trips, and long drives.
            </p>
          </div>

          {/* Features */}
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-2">Features</h2>

            <ul className="list-disc ml-5 text-gray-300 space-y-1">
              <li>Air Conditioning</li>
              <li>Comfortable Seating</li>
              <li>Well Maintained Vehicle</li>
              <li>Suitable for Long Drive</li>
            </ul>
          </div>

          {/* Price */}
          <div className="mt-6">
            <p className="text-2xl font-bold text-green-400">
              ₹{car.pricePerHour} / hr
            </p>
          </div>

          {/* Book Button */}
          <button
            onClick={handleBookNow}
            className="mt-6 bg-green-400 text-black px-6 py-3 rounded font-bold hover:bg-green-300"
          >
            Book Now
          </button>

          {/* Review Form */}
          <div className="mt-10">
            <h2 className="text-xl font-bold mb-4">Reviews</h2>

            <div className="flex gap-2 mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  size={24}
                  className={`cursor-pointer ${
                    star <= rating ? "text-yellow-400" : "text-gray-500"
                  }`}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>

            <textarea
              placeholder="Write review"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="block w-full mt-2 p-2 bg-black border border-green-400 rounded"
            />

            <button
              onClick={handleAddReview}
              className="mt-2 bg-green-400 text-black px-4 py-2 rounded"
            >
              Submit Review
            </button>
          </div>

          {/* Review List */}
          <div className="mt-6">
            {reviews.length === 0 ? (
              <p className="text-gray-400">No reviews yet.</p>
            ) : (
              reviews.map((r) => (
                <div key={r._id} className="bg-gray-900 p-3 rounded mb-2">
                  <p className="text-green-400">⭐ {r.rating}/5</p>

                  <p>{r.comment}</p>

                  <p className="text-sm text-gray-400">By {r.user.name}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarDetails;
