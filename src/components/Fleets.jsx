import { BsArrowUp } from "react-icons/bs";
import { GoArrowSwitch } from "react-icons/go";
import { useTrip } from "../Contexts/TripType";
import BASE_URL from "../Hooks/apiUrl";

const Fleets = () => {
  const { vehiclePriceList, vehicles } = useTrip();

  return (
    <section
      id="tariffs"
      className="mt-16 flex flex-col items-center px-4 py-2 bg-[#f8f5ef]"
    >
      {/* header */}
      <h1 className="font-bold text-[#ff1d58] text-xl sm:text-2xl text-center">
        Fleets and Tarrifs
      </h1>
      <p className="text-[#8b7355] mt-4 text-sm sm:text-base text-center">
        Uncover more ways we can elevate your experience!
      </p>

      {/* fleets */}
      <div className="w-full mt-12 p-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehicles.map((val, index) => {
          return (
            <div
              key={index}
              className="bg-white flex flex-col items-center p-4 border border-[#ff1d58] shadow-md rounded-lg transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg"
            >
              {/* image */}
              <div className="w-full aspect-[2/1] rounded-md overflow-hidden ">
                <img
                  // src={`http://localhost:5000/image/${val.img}`}
                  src={`https://pallaku-backend.onrender.com/image/${val.img}`}
                  alt={val.type}
                  className="object-cover w-full h-full"
                />
              </div>

              {/* seat allocation */}
              <div className="flex w-full h-12 justify-between items-center px-2 mt-2 text-[#3e3a35]">
                <h1 className="font-bold text-sm sm:text-base">{val.type}</h1>
                <p className="text-xs sm:text-sm">{val.capacity}</p>
              </div>

              <div className="h-0.5 mt-2 bg-[#ff1d58]/60 w-full" />

              {/* description */}
              <p className="text-xs sm:text-sm text-center mt-2 text-[#8b7355]">
                {val.options.join(" / ")}
              </p>

              {/* trip details */}
              <div className="flex w-full flex-col sm:flex-row mt-4 justify-around items-center gap-4 sm:gap-0">
                <div className="min-w-max flex flex-col items-center gap-1">
                  <div className="flex items-center gap-1 text-sm sm:text-base text-[#3e3a35]">
                    <BsArrowUp className="text-[#ff1d58]" />
                    <h1>One way trip</h1>
                  </div>
                  <h1 className="text-[#ff1d58] font-bold text-sm sm:text-base">
                    ₹{val?.oneWayPrice}/km
                  </h1>
                </div>

                <div className="hidden sm:block h-full bg-[#ff1d58]/50 w-0.5" />

                <div className="min-w-max flex flex-col items-center gap-1">
                  <div className="flex items-center gap-1 text-sm sm:text-base text-[#3e3a35]">
                    <GoArrowSwitch className="rotate-[90deg] text-[#ff1d58]" />
                    <h1>Round trip</h1>
                  </div>
                  <h1 className="text-[#ff1d58] font-bold text-sm sm:text-base">
                    ₹{val?.roundTripPrice}/km
                  </h1>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Fleets;
