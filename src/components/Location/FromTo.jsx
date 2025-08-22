import React, { useRef, useState, useEffect } from "react";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import { toast } from "react-toastify";

const libraries = ["places"];
const mapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;


export default function FromTo({
  fromInput,
  toInput,
  setFromInput,
  setToInput,
  permitCharges,
  setPermitCharges,
}) {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: mapsApiKey, // replace with actual key
    libraries,
  });

  const fromRef = useRef(null);
  const toRef = useRef(null);

  const [fromState, setFromState] = useState("");
  const [toState, setToState] = useState("");
  const [noResults, setNoResults] = useState(false);
  // Extract state from place object
  const getStateFromPlace = (place) => {
    if (!place || !place.address_components) return "";
    const stateComp = place.address_components.find((c) =>
      c.types.includes("administrative_area_level_1")
    );
    return stateComp ? stateComp.long_name : "";
  };

  // Check states and update permit charges
  useEffect(() => {
    if (fromState && toState) {
      if (fromState !== toState) {
        setPermitCharges(550); // apply permit charges
      } else {
        setPermitCharges(0); // no permit charges
      }
    }
  }, [fromState, toState, setPermitCharges]);

  // When user selects from dropdown
  const handleFromPlaceChanged = () => {
    const place = fromRef.current?.getPlace();
    if (place && place.place_id) {
      setNoResults(false);
      setFromInput(place.formatted_address || place.name || "");
      setFromState(getStateFromPlace(place));
    }
  };

  // When user selects from dropdown
  const handleToPlaceChanged = () => {
    const place = toRef.current?.getPlace();
    if (place && place.place_id) {
      setNoResults(false);
      setToInput(place.formatted_address || place.name || "");
      setToState(getStateFromPlace(place));
    }
  };

  // If user clicks outside without selecting → take first suggestion
  const handleBlur = (value, setFn, label, setStateFn) => {
    if (!value) return;

    const service = new window.google.maps.places.AutocompleteService();
    service.getPlacePredictions(
      { input: value, componentRestrictions: { country: "in" } },
      (predictions, status) => {
        if (
          status === window.google.maps.places.PlacesServiceStatus.OK &&
          predictions &&
          predictions.length > 0
        ) {
          const placesService = new window.google.maps.places.PlacesService(
            document.createElement("div")
          );
          placesService.getDetails(
            { placeId: predictions[0].place_id },
            (place, detailsStatus) => {
              if (
                detailsStatus ===
                  window.google.maps.places.PlacesServiceStatus.OK &&
                place
              ) {
                setFn(place.formatted_address || predictions[0].description);
                setStateFn(getStateFromPlace(place));
              }
            }
          );
        } else {
          toast.error(`No valid ${label} found`);
          setNoResults(true);
        }
      }
    );
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
        <Autocomplete
          onLoad={(autocomplete) => (fromRef.current = autocomplete)}
          onPlaceChanged={handleFromPlaceChanged}
          options={{
            componentRestrictions: { country: "in" },
          }}
        >
          <input
            type="text"
            value={fromInput}
            onChange={(e) => setFromInput(e.target.value)}
            onBlur={(e) =>
              handleBlur(e.target.value, setFromInput, "From", setFromState)
            }
            className="px-4 w-full h-12 border-2 border-gray-400 rounded-md outline-none focus:border-[#ff1d58]"
            placeholder="Enter starting location"
          />
        </Autocomplete>
      </div>

      {/* To Input */}
      <div className="relative md:w-96 w-[90%]">
        <label className="absolute -top-3 left-2 bg-white px-1 text-sm font-semibold text-[#ff1d58]">
          To
        </label>
        <Autocomplete
          onLoad={(autocomplete) => (toRef.current = autocomplete)}
          onPlaceChanged={handleToPlaceChanged}
          options={{
            componentRestrictions: { country: "in" },
          }}
        >
          <input
            type="text"
            value={toInput}
            onChange={(e) => setToInput(e.target.value)}
            onBlur={(e) =>
              handleBlur(e.target.value, setToInput, "To", setToState)
            }
            className="px-4 w-full h-12 border-2 border-gray-400 rounded-md outline-none focus:border-[#ff1d58]"
            placeholder="Enter destination"
          />
        </Autocomplete>
      </div>

      {/* Permit Charges Info */}
      {/* <p className="text-gray-700 font-semibold mt-4">
        Permit Charges:{" "}
        <span className="text-[#ff1d58]">₹ {permitCharges}</span>
      </p> */}

      {/* No results message */}
      {noResults && (
        <p className="text-red-500 text-sm mt-2">
          🚫 Sorry, no suggestions found. Try a different location.
        </p>
      )}
    </div>
  );
}
