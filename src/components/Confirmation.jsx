import React, { useState } from "react";
import {
  Calendar,
  Mail,
  Phone,
  User,
  MapPin,
  CarFront,
  Info,
} from "lucide-react";
import { motion } from "framer-motion";
import { useTrip } from "../Contexts/TripType";
import ConformBooking from "../Services/COnformBooking";
import { toast } from "react-toastify";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const BookingConfirmation = () => {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    pickupTime: "",
  });

  const {
    selectedVehicle,
    fromInput,
    toInput,
    totalKms,
    baseFair,
    tollCharge,
    startDate,
    setStartDate,
    setFromInput,
    setToInput,
    setVehicleList,
    setconform
  } = useTrip();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookingData = {
      ...form,
      from: fromInput,
      to: toInput,
      vehicle: selectedVehicle,
      totalKms,
      baseFair,
      tollCharge,
      totalFare: (totalKms * baseFair).toFixed(2),
      driverAllowance: 400,
      permitCharges: 550,
      departureDate: startDate[0],
      arrivalDate: startDate[1] ? startDate[1] : "-",
    };

    const data = await ConformBooking(bookingData);
    console.log("jk :", data);

    if (data.status === 200) {
      setForm({
        name: "",
        mobile: "",
        email: "",
        pickupTime: "",
      });
      setStartDate([new Date()]);
      setFromInput("");
      setToInput("");
      setVehicleList(false)
      setconform(false)
      toast.error("please select pick up and drop location", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  const details = [
    { label: "Base km", value: totalKms },
    { label: "Base Fare Per Km", value: `₹ ${baseFair}` },
    {
      label: "Total Base Fare",
      value: `₹ ${(totalKms * baseFair).toFixed(
        2
      )} (${totalKms} km X ₹ ${baseFair})`,
    },
    { label: "Driver Allowance", value: "₹ 400" },
    { label: "Permit Charges", value: "₹ 550" },
    { label: "Toll Charges (Approx)", value: `₹ ${tollCharge}` },
    { label: "Total", value: `₹ ${(totalKms * baseFair).toFixed(2)}` },
  ];

  return (
    <div className="min-h-screen bg-[#FFF8E7] py-10 px-4">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="max-w-4xl mx-auto space-y-10"
      >
        <motion.h2
          custom={1}
          variants={fadeUp}
          className="text-4xl font-bold text-center text-[#3A2E12] drop-shadow-sm"
        >
          Confirm Your Booking
        </motion.h2>

        <motion.div
          custom={2}
          variants={fadeUp}
          className="bg-white shadow-xl rounded-2xl p-6 border border-[#FBE7B9] space-y-4"
        >
          <h3 className="text-xl font-semibold text-[#EFB11D]">
            <MapPin className="inline w-5 h-5 mr-2 text-[#EFB11D]" />
            Your Travel Plan
          </h3>

          <div className="bg-[#FFF8E7] p-4 rounded-lg text-[#3A2E12] space-y-1">
            <p>
              <MapPin className="inline w-4 h-4 text-green-600 mr-1" />
              <strong>Pickup:</strong> {fromInput}
            </p>
            <p>
              <MapPin className="inline w-4 h-4 text-red-600 mr-1" />
              <strong>Drop:</strong> {toInput}
            </p>
          </div>

          <h3 className="text-xl font-semibold text-[#EFB11D]">
            <CarFront className="inline w-5 h-5 mr-2 text-[#EFB11D]" />
            Vehicle Information
          </h3>

          <div className="bg-[#FFF8E7] p-4 rounded-lg text-[#3A2E12] grid grid-cols-2 sm:grid-cols-3 gap-2">
            <p>
              <strong>Model:</strong> {selectedVehicle.type}
            </p>
            <p>
              <strong>Seats:</strong> {selectedVehicle.capacity}
            </p>
          </div>

          <h3 className="text-xl font-semibold text-[#EFB11D]">Fare Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {details.map((item, index) => (
              <motion.div
                key={index}
                custom={2.5 + index * 0.2}
                variants={fadeUp}
                className={`flex justify-between px-4 py-2 rounded-md ${
                  index === details.length - 1
                    ? "bg-[#FBE7B9] font-bold text-[#3A2E12]"
                    : "bg-gray-50"
                }`}
              >
                <span>{item.label}</span>
                <span>{item.value}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          custom={3}
          variants={fadeUp}
          className="bg-white shadow-xl rounded-2xl p-8 border border-[#FBE7B9] space-y-6"
        >
          <h3 className="text-xl font-semibold mb-4 text-[#EFB11D]">
            Passenger Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block mb-1 font-medium">
                <User className="inline w-4 h-4 mr-1" /> Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                value={form.name}
                onChange={handleChange}
                className="w-full border border-[#EFB11D] rounded-lg px-4 py-2 shadow-sm focus:ring-[#EFB11D]"
              />
            </div>

            <div>
              <label htmlFor="mobile" className="block mb-1 font-medium">
                <Phone className="inline w-4 h-4 mr-1" /> Mobile
              </label>
              <input
                type="tel"
                name="mobile"
                id="mobile"
                required
                value={form.mobile}
                onChange={handleChange}
                className="w-full border border-[#EFB11D] rounded-lg px-4 py-2 shadow-sm focus:ring-[#EFB11D]"
              />
            </div>

            <div>
              <label htmlFor="email" className="block mb-1 font-medium">
                <Mail className="inline w-4 h-4 mr-1" /> Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full border border-[#EFB11D] rounded-lg px-4 py-2 shadow-sm focus:ring-[#EFB11D]"
              />
            </div>

            <div>
              <label htmlFor="pickupTime" className="block mb-1 font-medium">
                <Calendar className="inline w-4 h-4 mr-1" /> Pick-Up Time
              </label>
              <input
                type="time"
                name="pickupTime"
                id="pickupTime"
                required
                value={form.pickupTime}
                onChange={handleChange}
                className="w-full border border-[#EFB11D] rounded-lg px-4 py-2 shadow-sm focus:ring-[#EFB11D]"
              />
            </div>
          </div>

          <div className="text-center pt-6">
            <button
              type="submit"
              className="bg-[#EFB11D] text-white text-lg px-8 py-3 rounded-xl shadow-lg hover:bg-[#C4900F] transition-all"
            >
              Confirm Booking
            </button>
          </div>
        </motion.form>

        <motion.div
          custom={4}
          variants={fadeUp}
          className="text-center text-[#3A2E12] mt-10"
        >
          <Info className="inline w-5 h-5 mr-2 text-[#EFB11D]" />
          <p className="text-lg">
            Thank you for choosing <strong>Pallaku Cab Service</strong>. Your
            ride will be safe, comfortable, and timely. We’ll contact you
            shortly to confirm your trip.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default BookingConfirmation;
