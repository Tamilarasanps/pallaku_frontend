import React, { useEffect, useState } from "react";
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
import ConformBooking from "../Services/ConformBooking";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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
// const [loading, setLoading] = useState(false);

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
    setconform,
    duration,
    tripType,
  } = useTrip();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    if (e) e.preventDefault(); // Run only if e exists

    const bookingData = {
      ...form,
      from: fromInput,
      to: toInput,
      tripType: tripType,
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
    const bookingId = data.data.newBooking._id;
    console.log("BokkingId", bookingId);
    console.log("data :", data);
    // setBookingId(data);

    if (data?.status === 200) {
      setForm({
        name: "",
        mobile: "",
        email: "",
        pickupTime: "",
      });
      setStartDate([new Date()]);
      setFromInput("");
      setToInput("");
      setVehicleList(false);
      setconform(false);
      toast.success("Booking successful!", {
        position: "top-center",
        autoClose: 3000,
      });

      // navigate("/successPage", { state: { id: bookingId } });
      navigate(`/successPage/${bookingId}`);
      window.location.reload()
    }
  };

  const [loading, setLoading] = useState(false);
  const handleConfirm = async (e) => {
    e.preventDefault();
    setLoading(true);
    await handleSubmit(); // call your submit logic
    setLoading(false);
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
    {
      label: "Duration",
      value: (() => {
        const durationSec = parseInt(duration);
        const hours = Math.floor(durationSec / 3600);
        const minutes = Math.floor((durationSec % 3600) / 60);
        return `${hours} hr ${minutes} min`;
      })(),
    },
    { label: "Driver Allowance", value: "₹ 400" },
    { label: "Permit Charges", value: "₹ 550" },
    {
      label: "Toll Charges (Approx)",
      value: `${tollCharge ? `₹ ${tollCharge}` : "applicable"}`,
    },
    { label: "Total", value: `₹ ${(totalKms * baseFair).toFixed(2)}` },
  ];

  return (
    <div className="min-h-screen  py-10 px-4">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="max-w-4xl mx-auto space-y-10"
      >
        {/* Heading */}
        <motion.h2
          custom={1}
          variants={fadeUp}
          className="text-4xl font-bold text-center text-[#ff1d58] drop-shadow-sm"
        >
          Confirm Your Booking
        </motion.h2>

        {/* Travel Plan */}
        <motion.div
          custom={2}
          variants={fadeUp}
          className="bg-white shadow-xl rounded-2xl p-6 border border-[#ffc0d1] space-y-4"
        >
          <h3 className="text-xl font-semibold text-[#ff1d58]">
            <MapPin className="inline w-5 h-5 mr-2 text-[#ff1d58]" />
            Your Travel Plan
          </h3>

          <div className="bg-[#fff0f5] p-4 rounded-lg text-[#4a1e2d] space-y-1">
            <p>
              <MapPin className="inline w-4 h-4 text-green-600 mr-1" />
              <strong>Pickup:</strong> {fromInput}
            </p>
            <p>
              <MapPin className="inline w-4 h-4 text-red-600 mr-1" />
              <strong>Drop:</strong> {toInput}
            </p>
          </div>

          <h3 className="text-xl font-semibold text-[#ff1d58]">
            <CarFront className="inline w-5 h-5 mr-2 text-[#ff1d58]" />
            Vehicle Information
          </h3>

          <div className="bg-[#fff0f5] p-4 rounded-lg text-[#4a1e2d] grid grid-cols-2 sm:grid-cols-3 gap-2">
            <p>
              <strong>Model:</strong> {selectedVehicle.type}
            </p>
            <p>
              <strong>Seats:</strong> {selectedVehicle.capacity}
            </p>
          </div>

          <h3 className="text-xl font-semibold text-[#ff1d58]">Fare Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {details.map((item, index) => (
              <motion.div
                key={index}
                custom={2.5 + index * 0.2}
                variants={fadeUp}
                className={`flex justify-between px-4 py-2 rounded-md ${
                  index === details.length - 1
                    ? "bg-[#ffc0d1] font-bold text-[#4a1e2d]"
                    : "bg-gray-50"
                }`}
              >
                <span>{item.label}</span>
                <span>{item.value}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Passenger Form */}
        <motion.form
          onSubmit={handleSubmit}
          custom={3}
          variants={fadeUp}
          className="bg-white shadow-xl rounded-2xl p-8 border border-[#ffc0d1] space-y-6"
        >
          <h3 className="text-xl font-semibold mb-4 text-[#ff1d58]">
            Passenger Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: "Name", name: "name", type: "text", icon: <User /> },
              { label: "Mobile", name: "mobile", type: "tel", icon: <Phone /> },
              { label: "Email", name: "email", type: "email", icon: <Mail /> },
              {
                label: "Pick-Up Time",
                name: "pickupTime",
                type: "time",
                icon: <Calendar />,
              },
            ].map((field, idx) => (
              <div key={idx}>
                <label htmlFor={field.name} className="block mb-1 font-medium">
                  {React.cloneElement(field.icon, {
                    className: "inline w-4 h-4 mr-1",
                  })}{" "}
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  id={field.name}
                  required
                  value={form[field.name]}
                  onChange={handleChange}
                  className="w-full border border-[#ff1d58] rounded-lg px-4 py-2 shadow-sm focus:ring-[#ff1d58]"
                />
              </div>
            ))}
          </div>

          <div className="text-center pt-6">
            <button
              type="submit"
              onClick={handleConfirm}
              className={`text-white text-lg px-8 py-3 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 ${
                loading
                  ? "bg-green-600 cursor-not-allowed"
                  : "bg-[#ff1d58] hover:bg-[#e0144d]"
              }`}
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                    ></path>
                  </svg>
                  <span>Confirming...</span>
                </>
              ) : (
                "Confirm Booking"
              )}
            </button>
          </div>
        </motion.form>

        {/* Info */}
        <motion.div
          custom={4}
          variants={fadeUp}
          className="text-center text-[#4a1e2d] mt-10"
        >
          <Info className="inline w-5 h-5 mr-2 text-[#ff1d58]" />
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
