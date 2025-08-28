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
import ConformBooking from "../Services/ConformBooking";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};
// ok
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
    driverAllowance,
    minKm,
  } = useTrip();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Returns numeric total fare
  const getTotalFare = () => {
    const kmsForFare = totalKms < minKm ? minKm : totalKms;
    return kmsForFare * baseFair;
  };

  // Returns numeric driver allowance
  const getDriverAllowance = () => {
    const days =
      tripType === "roundtrip" && startDate.length >= 2
        ? Math.max(
            1,
            Math.ceil(
              (new Date(startDate[1]) - new Date(startDate[0])) /
                (1000 * 3600 * 24)
            )
          )
        : 1;
    return driverAllowance * days;
  };
  console.log("getDriverAllowance", driverAllowance);

  // For UI display only
  const formatCurrency = (num) => `₹ ${num}`;

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    const bookingData = {
      ...form,
      from: fromInput,
      to: toInput,
      tripType,
      vehicle: selectedVehicle,
      totalKms,
      baseFair,
      tollCharge,
      totalFare: getTotalFare(), // numeric
      driverAllowance, // numeric
      permitCharges: 550,
      departureDate: startDate[0],
      arrivalDate: startDate[1] || "-",
    };
    console.log("hh");
    console.log("permitCharges", permitCharges);

    try {
      const data = await ConformBooking(bookingData);
      const bookingId = data?.data?.newBooking._id;

      if (data?.status === 200) {
        setForm({ name: "", mobile: "", email: "", pickupTime: "" });
        setStartDate([new Date()]);
        setFromInput("");
        setToInput("");
        setVehicleList(false);
        setconform(false);
        toast.success("Booking successful!", {
          position: "top-center",
          autoClose: 3000,
        });
        navigate(`/successPage/${bookingId}`);
        window.location.reload();
      }
    } catch (err) {
      toast.error("Booking failed. Please try again.", {
        position: "top-center",
        autoClose: 4000,
      });
    }
  };

  const handleConfirm = async (e) => {
    e.preventDefault();
    setLoading(true);

    const timeout = setTimeout(() => {
      setLoading(false);
      toast.error("Booking taking too long. Please try again.", {
        position: "top-center",
        autoClose: 4000,
      });
    }, 8000);

    try {
      await handleSubmit();
      clearTimeout(timeout);
      setLoading(false);
    } catch (err) {
      clearTimeout(timeout);
      setLoading(false);
    }
  };
  const driverAmount = Number(driverAllowance.replace(/[^0-9.]/g, ""));
  const details = [
    { label: "Base km", value: minKm },
    { label: "Total km", value: totalKms },
    { label: "Base Fare Per Km", value: formatCurrency(baseFair) },
    { label: "Total Base Fare", value: formatCurrency(getTotalFare()) },
    {
      label: "Duration",
      value: (() => {
        const durationSec = parseInt(duration);
        const hours = Math.floor(durationSec / 3600);
        const minutes = Math.floor((durationSec % 3600) / 60);
        return `${hours} hr ${minutes} min`;
      })(),
    },
    { label: "Driver Allowance", value: driverAllowance },
    { label: "Permit Charges", value: "₹ 550" },
    {
      label: "Toll Charges (Approx)",
      value: tollCharge ? formatCurrency(tollCharge) : "applicable",
    },
    {
      label: "Total",
      value: formatCurrency(
        Math.trunc(getTotalFare() + tollCharge + driverAmount)
      ),
    },
  ];

  return (
    <div className="min-h-screen py-10 px-4">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="max-w-4xl mx-auto space-y-10"
      >
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
            <MapPin className="inline w-5 h-5 mr-2 text-[#ff1d58]" /> Your
            Travel Plan
          </h3>
          <div className="bg-[#fff0f5] p-4 rounded-lg text-[#4a1e2d] space-y-1">
            <p>
              <MapPin className="inline w-4 h-4 text-green-600 mr-1" />{" "}
              <strong>Pickup:</strong> {fromInput}
            </p>
            <p>
              <MapPin className="inline w-4 h-4 text-red-600 mr-1" />{" "}
              <strong>Drop:</strong> {toInput}
            </p>
          </div>

          <h3 className="text-xl font-semibold text-[#ff1d58]">
            <CarFront className="inline w-5 h-5 mr-2 text-[#ff1d58]" /> Vehicle
            Information
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

            {/* Pick-Up Time Dropdown */}
            <div>
              <label htmlFor="pickupTime" className="block mb-1 font-medium">
                <Calendar className="inline w-4 h-4 mr-1" /> Pick-Up Time
              </label>
              <select
                name="pickupTime"
                id="pickupTime"
                required
                value={form.pickupTime}
                onChange={handleChange}
                className="w-full border border-[#ff1d58] rounded-lg px-4 py-2 shadow-sm focus:ring-[#ff1d58] outline-[#ff1d58]"
              >
                {Array.from({ length: 24 * 4 }).map((_, idx) => {
                  const hours = Math.floor(idx / 4);
                  const minutes = (idx % 4) * 15;
                  const timeStr = `${hours
                    .toString()
                    .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
                  return (
                    <option key={timeStr} value={timeStr}>
                      {timeStr}
                    </option>
                  );
                })}
              </select>
            </div>
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
