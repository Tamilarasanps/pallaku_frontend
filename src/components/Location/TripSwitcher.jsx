import { FaArrowRightArrowLeft, FaArrowRightLong } from "react-icons/fa6";
import { useTrip } from "../../Contexts/TripType";
import { motion } from "framer-motion";

const TripSwitcher = () => {
  const { tripType, setTripType, setVehicleList, setStartDate, setconform } =
    useTrip();

  return (
    <div className="h-12 w-full flex gap-4 items-center px-4 ">
      <div className="flex flex-col items-start">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => {
            setVehicleList(false);
            setconform(false);
            setTripType("onewaytrip");
            setStartDate((prev) => {
              const updated = [...prev];
              updated[1] = "";
              return updated;
            });
          }}
        >
          <FaArrowRightLong color="#ff1d58" />
          <p className="text-[#ff1d58]">One way</p>
        </div>
        {tripType === "onewaytrip" && <Line />}
      </div>
      <div className="flex flex-col items-start">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => {
            setVehicleList(false);
            setconform(false);
            setTripType("roundtrip");
          }}
        >
          <FaArrowRightArrowLeft color="#ff1d58" />
          <p className="text-[#ff1d58]">Round Trip</p>
        </div>
        {tripType === "roundtrip" && <Line />}
      </div>
    </div>
  );
};

const Line = () => (
  <motion.div
    layoutId="trip-underline"
    className="w-full h-0.5 mt-1 rounded-full"
    style={{ backgroundColor: "#ff1d58" }}
    transition={{ type: "spring", stiffness: 400, damping: 30 }}
  />
);

export default TripSwitcher;
