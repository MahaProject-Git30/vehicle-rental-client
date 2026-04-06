import { useEffect } from "react";

function FilterSidebar({ filters, setFilters, applyFilters, clearFilters }) {
  const minLimit = 0;
  const maxLimit = 5000;

  // ✅ Ensure default values
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      minPrice: prev.minPrice || minLimit,
      maxPrice: prev.maxPrice || maxLimit,
    }));
  }, []);

  const handleMinChange = (e) => {
    const value = Number(e.target.value);

    if (value >= filters.maxPrice) return;

    setFilters((prev) => ({
      ...prev,
      minPrice: value,
    }));
  };

  const handleMaxChange = (e) => {
    const value = Number(e.target.value);

    if (value <= filters.minPrice) return;

    setFilters((prev) => ({
      ...prev,
      maxPrice: value,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="bg-gray-900 p-5 rounded-xl text-white sticky top-24">
      <h2 className="text-xl font-bold text-green-400 mb-4">Filters</h2>

      {/* PRICE RANGE */}
      <div className="mb-6">
        <label className="block mb-3">Price Range</label>

        <div className="relative h-8">
          <input
            type="range"
            min={minLimit}
            max={maxLimit}
            value={filters.minPrice}
            onChange={handleMinChange}
            className="absolute w-full appearance-none h-2 bg-green-400 rounded"
          />

          <input
            type="range"
            min={minLimit}
            max={maxLimit}
            value={filters.maxPrice}
            onChange={handleMaxChange}
            className="absolute w-full appearance-none h-2 bg-green-400 rounded"
          />
        </div>

        <div className="flex justify-between text-sm text-gray-400 mt-2">
          <span>₹{filters.minPrice}</span>
          <span>₹{filters.maxPrice}</span>
        </div>
      </div>

      {/* FUEL TYPE */}
      <div className="mb-4">
        <label className="block mb-1">Fuel Type</label>

        <select
          name="fuelType"
          value={filters.fuelType}
          onChange={handleChange}
          className="w-full p-2 bg-black border border-green-400 rounded"
        >
          <option value="">All</option>
          <option value="Petrol">Petrol</option>
          <option value="Diesel">Diesel</option>
          <option value="Electric">Electric</option>
        </select>
      </div>

      {/* SEATS */}
      <div className="mb-4">
        <label className="block mb-1">Seats</label>

        <select
          name="seats"
          value={filters.seats}
          onChange={handleChange}
          className="w-full p-2 bg-black border border-green-400 rounded"
        >
          <option value="">All</option>
          <option value="5">5 Seater</option>
          <option value="7">7 Seater</option>
        </select>
      </div>

      {/* TRANSMISSION */}
      <div className="mb-4">
        <label className="block mb-1">Transmission</label>

        <select
          name="transmission"
          value={filters.transmission}
          onChange={handleChange}
          className="w-full p-2 bg-black border border-green-400 rounded"
        >
          <option value="">All</option>
          <option value="Manual">Manual</option>
          <option value="Automatic">Automatic</option>
        </select>
      </div>

      {/* BUTTONS */}
      <div className="flex gap-2">
        <button
          onClick={applyFilters}
          className="w-full bg-green-400 text-black py-2 rounded font-bold hover:bg-green-300"
        >
          Apply
        </button>

        <button
          onClick={clearFilters}
          className="w-full border border-green-400 text-green-400 py-2 rounded font-bold hover:bg-green-400 hover:text-black"
        >
          Clear
        </button>
      </div>
    </div>
  );
}

export default FilterSidebar;
