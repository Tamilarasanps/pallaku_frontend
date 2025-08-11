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
    setEncodedPolyline,
    setApiKey,
    setDuration
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
        setTotalKms(()=>tripType==='onwaytrip' ? distance : distance*2);
        setVehicleList(true);
        setTollCharge(() =>
          tripType === "onewaytrip"
            ? data?.tolls[0]?.units / 2
            : data?.tolls[0]?.units || "applicable"
        );
        setEncodedPolyline(data?.polyline);
        setApiKey(data?.apiKey);
        setDuration(data?.duration);
      }
    }
  }, []);

  return (
    <section id="booking" className=" min-h-max w-[90%] bg-[#ffffff] z-50 lg:-mt-12 -mt-2 rounded-md shadow-md mx-auto flex flex-col justify-center items-center pb-12">
      <TripSwitcher />
      <div className="flex flex-col lg:flex-row lg:w-full">
        <FromTo />
        <DateAndTime />
      </div>

      <button
        className=" px-12 py-4 rounded-full text-white font-bold bg-[#ff1d58] mt-8"
        onClick={() => {
          handleSearch(fromInput, toInput);
        }}
      >
        Search
      </button>
    </section>
  );
};

export default Location;
