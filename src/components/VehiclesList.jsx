import { useEffect, useState } from "react";
import { SlArrowDown } from "react-icons/sl";
import { IoPeopleSharp } from "react-icons/io5";
import { RiLuggageCartLine } from "react-icons/ri";
import { TbAirConditioning } from "react-icons/tb";
import FairDetails from "./VehiclesList/FairDetails";
import { useTrip } from "../Contexts/TripType";
import { motion, AnimatePresence } from "framer-motion";
import BASE_URL from "../Hooks/apiUrl";

const VehiclesList = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const {
    tripType,
    totalKms,
    tollCharge,
    setconform,
    setBaseFair,
    setSelectedVehicle,
    vehicles,
    startDate,
    permitCharges,
  } = useTrip();

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mt-8 flex flex-col items-center px-4 py-2">
      <h1 className="font-bold lg:text-2xl text-md text-[#ff1d58] text-center">
        Vehicles List
      </h1>
      <p className="text-[#4a1e2d] mt-4 text-center text-sm md:text-base">
        Select a perfect vehicle for our comfort journey
      </p>

      {vehicles.map((car, index) => {
        const price =
          tripType === "onewaytrip"
            ? car.oneWayPrice * totalKms.toFixed()
            : car.roundTripPrice * totalKms.toFixed() || "-";

        return (
          <motion.div
            key={car.type}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.1,
              duration: 0.5,
              ease: "easeOut",
            }}
            className="w-full flex flex-col items-center"
          >
            <div className="lg:w-[90%] w-full mt-4 flex flex-col lg:flex-row items-start lg:items-center px-4 py-6 bg-white gap-4 lg:gap-8 shadow rounded-md border border-[#ffc0d1]">
              {/* Image */}
              <div className="max-w-max lg:w-1/4 h-40 bg-[#fff0f5] mx-auto rounded-md overflow-hidden">
                <img
                  // src={`http://localhost:5000/image/${car.img}`}
                  src={`https://pallaku-backend.onrender.com/image/${car.img}`}
                  alt={car.type}
                  className="max-h-full"
                />
              </div>

              {/* Car Info */}
              <div className="w-full lg:w-2/4 flex flex-col justify-between">
                <h1 className="font-bold text-xl md:text-2xl text-[#ff1d58]">
                  {car.type}
                </h1>
                <p className="text-[#4a1e2d] mt-2">{car.options.join(" / ")}</p>

                <div
                  onClick={() => handleToggle(index)}
                  className="cursor-pointer h-12 w-48 border-2 border-[#ffc0d1] mt-4 flex items-center justify-around px-6 rounded-md text-[#ff1d58]"
                >
                  <p>More Details</p>
                  <SlArrowDown />
                </div>
              </div>

              {/* Icons */}
              <div className="w-full lg:w-1/6 flex flex-row lg:flex-col gap-4 justify-between lg:justify-center lg:items-start text-xs sm:text-sm md:text-base text-[#4a1e2d]">
                <div className="flex items-center gap-2">
                  <IoPeopleSharp size={20} />
                  <span>{car.capacity}</span>
                </div>
                <div className="flex items-center gap-2">
                  <RiLuggageCartLine size={20} />
                  <span>Luggages</span>
                </div>
                <div className="flex items-center gap-2">
                  <TbAirConditioning size={20} />
                  <span>AC</span>
                </div>
              </div>

              {/* Price & Select */}
              <div className="w-full lg:w-1/6 flex flex-col h-36 items-end lg:items-end justify-around mt-4 lg:mt-0">
                <h1 className="text-xl font-bold text-[#4a1e2d]">₹ {price}</h1>
                <button
                  onClick={() => {
                    setSelectedVehicle(car);
                    setBaseFair(
                      tripType === "onewaytrip"
                        ? car.oneWayPrice
                        : car.roundTripPrice
                    );
                    setconform(true);
                  }}
                  className="mt-2 bg-[#ff1d58] text-white py-2 px-6 rounded-md w-full lg:w-[186px] hover:bg-[#e0144d] transition-all"
                >
                  Select
                </button>
              </div>
            </div>

            {/* Fair Details Toggle */}
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="lg:w-[90%] w-full bg-white flex flex-col justify-center items-center py-4 border-t border-[#ffc0d1]"
                >
                  <div className="px-8 py-2 bg-[#ff1d58] rounded-full shadow">
                    <h1 className="text-white font-semibold">Fair Details</h1>
                  </div>
                  <FairDetails
                    totalKms={totalKms}
                    permitCharges={permitCharges}
                    baseFair={
                      tripType === "onewaytrip"
                        ? car.oneWayPrice
                        : car.roundTripPrice
                    }
                    totalPrice={price}
                    tollCharge={tollCharge}
                    driverAllowance={
                      startDate.length === 1
                        ? 400
                        : Math.max(
                            1,
                            Math.ceil(
                              (new Date(startDate[1]) -
                                new Date(startDate[0])) /
                                (1000 * 60 * 60 * 24)
                            )
                          ) * 400
                    }
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
};

export default VehiclesList;
