import React, { useRef } from "react";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import { toast } from "react-toastify";

const libraries = ["places"];

export default function FromTo({ onSelectFrom, onSelectTo }) {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "",
    libraries,
  });

  const fromRef = useRef(null);
  const toRef = useRef(null);

  const handleFromPlaceChanged = () => {
    const place = fromRef.current.getPlace();
    if (place && place.place_id) {
      onSelectFrom(place);
    } else {
      toast.error("Unable to select 'From' location");
    }
  };

  const handleToPlaceChanged = () => {
    const place = toRef.current.getPlace();
    if (place && place.place_id) {
      onSelectTo(place);
    } else {
      toast.error("Unable to select 'To' location");
    }
  };

  if (!isLoaded) return <div>Loading...</div>;
  if (loadError) return <div>Error loading maps</div>;

  return (
    <div className="w-full flex flex-col items-center gap-6 mt-8 py-6">
      <h1 className="lg:text-xl sm:text-md font-bold text-[#ff1d58]">
        Tell me boss where should we go
      </h1>

      {/* From Input */}
      <div className="relative md:w-96 w-[90%]">
        <label className="absolute -top-3 left-2 bg-white px-1 text-sm font-semibold text-[#ff1d58]">
          From
        </label>
        <Autocomplete onPlaceChanged={handleFromPlaceChanged}>
          <input
            type="text"
            className="px-4 w-full h-12 border-2 border-gray-400 rounded-md outline-none"
            placeholder="Enter starting location"
            ref={fromRef}
          />
        </Autocomplete>
      </div>

      {/* To Input */}
      <div className="relative md:w-96 w-[90%]">
        <label className="absolute -top-3 left-2 bg-white px-1 text-sm font-semibold text-[#ff1d58]">
          To
        </label>
        <Autocomplete onPlaceChanged={handleToPlaceChanged}>
          <input
            type="text"
            className="px-4 w-full h-12 border-2 border-gray-400 rounded-md outline-none"
            placeholder="Enter destination"
            ref={toRef}
          />
        </Autocomplete>
      </div>
    </div>
  );
}
