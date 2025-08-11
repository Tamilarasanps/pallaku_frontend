import { motion } from "framer-motion";

const FairDetails = ({ totalKms, baseFair, totalPrice, tollCharge, driverAllowance }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="mt-4 text-sm text-gray-700 border-t pt-3 px-4 sm:px-12 md:px-24"
    >
      <table className="w-full text-left">
        <thead>
          <tr className="text-gray-900 font-semibold">
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Price</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-4 py-1">Base km</td>
            <td className="px-4 py-1">{totalKms?.toFixed(2)} km</td>
          </tr>
          <tr>
            <td className="px-4 py-1">Base Fare Per Km</td>
            <td className="px-4 py-1">₹ {baseFair?.toFixed(2)}</td>
          </tr>
          <tr>
            <td className="px-4 py-1">Total Base Fare</td>
            <td className="px-4 py-1">
              ₹{totalPrice} ({totalKms} km × ₹{Number(baseFair).toFixed(2)})
            </td>
          </tr>
          <tr>
            <td className="px-4 py-1">Driver allowance</td>
            <td className="px-4 py-1">{driverAllowance}</td>
          </tr>
          <tr>
            <td className="px-4 py-1">Permit Charges</td>
            <td className="px-4 py-1">₹ 550</td>
          </tr>
          <tr>
            <td className="px-4 py-1">Toll Charges (Approx)</td>
            <td className="px-4 py-1">₹ {tollCharge}</td>
          </tr>
          <tr className="font-bold text-black">
            <td className="px-4 py-2">Total</td>
            <td className="px-4 py-2">₹ {totalPrice}</td>
          </tr>
        </tbody>
      </table>
    </motion.div>
  );
};

export default FairDetails;
