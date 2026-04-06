import { Link } from "react-router-dom"

function OwnerDashboard() {

  return (
    <div className="bg-black text-white min-h-screen p-6">

      <h1 className="text-3xl text-green-400 font-bold mb-6">
        Owner Dashboard
      </h1>

      <div className="grid grid-cols-2 gap-6">

        <Link to="/owner/cars">
          <div className="bg-gray-900 p-6 rounded-xl">
            My Cars
          </div>
        </Link>

        <Link to="/owner/bookings">
          <div className="bg-gray-900 p-6 rounded-xl">
            Car Bookings
          </div>
        </Link>

      </div>

    </div>
  )

}

export default OwnerDashboard