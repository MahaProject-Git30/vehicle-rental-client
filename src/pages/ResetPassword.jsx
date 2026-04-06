import { useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa"
import API from "../services/api"

function ResetPassword() {

  const { token } = useParams()
  const navigate = useNavigate()

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [message, setMessage] = useState("")

  const handleSubmit = async (e) => {

    e.preventDefault()

    setMessage("")

    if (password !== confirmPassword) {
      setMessage("Passwords do not match ❌")
      return
    }

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters ❌")
      return
    }

    try {

      setLoading(true)

      const res = await API.post(`/auth/reset-password/${token}`, {
        password
      })

      setMessage(res.data.message || "Password reset successful ✅")

      setTimeout(() => {
        navigate("/login")
      }, 2000)

    } catch (error) {

      console.log(error)

      if (error.response) {
        setMessage(error.response.data.message)
      } 
      else if (error.request) {
        setMessage("Network error. Check backend connection")
      } 
      else {
        setMessage("Reset failed ❌")
      }

    } finally {
      setLoading(false)
    }

  }

  return (

    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden px-4">

      {/* Background */}
      <img
        src="https://images.unsplash.com/photo-1503376780353-7e6692767b70"
        className="absolute w-full h-full object-cover opacity-25"
      />

      {/* Card */}
      <div className="relative w-full max-w-md bg-gray-900/80 backdrop-blur-xl border border-gray-800 rounded-2xl p-8 shadow-2xl">

        <h2 className="text-3xl font-bold text-center text-green-400 mb-2">
          Reset Password
        </h2>

        <p className="text-gray-400 text-center mb-6 text-sm">
          Enter your new password below
        </p>

        {/* Message */}
        {message && (
          <div className="text-center text-yellow-400 mb-4 text-sm">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* New Password */}
          <div className="flex items-center bg-black border border-gray-700 rounded-lg px-3 focus-within:border-green-400">

            <FaLock className="text-gray-400 mr-2"/>

            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              required
              className="w-full p-3 bg-transparent outline-none text-white"
            />

            {showPassword ? (
              <FaEyeSlash
                className="text-gray-400 cursor-pointer"
                onClick={()=>setShowPassword(false)}
              />
            ) : (
              <FaEye
                className="text-gray-400 cursor-pointer"
                onClick={()=>setShowPassword(true)}
              />
            )}

          </div>


          {/* Confirm Password */}
          <div className="flex items-center bg-black border border-gray-700 rounded-lg px-3 focus-within:border-green-400">

            <FaLock className="text-gray-400 mr-2"/>

            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e)=>setConfirmPassword(e.target.value)}
              required
              className="w-full p-3 bg-transparent outline-none text-white"
            />

            {showConfirmPassword ? (
              <FaEyeSlash
                className="text-gray-400 cursor-pointer"
                onClick={()=>setShowConfirmPassword(false)}
              />
            ) : (
              <FaEye
                className="text-gray-400 cursor-pointer"
                onClick={()=>setShowConfirmPassword(true)}
              />
            )}

          </div>


          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-400 hover:bg-green-500 text-black font-semibold py-3 rounded-lg transition duration-300 shadow-lg flex items-center justify-center"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>

        </form>

        {/* Back to Login */}
        <p className="text-center text-gray-500 text-sm mt-6">
          Back to
          <Link
            to="/login"
            className="text-green-400 ml-1 hover:underline"
          >
            Login
          </Link>
        </p>

      </div>

    </div>
  )
}

export default ResetPassword