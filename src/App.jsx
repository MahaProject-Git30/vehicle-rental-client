import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Offers from "./pages/Offers";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import CarListing from "./pages/CarListing";
import CarDetails from "./pages/CarDetails";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBookings";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminBookings from "./pages/admin/AdminBookings";
import AdminCars from "./pages/admin/AdminCars";
import OwnerDashboard from "./pages/owner/OwnerDashboard";
import OwnerCars from "./pages/owner/OwnerCars";
import OwnerBookings from "./pages/owner/OwnerBookings";
import Wishlist from "./pages/Wishlist"
import AdminUsers from "./pages/admin/AdminUsers"
import AdminRevenue from "./pages/admin/AdminRevenue"
import BecomeHost from "./pages/BecomeHost" 

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <div className="pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/cars" element={<CarListing />} />
          <Route path="/car/:id" element={<CarDetails />} />
          <Route path="/booking/:id" element={<Booking />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/bookings" element={<AdminBookings />} />
          <Route path="/admin/cars" element={<AdminCars />} />
          <Route path="/owner" element={<OwnerDashboard />} />
          <Route path="/owner/cars" element={<OwnerCars />} />
          <Route path="/owner/bookings" element={<OwnerBookings />} />
          <Route path="/wishlist" element={<Wishlist />} />       
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/revenue" element={<AdminRevenue />} />
          <Route path="/become-host" element={<BecomeHost />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
