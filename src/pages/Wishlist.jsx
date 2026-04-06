import { useEffect, useState } from "react";
import API from "../services/api";
import CarCard from "../components/CarCard";

function Wishlist() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    const token = localStorage.getItem("token");

    const res = await API.get("/wishlist", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setCars(res.data);
  };

  return (
    <div className="bg-black text-white min-h-screen p-6">
      <h1 className="text-3xl text-green-400 mb-6">My Wishlist</h1>

      <div className="grid grid-cols-3 gap-6">
        {cars.map((car) => (
          <CarCard key={car._id} car={car} />
        ))}
      </div>
    </div>
  );
}

export default Wishlist;
