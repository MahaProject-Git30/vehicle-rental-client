import { useState } from "react";
import API from "../services/api";
import { Navigate } from "react-router-dom";

function BecomeHost() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      return;
    }

    try {
      await API.post("/host/request", form);
      alert("Request sent");
    } catch (err) {
      alert("Failed to send request");
    }
    alert(
      "Message sent to admin. We will check and update your request within 24 hours.",
    );
    window.location.href = "/";
  };

  return (
    <div className="bg-black text-white min-h-screen p-10">
      <h1 className="text-3xl text-green-400 mb-6">Become a Host</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="p-2 bg-gray-900 w-full"
        />

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="p-2 bg-gray-900 w-full"
        />

        <input
          name="mobile"
          placeholder="Mobile"
          onChange={handleChange}
          className="p-2 bg-gray-900 w-full"
        />

        <textarea
          name="message"
          placeholder="Why you want to become host?"
          onChange={handleChange}
          className="p-2 bg-gray-900 w-full"
        />

        <button className="bg-green-400 text-black px-4 py-2">
          Send Request
        </button>
      </form>
    </div>
  );
}

export default BecomeHost;
