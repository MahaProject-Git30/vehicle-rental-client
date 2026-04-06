import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import { FaUser, FaPhone, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

function Register() {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      alert("Invalid email format");
      return;
    }

    if (!/^\d{10}$/.test(formData.mobile)) {
      alert("Mobile must be 10 digits");
      return;
    }

    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    if (!formData.confirmPassword) {
      alert("Confirm password required");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {

      setLoading(true);

      await API.post("/auth/register", {
        name: formData.name,
        mobile: formData.mobile,
        email: formData.email,
        password: formData.password,
      });

      alert("Registration successful ✅");

      navigate("/login");

    } catch (error) {

      console.log("Register error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Registration failed");

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">

      <img
        src="https://images.unsplash.com/photo-1493238792000-8113da705763"
        className="absolute w-full h-full object-cover opacity-30"
        alt="background"
      />

      <div className="relative bg-gray-900/90 backdrop-blur-lg p-10 rounded-2xl shadow-2xl w-[420px] border border-gray-800">

        <h2 className="text-3xl font-bold text-green-400 text-center mb-8">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name */}
          <div className="flex items-center bg-black border border-gray-700 rounded-lg px-3 focus-within:border-green-400">
            <FaUser className="text-gray-400 mr-2" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 bg-transparent outline-none text-white"
              required
            />
          </div>

          {/* Mobile */}
          <div className="flex items-center bg-black border border-gray-700 rounded-lg px-3 focus-within:border-green-400">
            <FaPhone className="text-gray-400 mr-2" />
            <input
              type="text"
              name="mobile"
              placeholder="Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
              className="w-full p-3 bg-transparent outline-none text-white"
              required
            />
          </div>

          {/* Email */}
          <div className="flex items-center bg-black border border-gray-700 rounded-lg px-3 focus-within:border-green-400">
            <FaEnvelope className="text-gray-400 mr-2" />
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 bg-transparent outline-none text-white"
              required
            />
          </div>

          {/* Password */}
          <div className="flex items-center bg-black border border-gray-700 rounded-lg px-3 focus-within:border-green-400">
            <FaLock className="text-gray-400 mr-2" />

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
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

          {/* Confirm Password */}
          <div className="flex items-center bg-black border border-gray-700 rounded-lg px-3 focus-within:border-green-400">
            <FaLock className="text-gray-400 mr-2" />

            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-3 bg-transparent outline-none text-white"
              required
            />

            <div
              className="text-gray-400 cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-400 text-black py-3 rounded-lg font-bold hover:bg-green-300 transition"
          >
            {loading ? "Registering..." : "Register"}
          </button>

        </form>

        <p className="text-center text-sm text-gray-400 mt-6">
          Already have an account?
          <Link to="/login" className="text-green-400 ml-2 hover:underline">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;