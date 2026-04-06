import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function SearchSection({ onSearch }) {
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [error, setError] = useState("");

  const cities = [
    "Chennai",
    "Coimbatore",
    "Madurai",
    "Tenkasi",
    "Tirunelveli",
    "Salem",
    "Trichy",
  ];

  // ✅ Format date (VERY IMPORTANT for backend)
  const formatDate = (date) => {
    return date ? date.toISOString().split("T")[0] : null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ VALIDATION
    if (!location) {
      setError("Please enter location");
      return;
    }

    if (!startDate || !endDate) {
      setError("Please select dates");
      return;
    }

    if (endDate < startDate) {
      setError("End date cannot be before start date");
      return;
    }

    setError("");

    // ✅ Normalize location
    const formattedLocation =
      location.charAt(0).toUpperCase() + location.slice(1).toLowerCase();

    if (onSearch) {
      onSearch({
        location: formattedLocation,
        startDate: formatDate(startDate),
        endDate: formatDate(endDate),
      });
    }
  };

  return (
    <div className="bg-black py-6">
      <form
        onSubmit={handleSubmit}
        className="max-w-6xl mx-auto bg-gray-900 p-6 rounded-xl grid grid-cols-1 md:grid-cols-4 gap-4 items-center"
      >
        {/* LOCATION */}
        <input
          list="cities"
          type="text"
          placeholder="Enter location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="h-12 w-full px-4 rounded bg-black text-white border border-green-400 outline-none"
        />

        <datalist id="cities">
          {cities.map((city) => (
            <option key={city} value={city} />
          ))}
        </datalist>

        {/* START DATE */}
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          placeholderText="Start Date"
          dateFormat="yyyy-MM-dd"
          minDate={new Date()} // ✅ can't select past
          className="h-12 w-full px-4 rounded bg-black text-white border border-green-400 outline-none"
        />

        {/* END DATE */}
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          placeholderText="End Date"
          minDate={startDate || new Date()}
          dateFormat="yyyy-MM-dd"
          className="h-12 w-full px-4 rounded bg-black text-white border border-green-400 outline-none"
        />

        {/* BUTTON */}
        <button
          type="submit"
          className="h-12 w-full bg-green-400 text-black font-bold rounded hover:bg-green-300 transition"
        >
          Search
        </button>

        {/* ERROR MESSAGE */}
        {error && (
          <p className="md:col-span-4 text-red-400 text-sm text-center">
            {error}
          </p>
        )}
      </form>
    </div>
  );
}

export default SearchSection;
