import { BsArrowUp } from "react-icons/bs";
import { GoArrowSwitch } from "react-icons/go";
import useVehicleOptions from "../Hooks/useVehicleOptions";
import { useTrip } from "../Contexts/TripType";

const Fleets = () => {
  const { vehicles } = useVehicleOptions();
  const { vehiclePriceList } = useTrip();

  return (
    <div className="mt-16 flex flex-col items-center px-4 py-2">
      {/* header */}
      <h1 className="font-bold text-[#E43D12] text-xl sm:text-2xl text-center">
        Fleets and Tarrifs
      </h1>
      <p className="text-[#E43D12] mt-4 text-sm sm:text-base text-center">
        Uncover more ways we can elevate your experience!
      </p>

      {/* fleets */}
      <div className="w-full mt-12 p-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {vehicles.map((val, index) => {
          const veh = vehiclePriceList?.find(
            (vehicle) => vehicle.name.toLowerCase() === val.type.toLowerCase()
          );
          return (
            <div
              key={index}
              className="bg-white flex flex-col items-center p-4 border-2 shadow-md rounded-md"
            >
              {/* image */}
              <div className="w-full aspect-[2/1] bg-red-300 rounded-md">
                <img src={val.img} />
              </div>

              {/* seat allocation */}
              <div className="flex w-full h-12 justify-between items-center px-2 mt-2">
                <h1 className="font-bold text-sm sm:text-base">{val.type}</h1>
                <p className="text-xs sm:text-sm">{val.capacity}</p>
              </div>

              <div className="h-0.5 mt-2 bg-gray-300 w-full" />

              {/* description */}
              <p className="text-xs sm:text-sm text-center mt-2">
                {val.options.join(" / ")}
              </p>

              {/* trip details */}
              <div className="flex w-full flex-col sm:flex-row mt-4 justify-around items-center gap-4 sm:gap-0">
                <div className="min-w-max flex flex-col items-center gap-1">
                  <div className="flex items-center gap-1 text-sm sm:text-base">
                    <BsArrowUp />
                    <h1>One way trip</h1>
                  </div>
                  <h1 className="text-[#E43D12] font-bold text-sm sm:text-base">
                    ₹{veh?.onewaytrip}/km
                  </h1>
                </div>

                <div className="hidden sm:block h-full bg-gray-300 w-0.5" />

                <div className="min-w-max flex flex-col items-center gap-1">
                  <div className="flex items-center gap-1 text-sm sm:text-base">
                    <GoArrowSwitch className="rotate-[90deg]" />
                    <h1>Round trip</h1>
                  </div>
                  <h1 className="text-[#E43D12] font-bold text-sm sm:text-base">
                    ₹{veh?.roundtrip}/km
                  </h1>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Fleets;
