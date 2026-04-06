import { useEffect, useState } from "react"
import API from "../../services/api"

function AdminUsers(){

 const [users,setUsers] = useState([])

 useEffect(()=>{
  fetchUsers()
 },[])

 const fetchUsers = async()=>{

  const token = localStorage.getItem("token")

  const res = await API.get("/admin/users",{
   headers:{ Authorization:`Bearer ${token}` }
  })

  setUsers(res.data)

 }

 const handleDeleteUser = async(id)=>{

  const confirmDelete = window.confirm("Are you sure to delete this user?")

  if(!confirmDelete) return

  const token = localStorage.getItem("token")

  await API.delete(`/admin/users/${id}`,{
   headers:{ Authorization:`Bearer ${token}` }
  })

  alert("User deleted successfully")

  fetchUsers()

 }

 const handleRoleChange = async(id,role)=>{

    const confirmEdit = window.confirm("Are you sure to change role of this user?")

    if(!confirmEdit) return

    const token = localStorage.getItem("token")

    await API.put(`/admin/users/${id}`,
    { role },
    { headers:{Authorization:`Bearer ${token}`} 
    })  

    alert

  fetchUsers()

 }

 return(

  <div className="bg-black text-white min-h-screen p-6">

   <h1 className="text-3xl text-green-400 mb-6">
    All Users
   </h1>

   <table className="w-full border border-gray-700">

    <thead className="bg-gray-900">

     <tr>

      <th className="p-3">Name</th>
      <th>Email</th>
      <th>Mobile</th>
      <th>Role</th>
      <th>Edit</th>
      <th>Delete</th>

     </tr>

    </thead>

    <tbody>

     {users.map(user=>(
      <tr key={user._id} className="border-t border-gray-700">

       <td className="p-3">{user.name}</td>
       <td>{user.email}</td>
       <td>{user.mobile}</td>
       <td>{user.role}</td>

       <td>

        <select
         defaultValue={user.role}
         onChange={(e)=>handleRoleChange(user._id,e.target.value)}
         className="bg-gray-800 p-1"
        >

         <option value="user">User</option>
         <option value="owner">Owner</option>
         <option value="admin">Admin</option>

        </select>

       </td>

       <td>

        <button
         onClick={()=>handleDeleteUser(user._id)}
         className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
        >
         Delete
        </button>

       </td>

      </tr>
     ))}

    </tbody>

   </table>

  </div>

 )

}

export default AdminUsers