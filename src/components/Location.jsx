import { useState, useCallback } from "react";
import { toast } from "react-toastify";

import DateAndTime from "./Location/DateAndTime";
import FromTo from "./Location/FromTo";
import TripSwitcher from "./Location/TripSwitcher";
import { useTrip } from "../Contexts/TripType";
import { fetchGeocode } from "../Services/geocodeService.js";

const Location = ({isMapLoaded}) => {
  const {
    fromInput,
    toInput,
    setFromInput,
    setToInput,
    setVehicleList,
    setTotalKms,
    setTollCharge,
    tripType,
    setEncodedPolyline,
    setDuration,
    permitCharges,
    setPermitCharges,
  } = useTrip();

  const [loading, setLoading] = useState(false); // 🌀 Loading state
// ok
  const handleSearch = useCallback(
    async (fromInput, toInput) => {
      if (!fromInput || !toInput) {
        toast.error("Please select pick up and drop location", {
          position: "top-center",
          autoClose: 3000,
        });
        return;
      }

      try {
        setLoading(true); // Start loading
        const data = await fetchGeocode(fromInput, toInput);

        if (data === null) {
          toast.error(
            "Service not available. Please choose a different location",
            {
              position: "top-center",
              autoClose: 3000,
            }
          );
          return;
        }

        const distance = Number(data.distanceMeters) || "-";

        setTotalKms(() =>
          tripType === "onewaytrip" ? distance : distance * 2
        );

        setVehicleList(true);
        setTollCharge(() => {
          const toll = data?.tolls?.[0]?.units;

          if (toll === "" || toll == null) return "-"; // if empty or undefined
          return tripType === "onewaytrip"
            ? Number(toll) / 2
            : Number(toll) || "applicable";
        });

        setEncodedPolyline(data?.polyline);
        setDuration(data?.duration);
      } catch (error) {
        toast.error("Something went wrong. Please try again.", {
          position: "top-center",
          autoClose: 3000,
        });
      } finally {
        setLoading(false); // Stop loading
      }
    },
    [
      tripType,
      setTotalKms,
      setVehicleList,
      setTollCharge,
      setEncodedPolyline,
      setDuration,
    ]
  );

  return (
    <section
      id="booking"
      className="min-h-max w-[90%] bg-[#ffffff] z-50 lg:-mt-12 -mt-2 rounded-md shadow-md mx-auto flex flex-col justify-center items-center pb-12"
    >
      <TripSwitcher />
      <div className="flex flex-col lg:flex-row lg:w-full">
        <FromTo
          fromInput={fromInput}
          toInput={toInput}
          setFromInput={setFromInput}
          setToInput={setToInput}
          permitCharges={permitCharges}
          setPermitCharges={setPermitCharges}
          isMapLoaded={isMapLoaded}
        />
        <DateAndTime />
      </div>

      <button
        className={`px-12 py-4 rounded-full text-white font-bold mt-8 flex items-center justify-center gap-2 transition ${
          loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#ff1d58]"
        }`}
        onClick={() => handleSearch(fromInput, toInput)}
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
            <span>Searching...</span>
          </>
        ) : (
          "Search"
        )}
      </button>
    </section>
  );
};

export default Location;
