import { MdSecurity, MdAccessTime, MdPayments } from "react-icons/md";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { BiSupport } from "react-icons/bi";
import { motion } from "framer-motion";

const Experience = () => {
  const arr = [
    {
      header: "Uncompromised Safety & Reliability",
      body: "Experience secure journeys with expertly trained chauffeurs and impeccably maintained vehicles.",
      icon: <MdSecurity size={50} className="text-green-600" />,
    },
    {
      header: "On-Time Every Time",
      body: "Punctual pick-ups and drop-offs so you're never late.",
      icon: <MdAccessTime size={50} className="text-blue-600" />,
    },
    {
      header: "Transparent & Worthwhile Pricing",
      body: "Transparent Prices with no hidden surprises.",
      icon: <RiMoneyDollarCircleLine size={50} className="text-amber-500" />,
    },
    {
      header: "24/7 Availability",
      body: "Book a ride anytime, anywhere with our round-the-clock service.",
      icon: <BiSupport size={50} className="text-purple-600" />,
    },
    {
      header: "Diverse Payment Methods",
      body: "We accept multiple payment modes for your convenience.",
      icon: <MdPayments size={50} className="text-indigo-600" />,
    },
  ];

  return (
    <div className="mt-16 flex flex-col items-center px-4 py-2">
      {/* Header */}
      <h1 className="font-bold lg:text-2xl text-md text-[#E43D12] text-center">
        Experience the Difference
      </h1>
      <p className="text-[#E43D12] mt-4 text-center max-w-xl">
        Redefining travel with unmatched comfort, reliability, and services tailored to your needs.
      </p>

      {/* Icon Cards with animation */}
      <div className="w-full mt-12 p-4 flex flex-wrap gap-12 items-center justify-center">
        {arr.map((val, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
            className="w-72 h-72 bg-white flex flex-col justify-between items-center p-6 border-2 shadow-md rounded-xl text-center"
          >
            <h2 className="font-bold text-lg text-gray-800 mt-4">{val.header}</h2>
            <div className="mt-4 mb-4">{val.icon}</div>
            <p className="text-sm text-gray-500 mt-2 ">{val.body}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
