import { FaCarSide, FaUsers, FaShieldAlt } from "react-icons/fa";

function About() {
  return (
    <div className="bg-black text-white">

      {/* HERO SECTION */}

      <section className="relative h-[400px] flex items-center justify-center text-center">

        <img
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70"
          className="absolute w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative z-10 max-w-3xl px-4">

          <h1 className="text-5xl md:text-6xl font-bold text-green-400 mb-4">
            About DriveNow
          </h1>

          <p className="text-gray-300 text-lg">
            A modern car rental platform designed to make your journeys
            comfortable, affordable, and unforgettable.
          </p>

        </div>

      </section>

      {/* OUR STORY */}

      <section className="max-w-7xl mx-auto py-20 px-6 grid md:grid-cols-2 gap-12 items-center">

        <img
          src="https://images.unsplash.com/photo-1511919884226-fd3cad34687c"
          className="rounded-2xl shadow-xl"
        />

        <div>

          <h2 className="text-4xl font-bold text-green-400 mb-6">
            Our Story
          </h2>

          <p className="text-gray-300 mb-4 leading-relaxed">
            DriveNow was founded with a mission to simplify car rentals.
            Traditional rental services can be slow, expensive, and
            complicated. Our platform was built to change that.
          </p>

          <p className="text-gray-300 leading-relaxed">
            With DriveNow, users can instantly search, book, and drive
            their favorite vehicles. We connect trusted car owners with
            renters through a secure and seamless platform.
          </p>

        </div>

      </section>

      {/* WHY CHOOSE US */}

      <section className="bg-gray-900 py-20">

        <div className="max-w-7xl mx-auto px-6 text-center">

          <h2 className="text-4xl font-bold text-green-400 mb-12">
            Why Choose DriveNow
          </h2>

          <div className="grid md:grid-cols-3 gap-10">

            <div className="bg-black p-8 rounded-2xl border border-gray-800 hover:border-green-400 transition hover:scale-105">

              <FaCarSide className="text-green-400 text-4xl mx-auto mb-4" />

              <h3 className="text-xl font-bold mb-3">
                Wide Range of Cars
              </h3>

              <p className="text-gray-400">
                Choose from economy cars, SUVs, luxury vehicles, and more
                across multiple cities.
              </p>

            </div>

            <div className="bg-black p-8 rounded-2xl border border-gray-800 hover:border-green-400 transition hover:scale-105">

              <FaUsers className="text-green-400 text-4xl mx-auto mb-4" />

              <h3 className="text-xl font-bold mb-3">
                Trusted by Customers
              </h3>

              <p className="text-gray-400">
                Thousands of happy customers trust DriveNow for their
                travel needs.
              </p>

            </div>

            <div className="bg-black p-8 rounded-2xl border border-gray-800 hover:border-green-400 transition hover:scale-105">

              <FaShieldAlt className="text-green-400 text-4xl mx-auto mb-4" />

              <h3 className="text-xl font-bold mb-3">
                Secure Payments
              </h3>

              <p className="text-gray-400">
                Our payment system is protected and powered by Razorpay
                for safe transactions.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* STATS */}

      <section className="max-w-7xl mx-auto py-20 px-6">

        <div className="grid md:grid-cols-4 gap-10 text-center">

          <div>
            <h2 className="text-5xl font-bold text-green-400">500+</h2>
            <p className="text-gray-400 mt-2">Cars Available</p>
          </div>

          <div>
            <h2 className="text-5xl font-bold text-green-400">10K+</h2>
            <p className="text-gray-400 mt-2">Happy Customers</p>
          </div>

          <div>
            <h2 className="text-5xl font-bold text-green-400">50+</h2>
            <p className="text-gray-400 mt-2">Cities Covered</p>
          </div>

          <div>
            <h2 className="text-5xl font-bold text-green-400">24/7</h2>
            <p className="text-gray-400 mt-2">Support</p>
          </div>

        </div>

      </section>

      {/* CALL TO ACTION */}

      <section className="bg-gradient-to-r from-green-500 to-green-400 text-black py-20 text-center">

        <h2 className="text-4xl font-bold mb-4">
          Ready to Drive?
        </h2>

        <p className="mb-6 text-lg">
          Explore hundreds of vehicles and start your journey today.
        </p>

        <a
          href="/cars"
          className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
        >
          Browse Cars
        </a>

      </section>

    </div>
  );
}

export default About;