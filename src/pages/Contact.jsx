import { useState } from "react";
import {
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt
} from "react-icons/fa";

function Contact() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      alert("Please fill all fields ❌");
      return;
    }

    // success message
    setSuccess("Message sent successfully ✅");

    alert("Message sent successfully ✅");

    // clear fields
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="bg-black text-white min-h-screen">

      {/* HERO SECTION */}
      <section className="relative h-[350px] flex items-center justify-center text-center">

        <img
          src="https://images.unsplash.com/photo-1511919884226-fd3cad34687c"
          className="absolute w-full h-full object-cover"
          alt="contact"
        />

        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative z-10">

          <h1 className="text-5xl font-bold text-green-400 mb-3">
            Contact Us
          </h1>

          <p className="text-gray-300 text-lg">
            Have questions? We'd love to hear from you.
          </p>

        </div>

      </section>


      {/* CONTACT SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12">

        {/* CONTACT FORM */}
        <div className="bg-gray-900 p-10 rounded-2xl shadow-xl">

          <h2 className="text-3xl font-bold text-green-400 mb-6">
            Send Us a Message
          </h2>

          {/* Success Message */}
          {success && (
            <p className="text-green-400 mb-4 text-center">
              {success}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-lg bg-black border border-gray-700 focus:border-green-400 outline-none"
            />

            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg bg-black border border-gray-700 focus:border-green-400 outline-none"
            />

            <textarea
              rows="5"
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-3 rounded-lg bg-black border border-gray-700 focus:border-green-400 outline-none"
            />

            <button
              type="submit"
              className="w-full bg-green-400 text-black py-3 rounded-lg font-bold hover:bg-green-300 transition"
            >
              Send Message
            </button>

          </form>

        </div>


        {/* CONTACT INFO */}
        <div>

          <h2 className="text-3xl font-bold text-green-400 mb-6">
            Contact Information
          </h2>

          <div className="space-y-6">

            <div className="flex items-center gap-4">
              <FaMapMarkerAlt className="text-green-400 text-xl" />
              <p className="text-gray-300">
                Chennai, Tamil Nadu, India
              </p>
            </div>

            <div className="flex items-center gap-4">
              <FaEnvelope className="text-green-400 text-xl" />
              <p className="text-gray-300">
                support@drivenow.com
              </p>
            </div>

            <div className="flex items-center gap-4">
              <FaPhone className="text-green-400 text-xl" />
              <p className="text-gray-300">
                +91 98765 43210
              </p>
            </div>

          </div>


          {/* SOCIAL MEDIA */}
          <div className="mt-10">

            <h3 className="text-2xl font-bold text-green-400 mb-4">
              Follow Us
            </h3>

            <div className="flex gap-6 text-3xl">

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-green-400 transition"
              >
                <FaInstagram />
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-green-400 transition"
              >
                <FaTwitter />
              </a>

              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-green-400 transition"
              >
                <FaYoutube />
              </a>

            </div>

          </div>

        </div>

      </section>


      {/* MAP SECTION */}
      <section className="max-w-7xl mx-auto px-6 pb-20">

        <h2 className="text-3xl font-bold text-green-400 text-center mb-8">
          Our Location
        </h2>

        <div className="rounded-2xl overflow-hidden shadow-xl">

          <iframe
            title="location"
            src="https://www.google.com/maps?q=Chennai&output=embed"
            className="w-full h-[350px]"
            loading="lazy"
          ></iframe>

        </div>

      </section>

    </div>
  );
}

export default Contact;