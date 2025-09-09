import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
// import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function SuccessPage() {
  const [bookingData, setBookingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // const location = useLocation();
  // const { id } = location.state || {};
  const { id } = useParams();

  // Format currency for INR
  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount || 0);

  useEffect(() => {
    if (!id) {
      setError("Missing booking ID. Please try again.");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Use env variable or fallback to localhost
        const API_BASE_URL =
          import.meta.env.VITE_API_BASE_URL ||
          "https://pallaku-backend.onrender.com";
          // import.meta.env.VITE_API_BASE_URL ||
          // "http://localhost:5000";

        const response = await axios.get(`${API_BASE_URL}/api/booking/${id}`);
        setBookingData(response.data);
        setError(null);
      } catch (error) {
        setError("Failed to load booking details. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    // ok
    fetchData();
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-500 via-red-500 to-orange-400 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 flex flex-col items-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-500 mb-4" />
          <p className="text-gray-600">Loading booking details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-500 via-red-500 to-orange-400 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 flex flex-col items-center">
          <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Oops!</h2>
          <p className="text-gray-600 text-center">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }
  console.log("bookingData : ", bookingData);

  // Main success page
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-red-500 to-orange-400 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden">
        {/* Header */}
        <div className="bg-green-500 text-white p-6 flex flex-col items-center">
          <a
            href="/"
            className="text-white mb-2 text-lg font-semibold hover:underline mt-2"
          >
            ← Back to Home
          </a>
          <CheckCircle2 className="w-16 h-16 mb-3" />
          <h1 className="text-2xl font-bold">Booking Successful!</h1>
          <p className="text-sm opacity-90">Your trip has been confirmed 🎉</p>
        </div>

        {/* Customer Info */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">
            Customer Details
          </h2>
          <div className="space-y-2">
            <InfoRow label="Name" value={bookingData?.name} />
            <InfoRow label="Phone" value={bookingData?.mobile} />
            <InfoRow label="From" value={bookingData?.from} />
            <InfoRow label="To" value={bookingData?.to} />
            <InfoRow
              label="Vehicle"
              value={`${bookingData?.vehicle?.type} (${bookingData?.vehicle?.capacity} seater)`}
            />
          </div>
        </div>

        {/* Fare Breakdown */}
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">
            Fare Breakdown
          </h2>
          <div className="space-y-2 text-sm">
            <InfoRow
              label="Total Distance"
              value={`${bookingData?.totalKms || 0} km`}
            />
            <InfoRow
              label="Base Fare Per Km"
              value={formatCurrency(bookingData?.baseFair)}
            />
            <InfoRow
              label="Total Base Fare"
              value={formatCurrency(bookingData?.totalFare)}
            />
            <InfoRow
              label="Driver Allowance"
              value={formatCurrency(bookingData?.driverAllowance)}
            />
            <InfoRow
              label="Permit Charges"
              value={formatCurrency(bookingData?.permitCharges)}
            />
            <InfoRow
              label="Toll Charges (Approx)"
              value={formatCurrency(bookingData?.tollCharge)}
            />
          </div>

          {/* Total */}
          <div className="mt-4 border-t-2 border-gray-200 pt-3 flex justify-between text-lg font-bold text-gray-900">
            <span>Total Amount</span>
            <span className="text-green-600">
              {formatCurrency(bookingData?.totalFare)}
            </span>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="bg-gray-50 p-6 flex flex-col items-center space-y-3">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-2 rounded-full shadow-lg">
            <p className="text-sm font-medium">
              Our team will contact you soon
            </p>
          </div>
          <p className="text-xs text-gray-500 text-center">
            Thank you for choosing us ❤️
          </p>
        </div>
      </div>
    </div>
  );
}

// Reusable component for displaying rows
function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between">
      <span className="font-medium text-gray-600">{label}:</span>
      <span className="text-gray-800">{value || "N/A"}</span>
    </div>
  );
}
