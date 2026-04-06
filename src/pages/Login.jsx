import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import API from "../services/api"
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa"

function Login() {

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e) => {

    e.preventDefault()

    if (!email || !password) {
      alert("All fields required")
      return
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      alert("Invalid email")
      return
    }

    try {

      const res = await API.post("/auth/login", {
        email,
        password
      })

      localStorage.setItem("token", res.data.token)
      localStorage.setItem("user", JSON.stringify(res.data.user))

      alert("Login successful")
      window.location.href = "/"

    } catch (error) {

      console.log("Login error:", error.response?.data || error.message)
      alert("Invalid email or password")

    }

  }

  return (

    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">

      {/* Background Image */}

      <img
        src="https://images.unsplash.com/photo-1503376780353-7e6692767b70"
        className="absolute w-full h-full object-cover opacity-30"
      />

      {/* Login Card */}

      <div className="relative bg-gray-900/90 backdrop-blur-lg p-10 rounded-2xl shadow-2xl w-[380px] border border-gray-800">

        <h2 className="text-3xl font-bold text-green-400 text-center mb-8">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}

          <div className="flex items-center bg-black border border-gray-700 rounded-lg px-3 focus-within:border-green-400">

            <FaEnvelope className="text-gray-400 mr-2"/>

            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="w-full p-3 bg-transparent outline-none text-white"
              required
            />

          </div>


          {/* Password with Eye Icon */}

          <div className="flex items-center bg-black border border-gray-700 rounded-lg px-3 focus-within:border-green-400">

            <FaLock className="text-gray-400 mr-2"/>

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="w-full p-3 bg-transparent outline-none text-white"
              required
            />

            <div
              className="text-gray-400 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>

          </div>


          {/* Forgot Password */}

          <div className="text-right text-sm">

            <Link
              to="/forgot-password"
              className="text-green-400 hover:underline"
            >
              Forgot Password?
            </Link>

          </div>


          {/* Login Button */}

          <button
            type="submit"
            className="w-full bg-green-400 text-black py-3 rounded-lg font-bold hover:bg-green-300 transition"
          >
            Login
          </button>

        </form>


        {/* Register Link */}

        <p className="text-center text-sm text-gray-400 mt-6">

          Don't have an account?

          <Link
            to="/register"
            className="text-green-400 ml-2 hover:underline"
          >
            Register
          </Link>

        </p>

      </div>

    </div>

  )

}

export default Login