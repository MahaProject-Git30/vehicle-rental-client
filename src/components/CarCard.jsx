import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import API from "../services/api";

function CarCard({ car }) {
  const [wishlisted, setWishlisted] = useState(false);
  const navigate = useNavigate();

  const handleWishlist = async (e) => {
    e.preventDefault(); // prevent card click

    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    try {
      await API.post("/wishlist/toggle", {
        carId: car._id,
      });

      setWishlisted(!wishlisted);
    } catch (error) {
      console.log("Wishlist error:", error);
    }
  };

  return (
    <Link to={`/car/${car._id}`}>
      <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition text-white cursor-pointer">
        <div className="relative">
          <img
            src={
              car.image || "https://via.placeholder.com/400x250?text=No+Image"
            }
            alt={car.name}
            className="w-full h-48 object-cover"
          />

          {/* Wishlist Button */}
          <div
            onClick={handleWishlist}
            className="absolute top-2 right-2 bg-black p-2 rounded-full cursor-pointer"
          >
            <FaHeart
              className={`text-xl ${
                wishlisted ? "text-red-500" : "text-white"
              }`}
            />
          </div>
        </div>

        <div className="p-4">
          <h2 className="text-lg font-bold text-green-400">{car.name}</h2>

          <p className="text-sm text-gray-300 mt-1">
            {car.transmission} • {car.fuelType} • {car.seats} Seater
          </p>

          <p className="text-sm text-gray-400 mt-1">📍 {car.location}</p>

          <div className="flex justify-between items-center mt-3">
            <p className="text-green-400 font-bold">₹{car.pricePerHour} / hr</p>

            <button className="bg-green-400 text-black px-3 py-1 rounded">
              View
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default CarCard;
