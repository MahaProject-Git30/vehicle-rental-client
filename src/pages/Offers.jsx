import { FaTag, FaGift, FaCar, FaClock } from "react-icons/fa";

function Offers() {

  const offers = [
    {
      title: "First Ride Offer",
      discount: "20% OFF",
      code: "FIRST20",
      desc: "Get 20% discount on your first booking with DriveNow.",
      icon: <FaGift />
    },
    {
      title: "Weekend Special",
      discount: "15% OFF",
      code: "WEEKEND15",
      desc: "Perfect for weekend road trips with family or friends.",
      icon: <FaClock />
    },
    {
      title: "Long Trip Deal",
      discount: "25% OFF",
      code: "LONGDRIVE",
      desc: "Book for 3+ days and unlock exclusive discounts.",
      icon: <FaCar />
    },
    {
      title: "Festival Offer",
      discount: "30% OFF",
      code: "FESTIVE30",
      desc: "Celebrate festivals with amazing rental deals.",
      icon: <FaTag />
    },
  ];

  return (
    <div className="bg-black text-white min-h-screen">

      {/* HERO SECTION */}

      <section className="relative h-[350px] flex items-center justify-center text-center">

        <img
          src="https://images.unsplash.com/photo-1493238792000-8113da705763"
          className="absolute w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative z-10">

          <h1 className="text-5xl font-bold text-green-400 mb-3">
            Special Offers
          </h1>

          <p className="text-gray-300 text-lg">
            Save more on every trip with exclusive DriveNow deals
          </p>

        </div>

      </section>


      {/* OFFERS GRID */}

      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">

          {offers.map((offer, index) => (

            <div
              key={index}
              className="bg-gray-900 p-8 rounded-2xl border border-gray-800 hover:border-green-400 transition hover:scale-105 shadow-lg"
            >

              {/* Icon */}
              <div className="text-green-400 text-4xl mb-4">
                {offer.icon}
              </div>

              {/* Discount Badge */}

              <div className="inline-block bg-green-400 text-black font-bold px-4 py-1 rounded-full mb-3">
                {offer.discount}
              </div>

              <h2 className="text-xl font-bold mb-2">
                {offer.title}
              </h2>

              <p className="text-gray-400 mb-6">
                {offer.desc}
              </p>


              {/* Coupon Code */}

              <div className="flex items-center justify-between bg-black border border-green-400 px-4 py-2 rounded mb-4">

                <span className="text-green-400 font-bold">
                  {offer.code}
                </span>

                <button
                  onClick={() => navigator.clipboard.writeText(offer.code)}
                  className="text-sm bg-green-400 text-black px-3 py-1 rounded hover:bg-green-300"
                >
                  Copy
                </button>

              </div>


              <button className="w-full bg-green-400 text-black py-2 rounded-lg font-bold hover:bg-green-300 transition">
                Apply Offer
              </button>

            </div>

          ))}

        </div>

      </section>


      {/* CTA SECTION */}

      <section className="bg-gradient-to-r from-green-500 to-green-400 text-black py-20 text-center">

        <h2 className="text-4xl font-bold mb-4">
          Ready for Your Next Ride?
        </h2>

        <p className="mb-6 text-lg">
          Browse cars and apply your favorite offer while booking.
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

export default Offers;