import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { FaUserCircle, FaCar, FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const menuRef = useRef();

  // ✅ Load user safely
  const loadUser = () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      setUser(storedUser || null);
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    loadUser();

    // ✅ Fix: trigger manually after login/logout
    window.addEventListener("userChanged", loadUser);

    return () => {
      window.removeEventListener("userChanged", loadUser);
    };
  }, []);

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // ✅ Trigger update
    window.dispatchEvent(new Event("userChanged"));

    setUser(null);
    setMenuOpen(false);
    setMobileMenu(false);

    navigate("/");
  };

  return (
    <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-md border-b border-gray-800 text-white z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* LOGO */}
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold text-green-400"
        >
          <FaCar />
          DriveNow
        </Link>

        {/* DESKTOP MENU */}
        <ul className="hidden md:flex items-center gap-8 text-gray-300 font-medium">
          <li>
            <Link to="/" className="hover:text-green-400">
              Home
            </Link>
          </li>
          <li>
            <Link to="/cars" className="hover:text-green-400">
              Cars
            </Link>
          </li>
          <li>
            <Link to="/offers" className="hover:text-green-400">
              Offers
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-green-400">
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-green-400">
              Contact
            </Link>
          </li>
        </ul>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="relative" ref={menuRef}>
              <FaUserCircle
                size={32}
                className="cursor-pointer text-green-400"
                onClick={() => setMenuOpen(!menuOpen)}
              />

              {menuOpen && (
                <div className="absolute right-0 mt-4 w-56 bg-gray-900 border border-gray-700 rounded-xl shadow-lg">
                  <div className="px-4 py-3 border-b border-gray-700 text-green-400 font-semibold">
                    {user?.name || "User"}
                  </div>

                  {user?.role === "admin" && (
                    <Link
                      to="/admin"
                      className="block px-4 py-2 hover:bg-gray-800"
                    >
                      Admin Dashboard
                    </Link>
                  )}

                  {user?.role === "owner" && (
                    <Link
                      to="/owner"
                      className="block px-4 py-2 hover:bg-gray-800"
                    >
                      Owner Dashboard
                    </Link>
                  )}

                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-800"
                  >
                    My Profile
                  </Link>

                  <Link
                    to="/my-bookings"
                    className="block px-4 py-2 hover:bg-gray-800"
                  >
                    My Bookings
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-800 text-red-400"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="hidden md:block bg-green-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-green-300"
            >
              Login
            </Link>
          )}

          {/* Become Host */}
          {user?.role === "user" && (
            <Link
              to="/become-host"
              className="flex items-center gap-2 bg-green-400 text-black px-3 py-1 rounded font-semibold hover:bg-green-300"
            >
              <FaCar />
              Become a Host
            </Link>
          )}

          {/* MOBILE MENU BTN */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileMenu && (
        <div className="md:hidden bg-black border-t border-gray-800">
          <ul className="flex flex-col text-center text-gray-300 font-medium">
            <li className="py-3 border-b">
              <Link to="/" onClick={() => setMobileMenu(false)}>
                Home
              </Link>
            </li>
            <li className="py-3 border-b">
              <Link to="/cars" onClick={() => setMobileMenu(false)}>
                Cars
              </Link>
            </li>
            <li className="py-3 border-b">
              <Link to="/offers" onClick={() => setMobileMenu(false)}>
                Offers
              </Link>
            </li>
            <li className="py-3 border-b">
              <Link to="/about" onClick={() => setMobileMenu(false)}>
                About
              </Link>
            </li>
            <li className="py-3 border-b">
              <Link to="/contact" onClick={() => setMobileMenu(false)}>
                Contact
              </Link>
            </li>

            {!user && (
              <li className="py-3">
                <Link to="/login" onClick={() => setMobileMenu(false)}>
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
