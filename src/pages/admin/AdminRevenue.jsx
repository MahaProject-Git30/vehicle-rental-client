import {useEffect,useState} from "react"
import API from "../../services/api"

function AdminRevenue(){

 const [payments,setPayments] = useState([])

 useEffect(()=>{
  fetchPayments()
 },[])

 const fetchPayments = async()=>{

  const token = localStorage.getItem("token")

  const res = await API.get("/bookings/admin",{
   headers:{Authorization:`Bearer ${token}`}
  })

  setPayments(res.data)

 }

 return(

  <div className="bg-black text-white min-h-screen p-6">

   <h1 className="text-3xl text-green-400 mb-6">
    Revenue Details
   </h1>

   <table className="w-full border border-gray-700">

    <thead className="bg-gray-900">

     <tr>

      <th className="p-3">Car</th>
      <th>User</th>
      <th>Date</th>
      <th>Amount</th>

     </tr>

    </thead>

    <tbody>

     {payments.map(p=>(
      <tr key={p._id} className="border-t border-gray-700">

       <td className="p-3">{p.car?.name}</td>

       <td>{p.user?.name}</td>

       <td>
        {new Date(p.startDate).toLocaleDateString()}
       </td>

       <td className="text-green-400">
        ₹{p.totalPrice}
       </td>

      </tr>
     ))}

    </tbody>

   </table>

  </div>

 )

}

export default AdminRevenue