import { useEffect, useState, useRef } from "react";
import API from "../../services/api";

function AdminCars() {

  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState(null);
  const [editingCarId, setEditingCarId] = useState(null);
  const formRef = useRef(null);

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

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const res = await API.get("/cars");
      setCars(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
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

  const handleEditCar = (car) => {

    setFormData({
      name: car.name || "",
      brand: car.brand || "",
      model: car.model || "",
      year: car.year || "",
      pricePerHour: car.pricePerHour || "",
      pricePerDay: car.pricePerDay || "",
      pricePerWeek: car.pricePerWeek || "",
      fuelType: car.fuelType || "",
      transmission: car.transmission || "",
      seats: car.seats || "",
      location: car.location || "",
    });

    setEditingCarId(car._id);

    formRef.current.scrollIntoView({
      behavior: "smooth",
    });

  };

  const handleCancelEdit = () => {

    setEditingCarId(null);

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

      if (editingCarId) {

        await API.put(`/cars/update/${editingCarId}`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        alert("Car updated successfully");

      } else {

        await API.post("/cars/add", data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        alert("Car added successfully");

      }

      handleCancelEdit();
      fetchCars();

    } catch (error) {

      console.log(error);
      alert("Operation failed");

    }

  };

  const handleDeleteCar = async (carId) => {

    try {

      const token = localStorage.getItem("token");

      await API.delete(`/cars/${carId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Car deleted successfully");

      fetchCars();

    } catch (error) {

      console.log(error);
      alert("Delete failed");

    }

  };

  return (

    <div className="bg-black min-h-screen text-white p-8">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex justify-between items-center mb-8">

          <h1 className="text-3xl font-bold text-green-400">
            Manage Cars
          </h1>

          <button
            onClick={() =>
              formRef.current.scrollIntoView({ behavior: "smooth" })
            }
            className="bg-green-400 text-black px-5 py-2 rounded-lg font-semibold hover:bg-green-300"
          >
            Add New Car
          </button>

        </div>


        {/* Car Form */}

        <form
          ref={formRef}
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
            {editingCarId ? "Update Car" : "Add Car"}
          </button>

          {editingCarId && (

            <button
              type="button"
              onClick={handleCancelEdit}
              className="md:col-span-3 bg-gray-700 py-3 rounded-lg hover:bg-gray-600"
            >
              Cancel Edit
            </button>

          )}

        </form>


        {/* Cars Grid */}

        {loading ? (

          <p className="text-gray-400 text-center">
            Loading cars...
          </p>

        ) : (

          <div className="grid md:grid-cols-3 gap-6">

            {cars.map((car) => (

              <div
                key={car._id}
                className="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition"
              >

                <img
                  src={car.image || "https://dummyimage.com/600x400/000/fff&text=No+Image"}
                  alt={car.name}
                  className="w-full h-52 object-cover"
                />

                <div className="p-4">

                  <h2 className="text-xl font-bold text-green-400">
                    {car.name}
                  </h2>

                  <p className="text-gray-400">{car.brand} • {car.model}</p>
                  <p className="text-gray-400">{car.location}</p>

                  <p className="text-green-400 font-bold mt-2">
                    ₹{car.pricePerHour}/hr
                  </p>

                  <div className="flex gap-3 mt-4">

                    <button
                      onClick={() => handleEditCar(car)}
                      className="flex-1 bg-blue-500 py-2 rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDeleteCar(car._id)}
                      className="flex-1 bg-red-500 py-2 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>

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

export default AdminCars;