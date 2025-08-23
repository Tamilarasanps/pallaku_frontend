import { BsArrowUp } from "react-icons/bs";
import { GoArrowSwitch } from "react-icons/go";
import { useTrip } from "../Contexts/TripType";
import BASE_URL from "../Hooks/apiUrl";

const Fleets = () => {
  const { vehiclePriceList, vehicles } = useTrip();

  // Loading state handling
  if (!vehicles || vehicles.length === 0) {
    return (
      <section
        id="tariffs"
        className="mt-16 flex flex-col items-center px-4 py-2 bg-[#f8f5ef] min-h-[400px] justify-center"
      >
        <div className="text-[#8b7355] text-center">
          <p>Loading fleets...</p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="tariffs"
      className="mt-16 flex flex-col items-center px-4 py-2 bg-[#f8f5ef]"
    >
      {/* Header */}
      <div className="text-center max-w-2xl">
        <h1 className="font-bold text-[#ff1d58] text-xl sm:text-2xl">
          Fleets and Tariffs
        </h1>
        <p className="text-[#8b7355] mt-4 text-sm sm:text-base">
          Uncover more ways we can elevate your experience!
        </p>
      </div>

      {/* Fleets Grid */}
      <div className="w-full max-w-7xl mt-12 p-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehicles.map((vehicle, index) => (
          <VehicleCard key={vehicle.id || index} vehicle={vehicle} />
        ))}
      </div>
    </section>
  );
};

// Separate component for better maintainability
const VehicleCard = ({ vehicle }) => {
  const getImageUrl = (imageName) => {
    return `https://pallaku-backend.onrender.com/image/${imageName}`;
  };

  const handleImageError = (e) => {
    // Fallback to placeholder image
    e.target.src = "/placeholder-vehicle.jpg";
    e.target.alt = "Vehicle image unavailable";
  };

  return (
    <article
      className="bg-white flex flex-col items-center p-4 border border-[#ff1d58] shadow-md rounded-lg 
                 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:border-[#ff1d58]/80
                 focus-within:outline-none focus-within:ring-2 focus-within:ring-[#ff1d58]/50"
      role="article"
      aria-labelledby={`vehicle-${vehicle.type}`}
    >
      {/* Vehicle Image */}
      <div className="w-full aspect-[2/1] rounded-md overflow-hidden bg-gray-100">
        <img
          src={getImageUrl(vehicle.img)}
          alt={`${vehicle.type} - ${vehicle.capacity} seating capacity`}
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
          onError={handleImageError}
          loading="lazy"
        />
      </div>

      {/* Vehicle Info Header */}
      <div className="flex w-full h-12 justify-between items-center px-2 mt-2 text-[#3e3a35]">
        <h2
          id={`vehicle-${vehicle.type}`}
          className="font-bold text-sm sm:text-base"
        >
          {vehicle.type}
        </h2>
        <p
          className="text-xs sm:text-sm font-medium"
          aria-label="Seating capacity"
        >
          {vehicle.capacity}
        </p>
      </div>

      {/* Divider */}
      <div className="h-0.5 mt-2 bg-[#ff1d58]/60 w-full" />

      {/* Vehicle Features */}
      <div className="mt-2 text-center">
        <p className="text-xs sm:text-sm text-[#8b7355]">
          {Array.isArray(vehicle.options)
            ? vehicle.options.join(" • ")
            : vehicle.options}
        </p>
      </div>

      {/* Pricing Information */}
      <div className="flex w-full flex-col sm:flex-row mt-4 justify-around items-center gap-4 sm:gap-0">
        {/* One Way Trip */}
        <div className="min-w-max flex flex-col items-center gap-1">
          <div className="flex items-center gap-1 text-sm sm:text-base text-[#3e3a35]">
            <BsArrowUp className="text-[#ff1d58]" aria-hidden="true" />
            <span>One way trip</span>
          </div>
          <p className="text-[#ff1d58] font-bold text-sm sm:text-base">
            ₹{vehicle?.oneWayPrice || "N/A"}/km
          </p>
        </div>

        {/* Divider - Hidden on mobile */}
        <div className="hidden sm:block h-8 bg-[#ff1d58]/50 w-0.5" />

        {/* Round Trip */}
        <div className="min-w-max flex flex-col items-center gap-1">
          <div className="flex items-center gap-1 text-sm sm:text-base text-[#3e3a35]">
            <GoArrowSwitch
              className="rotate-90 text-[#ff1d58]"
              aria-hidden="true"
            />
            <span>Round trip</span>
          </div>
          <p className="text-[#ff1d58] font-bold text-sm sm:text-base">
            ₹{vehicle?.roundTripPrice || "N/A"}/km
          </p>
        </div>
      </div>
    </article>
  );
};

export default Fleets;
