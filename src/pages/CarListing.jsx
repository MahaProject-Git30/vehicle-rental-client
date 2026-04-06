import { useEffect, useState } from "react";
import API from "../services/api";
import CarCard from "../components/CarCard";
import FilterSidebar from "../components/FilterSidebar";
import SearchSection from "../components/SearchSection";
import { useLocation } from "react-router-dom";

function CarListing() {

  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [sort, setSort] = useState("");

  const [filters, setFilters] = useState({
    location: "",
    startDate: "",
    endDate: "",
    minPrice: "",
    maxPrice: "",
    fuelType: "",
    seats: "",
    transmission: "",
  });

  useEffect(() => {

    const params = new URLSearchParams(location.search);
    const city = params.get("location");

    if (city) {
      fetchFilteredCars({ location: city });
    } else {
      fetchAllCars();
    }

  }, []);

  const fetchAllCars = async () => {

    try {

      setLoading(true);

      const res = await API.get("/cars");

      setCars(res.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  const fetchFilteredCars = async (customFilters = filters) => {

    try {

      setLoading(true);

      const params = new URLSearchParams();

      if (customFilters.location)
        params.append("location", customFilters.location);

      if (customFilters.minPrice)
        params.append("minPrice", customFilters.minPrice);

      if (customFilters.maxPrice)
        params.append("maxPrice", customFilters.maxPrice);

      if (customFilters.fuelType)
        params.append("fuelType", customFilters.fuelType);

      if (customFilters.seats)
        params.append("seats", customFilters.seats);

      if (customFilters.transmission)
        params.append("transmission", customFilters.transmission);

      if (customFilters.sort)
        params.append("sort", customFilters.sort);

      const res = await API.get(`/cars/search?${params.toString()}`);

      setCars(res.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  const handleSearch = (searchData) => {

    const updatedFilters = {
      ...filters,
      location: searchData.location,
      startDate: searchData.startDate,
      endDate: searchData.endDate,
      sort: searchData.sort
    };

    setFilters(updatedFilters);

    fetchFilteredCars(updatedFilters);

  };

  const applyFilters = () => {
    fetchFilteredCars(filters);
  };

  const clearFilters = async () => {

    const resetFilters = {
      location: "",
      startDate: "",
      endDate: "",
      minPrice: "",
      maxPrice: "",
      fuelType: "",
      seats: "",
      transmission: "",
    };

    setFilters(resetFilters);

    await fetchAllCars();

  };

  return (

    <div className="bg-black min-h-screen text-white">

      {/* HERO HEADER */}

      <div className="text-center py-12 bg-gradient-to-b from-gray-900 to-black">

        <h1 className="text-5xl md:text-6xl font-extrabold text-green-400 tracking-wide">
          DriveNow
        </h1>

        <p className="text-gray-400 mt-3 text-lg">
          Find the perfect car for your next journey
        </p>

        <div className="w-24 h-1 bg-green-400 mx-auto mt-5 rounded-full"></div>

      </div>


      {/* SEARCH SECTION */}

      <SearchSection onSearch={handleSearch} />


      {/* MAIN SECTION */}

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 px-6 py-10">

        {/* FILTER SIDEBAR */}

        <div className="w-full md:w-1/4">

          <FilterSidebar
            filters={filters}
            setFilters={setFilters}
            applyFilters={applyFilters}
            clearFilters={clearFilters}
          />

        </div>



        {/* CAR GRID */}

        <div className="w-full md:w-3/4">

          {/* TOP BAR */}

          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">

            <h2 className="text-3xl font-bold text-white">
              Available Cars
            </h2>

            <select
              value={sort}
              onChange={(e) => {
                setSort(e.target.value);
                fetchFilteredCars({
                  ...filters,
                  sort: e.target.value
                });
              }}
              className="bg-gray-900 border border-gray-700 px-4 py-2 rounded-lg focus:border-green-400 outline-none"
            >
              <option value="">Sort By</option>
              <option value="price_asc">Price Low → High</option>
              <option value="price_desc">Price High → Low</option>
            </select>

          </div>


          {/* LOADING */}

          {loading ? (

            <div className="flex justify-center items-center py-24">

              <p className="text-green-400 text-lg font-semibold">
                Loading cars...
              </p>

            </div>

          ) : cars.length === 0 ? (

            <div className="flex flex-col items-center justify-center py-24">

              <p className="text-red-400 text-lg">
                No cars found for this search.
              </p>

            </div>

          ) : (

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">

              {cars.map((car) => (
                <CarCard key={car._id} car={car} />
              ))}

            </div>

          )}

        </div>

      </div>

    </div>

  );

}

export default CarListing;