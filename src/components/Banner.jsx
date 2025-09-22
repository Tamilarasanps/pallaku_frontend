import { motion } from "framer-motion";
import car from "../assets/travels.jpg";
import banner from "../assets/car.jpg";

const Banner = ({ adminPhone }) => {
  console.log("adminPhone :", adminPhone);
  return (
    <div
      className="relative w-full aspect-[21/9] max-h-[600px]  mx-auto overflow-hidden"
      // style={{ zIndex: -1 }}
    >
      <motion.img
        src={banner}
        alt="Banner"
        className="w-full h-full object-cover"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      />

      <div
        className="absolute inset-y-0 left-0 lg:w-fit w-[70%] space-y-3 
                bg-gradient-to-r from-black/70 via-black/40 to-transparent 
                "
      >
        <motion.div
          className="h-full flex items-center px-4 sm:px-8 md:px-16"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="lg:w-fit w-full space-y-3">
            <h1 className="text-lg md:text-3xl lg:text-5xl font-bold bg-gradient-to-r from-blue-400 via-green-400 to-purple-400 bg-[length:200%_200%] bg-clip-text text-transparent animate-[gradientShift_6s_ease_infinite]">
              Explore with Comfort
            </h1>
            <p className="text-xs md:text-md lg:text-xl text-gray-200 font-bold">
              Book your journey with trusted rides and great deals across all
              destinations.
            </p>
            <p className="text-white  lg:text-lg text-xs font-medium animate-bounce duration-1000 delay-300">
              📞 Call us now: <span className="font-bold ">{adminPhone}</span>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Banner;
