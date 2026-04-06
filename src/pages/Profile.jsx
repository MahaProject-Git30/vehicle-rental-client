import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!token) {
      navigate("/login");
      return;
    }

    setUser(storedUser);
  }, [navigate]);

  if (!user) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        User not found
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen p-6">
      <div className="max-w-3xl mx-auto bg-gray-900 rounded-xl p-6 shadow-lg">
        <h1 className="text-3xl font-bold text-green-400 mb-6">My Profile</h1>

        <div className="space-y-4">
          <div>
            <label className="text-gray-400">Name</label>
            <p className="text-lg">{user.name}</p>
          </div>

          <div>
            <label className="text-gray-400">Email</label>
            <p className="text-lg">{user.email}</p>
          </div>

          <div>
            <label className="text-gray-400">Mobile</label>
            <p className="text-lg">{user.mobile}</p>
          </div>

          <div>
            <label className="text-gray-400">Role</label>
            <p className="text-lg capitalize">{user.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
