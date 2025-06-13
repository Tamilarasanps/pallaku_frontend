import DateAndTime from "./Location/DateAndTime";
import FromTo from "./Location/FromTo";
import TripSwitcher from "./Location/TripSwitcher";
import { useTrip } from "../Contexts/TripType";
import { fetchGeocode } from "../Services/geocodeService.js";
import { useCallback } from "react";
import { toast } from "react-toastify";

const Location = () => {
  const {
    fromInput,
    toInput,
    setVehicleList,
    setTotalKms,
    setTollCharge,
    tripType,
  } = useTrip();

  const handleSearch = useCallback(async (fromInput, toInput) => {
    if (!fromInput || !toInput) {
      toast.error("please select pick up and drop location", {
        position: "top-center",
        autoClose: 3000,
      });
    } else {
      const data = await fetchGeocode(fromInput, toInput);
      if (data === null) {
        toast.error("service not available. Please choose different location", {
          position: "top-center",
          autoClose: 3000,
        });
      }
      if (data) {
        const distance = Number(data.distanceMeters) || "-";
        setTotalKms(distance);
        setVehicleList(true);
        setTollCharge(() =>
          tripType === "onewaytrip"
            ? data?.tolls[0]?.units / 2
            : data?.tolls[0]?.units || "applicable"
        );
      }
    }
  }, []);

  return (
    <div className=" min-h-max w-[90%] bg-white -mt-12 rounded-md shadow-md mx-auto flex flex-col justify-center items-center pb-12">
      <TripSwitcher />
      <div className="flex flex-col lg:flex-row lg:w-full">
        <FromTo />
        <DateAndTime />
      </div>

      <button
        className=" px-12 py-4 rounded-full text-white font-bold bg-[#E43D12] mt-8"
        onClick={() => {
          handleSearch(fromInput, toInput);
        }}
      >
        Search
      </button>
    </div>
  );
};

export default Location;
