import { CheckCircle2 } from "lucide-react";
import { useEffect } from "react";
import axios from "axios";

export default function SuccessPage() {
  const tripDetails = {
    customer: "Karthi",
    phone: "+91 98765 43210",
    from: "Chennai",
    to: "Bangalore",
    baseKm: "214.47 km",
    baseFarePerKm: "₹ 11.00",
    totalBaseFare: "₹ 2354 (214.465 km × ₹11.00)",
    driverAllowance: "₹ 400",
    permitCharges: "₹ 550",
    tollCharges: "₹ 140",
    total: "₹ 2354",
    vehicle: "Sedan 4+1 Seater",
  };
  console.log("succespage");
  const getData = async () => {
    try {
      const response = await axios.post(
        // "http://localhost:5000/conform",
        "https://pallaku-backend.onrender.com/conform",
        bookingData
      );
      console.log(response);
      if (response.status !== 200) {
        throw new Error("Booking confirmation failed");
      }

      return response;
    } catch (error) {
      console.error("Booking error:", error.message);
      return null;
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-red-500 to-orange-400 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden">
        {/* Header */}
        <div className="bg-green-500 text-white p-6 flex flex-col items-center">
          <CheckCircle2 className="w-16 h-16 mb-3" />
          <h1 className="text-2xl font-bold">Booking Successful!</h1>
          <p className="text-sm opacity-90">Your trip has been confirmed 🎉</p>
        </div>

        {/* Customer Info */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Customer Details
          </h2>
          <p>
            <span className="font-medium">Name:</span> {tripDetails.customer}
          </p>
          <p>
            <span className="font-medium">Phone:</span> {tripDetails.phone}
          </p>
          <p>
            <span className="font-medium">From:</span> {tripDetails.from}
          </p>
          <p>
            <span className="font-medium">To:</span> {tripDetails.to}
          </p>
          <p>
            <span className="font-medium">Vehicle :</span> {tripDetails.vehicle}
          </p>
        </div>

        {/* Fare Breakdown */}
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">
            Fare Breakdown
          </h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Base km</span>
              <span>{tripDetails.baseKm}</span>
            </div>
            <div className="flex justify-between">
              <span>Base Fare Per Km</span>
              <span>{tripDetails.baseFarePerKm}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Base Fare</span>
              <span>{tripDetails.totalBaseFare}</span>
            </div>
            <div className="flex justify-between">
              <span>Driver allowance</span>
              <span>{tripDetails.driverAllowance}</span>
            </div>
            <div className="flex justify-between">
              <span>Permit Charges</span>
              <span>{tripDetails.permitCharges}</span>
            </div>
            <div className="flex justify-between">
              <span>Toll Charges (Approx)</span>
              <span>{tripDetails.tollCharges}</span>
            </div>
          </div>

          {/* Total */}
          <div className="mt-4 border-t border-gray-300 pt-3 flex justify-between text-lg font-bold text-gray-900">
            <span>Total</span>
            <span className="text-green-600">{tripDetails.total}</span>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="bg-gray-50 p-6 flex flex-col items-center">
          <p className="bg-gradient-to-r text-sm opacity-90 from-green-500 to-emerald-600 text-white px-6 py-2 rounded-full shadow-lg hover:scale-105 transition">
            Our team will contact you
          </p>
          <p className="text-xs text-gray-500 mt-3">
            Thank you for choosing us ❤️
          </p>
        </div>
      </div>
    </div>
  );
}
