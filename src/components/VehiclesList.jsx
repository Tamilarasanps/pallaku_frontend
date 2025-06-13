import { useState } from "react";
import { SlArrowDown } from "react-icons/sl";
import { IoPeopleSharp } from "react-icons/io5";
import { RiLuggageCartLine } from "react-icons/ri";
import { TbAirConditioning } from "react-icons/tb";
import FairDetails from "./VehiclesList/FairDetails";
import useVehicleOptions from "../Hooks/useVehicleOptions";
import { useTrip } from "../Contexts/TripType";
import { motion, AnimatePresence } from "framer-motion";

const VehiclesList = () => {
  const { vehicles } = useVehicleOptions();
  const [openIndex, setOpenIndex] = useState(null);
  const { vehiclePriceList, tripType, totalKms, tollCharge,setconform ,setBaseFair,setSelectedVehicle} = useTrip();

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mt-8 flex flex-col items-center px-4 py-2">
      <h1 className="font-bold lg:text-2xl text-md text-[#E43D12] text-center">
        Vehicles List
      </h1>
      <p className="text-[#E43D12] mt-4 text-center text-sm md:text-base">
        One-way trip you can take 1 hr halt and enjoy tea breaks between the journey
      </p>

      {vehicles.map((car, index) => {
        const veh = vehiclePriceList?.find(
          (vehicle) => vehicle.name.toLowerCase() === car.type.toLowerCase()
        );

        const price = (veh?.[tripType?.toLowerCase()] * totalKms).toFixed() || "-";

        return (
          <motion.div
            key={car.type}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
            className="w-full flex flex-col items-center"
          >
            <div className="lg:w-[90%] w-full mt-4 flex flex-col lg:flex-row items-start lg:items-center px-4 py-6 bg-white gap-4 lg:gap-8 shadow rounded-md">
              {/* 1. Image */}
              <div className="max-w-max lg:w-1/4 h-40 bg-gray-100 mx-auto rounded-md overflow-hidden">
                <img
                  src={car.img || "/default.png"}
                  alt={car.type}
                  className="max-h-full"
                />
              </div>

              {/* 2. Car Info + Toggle */}
              <div className="w-full lg:w-2/4 flex flex-col justify-between">
                <h1 className="font-bold text-xl md:text-2xl text-[#244855]">
                  {car.type}
                </h1>
                <p className="text-[#60492C] mt-2">{car.options.join(" / ")}</p>

                <div
                  onClick={() => handleToggle(index)}
                  className="cursor-pointer h-12 w-48 border-2 border-gray-300 mt-4 flex items-center justify-around px-6 rounded-md"
                >
                  <p>More Details</p>
                  <SlArrowDown />
                </div>
              </div>

              {/* 3. Icons */}
              <div className="w-full lg:w-1/6 flex flex-row lg:flex-col gap-4 justify-between lg:justify-center lg:items-start text-xs sm:text-sm md:text-base">
                <div className="flex items-center gap-2 text-gray-500">
                  <IoPeopleSharp size={20} />
                  <span>{car.capacity}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <RiLuggageCartLine size={20} />
                  <span>Luggages</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <TbAirConditioning size={20} />
                  <span>AC</span>
                </div>
              </div>

              {/* 4. Price and Button */}
              <div className="w-full lg:w-1/6 flex flex-col h-36 items-end lg:items-end justify-around mt-4 lg:mt-0">
                <h1 className="text-xl font-bold">₹ {price}</h1>
                <button onClick={()=>{
                  setSelectedVehicle(car)
                  setBaseFair(veh?.[tripType?.toLowerCase()])
                  setconform(true)}
                  } className="mt-2 bg-[#EFB11D] text-white py-2 px-6 rounded-md w-full lg:w-[186px]">
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
                  className="lg:w-[90%] w-full bg-white flex flex-col justify-center items-center py-4"
                >
                  <div className="px-8 py-4 bg-[#EFB11D] rounded-full">
                    <h1 className="text-white">Fair Details</h1>
                  </div>
                  <FairDetails
                    totalKms={totalKms}
                    baseFair={veh?.[tripType?.toLowerCase()]}
                    totalPrice={price}
                    tollCharge={tollCharge}
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
