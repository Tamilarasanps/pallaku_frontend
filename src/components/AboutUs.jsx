import { motion } from "framer-motion";
import taxii from "../assets/taxii.png";

const AboutUs = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#ff1d58] mb-4">
            About Pallaku Cabs
          </h2>
          <div className="w-20 h-1 bg-[#ff1d58] mx-auto"></div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Image Section */}
          <motion.div
            className="order-2 lg:order-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <img
              src={taxii}
              alt="Pallaku Cabs - Professional taxi service"
              className="w-full h-auto rounded-xl shadow-xl"
            />
          </motion.div>

          {/* Content Section */}
          <motion.div
            className="order-1 lg:order-2 space-y-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-gray-800">
              Your Trusted Travel Partner
            </h3>

            <p className="text-gray-600 text-lg leading-relaxed">
              At Pallaku Cabs, we believe in making every journey memorable and
              comfortable. With our commitment to excellence and customer
              satisfaction, we provide reliable transportation solutions across
              Tamil Nadu and beyond.
            </p>

            <p className="text-gray-600 text-lg leading-relaxed">
              Whether it's a family vacation, business trip, or special
              occasion, our professional drivers and well-maintained vehicles
              ensure you reach your destination safely and on time.
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#ff1d58]/10 rounded-full flex items-center justify-center">
                  <span className="text-[#ff1d58] text-xl">🚗</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">
                    Trusted Vehicles
                  </h4>
                  <p className="text-sm text-gray-600">Well-maintained fleet</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#ff1d58]/10 rounded-full flex items-center justify-center">
                  <span className="text-[#ff1d58] text-xl">👨‍✈️</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">
                    Expert Drivers
                  </h4>
                  <p className="text-sm text-gray-600">
                    Professional chauffeurs
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#ff1d58]/10 rounded-full flex items-center justify-center">
                  <span className="text-[#ff1d58] text-xl">💰</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Best Rates</h4>
                  <p className="text-sm text-gray-600">Competitive pricing</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#ff1d58]/10 rounded-full flex items-center justify-center">
                  <span className="text-[#ff1d58] text-xl">⏰</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">24/7 Service</h4>
                  <p className="text-sm text-gray-600">Always available</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                className="px-8 py-3 bg-[#ff1d58] text-white font-semibold rounded-lg hover:bg-red-600 transition-colors duration-300"
                onClick={() => {
                  document.getElementById("booking")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
              >
                Book Now
              </button>

              <a
                href="tel:+91 7871237890"
                className="px-8 py-3 border-2 border-[#ff1d58] text-[#ff1d58] font-semibold rounded-lg hover:bg-[#ff1d58] hover:text-white transition-all duration-300 text-center"
              >
                📞 Call Us
              </a>
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          className="border-t border-gray-200 pt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-[#ff1d58] mb-2">
                1000+
              </div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#ff1d58] mb-2">50+</div>
              <div className="text-gray-600">Cities Covered</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#ff1d58] mb-2">24/7</div>
              <div className="text-gray-600">Service Available</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#ff1d58] mb-2">100%</div>
              <div className="text-gray-600">Satisfaction</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;
