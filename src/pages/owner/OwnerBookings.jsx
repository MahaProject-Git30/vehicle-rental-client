import { useEffect, useState } from "react"
import API from "../../services/api"

function OwnerBookings(){

  const [bookings,setBookings] = useState([])

  useEffect(()=>{

    fetchBookings()

  },[])

  const fetchBookings = async () => {

    const token = localStorage.getItem("token")

    const res = await API.get("/bookings/owner-bookings",{

      headers:{
        Authorization:`Bearer ${token}`
      }

    })

    setBookings(res.data)

  }

  return(

    <div className="bg-black text-white min-h-screen p-6">

      <h1 className="text-green-400 text-2xl mb-6">
        My Car Bookings
      </h1>

      {bookings.map(b => (

        <div key={b._id} className="bg-gray-900 p-4 mb-4 rounded">

          <h2>{b.car.name}</h2>
          <p>User: {b.user.name}</p>
          <p>Email: {b.user.email}</p>
          <p>Mobile: {b.user.mobile}</p>

        </div>

      ))}

    </div>

  )

}

export default OwnerBookings