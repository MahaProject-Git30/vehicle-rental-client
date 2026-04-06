import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

function Home() {

  const navigate = useNavigate()

  const images = [
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
    "https://images.unsplash.com/photo-1511919884226-fd3cad34687c",
    "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d",
    "https://images.unsplash.com/photo-1493238792000-8113da705763",
  ]

  const [current, setCurrent] = useState(0)

  const [location, setLocation] = useState("")
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  const cities = [
    "Chennai",
    "Coimbatore",
    "Madurai",
    "Tenkasi",
    "Tirunelveli",
    "Salem",
    "Trichy",
  ]

  useEffect(() => {

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length)
    }, 4000)

    return () => clearInterval(interval)

  }, [])


  const handleSearch = (e) => {

    e.preventDefault()

    const params = new URLSearchParams()

    if (location) params.append("location", location)

    if (startDate) {
      params.append("startDate", startDate.toISOString())
    }

    if (endDate) {
      params.append("endDate", endDate.toISOString())
    }
    
    if (!location || !startDate || !endDate) {
      alert("Fill all fields")
      return
    }

    navigate(`/cars?${params.toString()}`)

  }


  return (

    <div className="bg-black min-h-screen text-white">

      {/* HERO SECTION */}

      <div className="relative h-[650px] w-full">

        {/* Background Image */}

        <img
          src={images[current]}
          className="absolute w-full h-full object-cover transition duration-1000"
        />

        {/* Overlay */}

        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center px-4">

          <h1 className="text-4xl md:text-6xl font-bold text-green-400">
            Drive Your Dream Car
          </h1>

          <p className="mt-4 text-lg text-gray-300">
            Luxury • Comfort • Affordable
          </p>


          {/* SEARCH CARD */}

          <form
            onSubmit={handleSearch}
            className="mt-10 w-full max-w-5xl bg-gray-900/90 backdrop-blur-md p-6 rounded-2xl shadow-2xl grid grid-cols-1 md:grid-cols-4 gap-4"
          >

            {/* Location */}

            <div className="flex flex-col">

              <label className="text-sm text-gray-400 mb-1">
                Location
              </label>

              <input
                list="cities"
                placeholder="Enter City"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="p-3 rounded-lg bg-black border border-gray-700 focus:border-green-400 outline-none text-white"
              />

              <datalist id="cities">
                {cities.map((city) => (
                  <option key={city} value={city} />
                ))}
              </datalist>

            </div>


            {/* Start Date */}

            <div className="flex flex-col">

              <label className="text-sm text-gray-400 mb-1">
                Pickup Date
              </label>

              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="dd/MM/yyyy"
                minDate={new Date()}
                placeholderText="Select Date"
                className="p-3 rounded-lg bg-black border border-gray-700 focus:border-green-400 outline-none text-white w-full"
              />

            </div>


            {/* End Date */}

            <div className="flex flex-col">

              <label className="text-sm text-gray-400 mb-1">
                Return Date
              </label>

              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                dateFormat="dd/MM/yyyy"
                minDate={startDate || new Date()}
                placeholderText="Select Date"
                className="p-3 rounded-lg bg-black border border-gray-700 focus:border-green-400 outline-none text-white w-full"
              />

            </div>


            {/* Search Button */}

            <div className="flex items-end">

              <button
                type="submit"
                className="w-full bg-green-400 text-black font-bold py-3 rounded-lg hover:bg-green-300 transition duration-300 shadow-lg"
              >
                Search Cars
              </button>

            </div>

          </form>

        </div>

      </div>

    </div>

  )

}

export default Home