import { useEffect, useState } from "react";
import API from "../../services/api";

function OwnerCars() {

  const [cars, setCars] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    model: "",
    year: "",
    pricePerHour: "",
    pricePerDay: "",
    pricePerWeek: "",
    fuelType: "",
    transmission: "",
    seats: "",
    location: "",
  });

  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await API.get("/cars/owner", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCars(res.data);

    } catch (error) {

      console.log("Fetch owner cars error:", error);

    }

  };

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleAddCar = async (e) => {

    e.preventDefault();

    try {

      const token = localStorage.getItem("token");

      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      if (image) data.append("image", image);

      await API.post("/cars/add", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Car added successfully");

      setFormData({
        name: "",
        brand: "",
        model: "",
        year: "",
        pricePerHour: "",
        pricePerDay: "",
        pricePerWeek: "",
        fuelType: "",
        transmission: "",
        seats: "",
        location: "",
      });

      setImage(null);

      fetchCars();

    } catch (error) {

      console.log("Add car error:", error);
      alert("Failed to add car");

    }

  };

  return (

    <div className="bg-black text-white min-h-screen p-8">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex justify-between items-center mb-8">

          <h1 className="text-3xl font-bold text-green-400">
            My Cars
          </h1>

        </div>


        {/* Add Car Form */}

        <form
          onSubmit={handleAddCar}
          className="bg-gray-900 p-6 rounded-xl mb-10 grid md:grid-cols-3 gap-4"
        >

          <input name="name" value={formData.name} onChange={handleChange} placeholder="Car Name"
            className="p-3 rounded bg-black border border-gray-700"/>

          <input name="brand" value={formData.brand} onChange={handleChange} placeholder="Brand"
            className="p-3 rounded bg-black border border-gray-700"/>

          <input name="model" value={formData.model} onChange={handleChange} placeholder="Model"
            className="p-3 rounded bg-black border border-gray-700"/>

          <input name="year" value={formData.year} onChange={handleChange} placeholder="Year"
            className="p-3 rounded bg-black border border-gray-700"/>

          <input name="pricePerHour" value={formData.pricePerHour} onChange={handleChange} placeholder="Price Per Hour"
            className="p-3 rounded bg-black border border-gray-700"/>

          <input name="pricePerDay" value={formData.pricePerDay} onChange={handleChange} placeholder="Price Per Day"
            className="p-3 rounded bg-black border border-gray-700"/>

          <input name="pricePerWeek" value={formData.pricePerWeek} onChange={handleChange} placeholder="Price Per Week"
            className="p-3 rounded bg-black border border-gray-700"/>

          <input name="fuelType" value={formData.fuelType} onChange={handleChange} placeholder="Fuel Type"
            className="p-3 rounded bg-black border border-gray-700"/>

          <input name="transmission" value={formData.transmission} onChange={handleChange} placeholder="Transmission"
            className="p-3 rounded bg-black border border-gray-700"/>

          <input name="seats" value={formData.seats} onChange={handleChange} placeholder="Seats"
            className="p-3 rounded bg-black border border-gray-700"/>

          <input name="location" value={formData.location} onChange={handleChange} placeholder="Location"
            className="p-3 rounded bg-black border border-gray-700"/>

          <input type="file" accept="image/*" onChange={handleImageChange}
            className="p-3 rounded bg-black border border-gray-700"/>

          <button
            type="submit"
            className="md:col-span-3 bg-green-400 text-black py-3 rounded-lg font-bold hover:bg-green-300"
          >
            Add Car
          </button>

        </form>


        {/* Cars List */}

        {cars.length === 0 ? (

          <p className="text-gray-400">
            No cars added yet.
          </p>

        ) : (

          <div className="grid md:grid-cols-3 gap-6">

            {cars.map((car) => (

              <div
                key={car._id}
                className="bg-gray-900 rounded-xl shadow-lg overflow-hidden hover:scale-105 transition"
              >

                <img
                  src={car.image || "https://via.placeholder.com/600x300"}
                  alt={car.name}
                  className="w-full h-52 object-cover"
                />

                <div className="p-4">

                  <h2 className="text-xl font-bold text-green-400">
                    {car.name}
                  </h2>

                  <p className="text-gray-400">
                    {car.brand} • {car.model}
                  </p>

                  <p className="text-gray-400">
                    📍 {car.location}
                  </p>

                  <div className="mt-2 text-green-400 font-semibold">

                    ₹{car.pricePerHour}/hr  
                    <br/>

                    ₹{car.pricePerDay}/day  
                    <br/>

                    ₹{car.pricePerWeek}/week

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>

  );

}

export default OwnerCars;