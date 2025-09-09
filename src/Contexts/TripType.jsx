import { createContext, useContext, useState } from "react";

const TripContext = createContext();

export const TripContextProvider = ({ children }) => {
  const [tripType, setTripType] = useState("onewaytrip");
  const [fromInput, setFromInput] = useState("tiruppur");
  const [toInput, setToInput] = useState("coimbatore");
  const [vehicleList, setVehicleList] = useState(false);
  const [totalKms, setTotalKms] = useState(null);
  const [vehiclePriceList, setVehiclePriceList] = useState(null);
  const [tollCharge, setTollCharge] = useState(null);
  const [conform, setconform] = useState(false);
  const [baseFair, setBaseFair] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [startDate, setStartDate] = useState([new Date()]);
  const [encodedPolyline, setEncodedPolyline] = useState(null);
  const [duration, setDuration] = useState(null);
  const [adminPhone, setAdminPhone] = useState(null);
  const [vehicles, setVehicles] = useState([]);
  const [permitCharges, setPermitCharges] = useState(0);
  const [minKm, setMinKm] = useState(null);
  const [driverAllowance, setDriverAllowance] = useState(null);

  return (
    <TripContext.Provider
      value={{
        tripType,
        setTripType,
        fromInput,
        setFromInput,
        toInput,
        setToInput,
        vehicleList,
        setVehicleList,
        vehiclePriceList,
        setVehiclePriceList,
        totalKms,
        setTotalKms,
        tollCharge,
        setTollCharge,
        setconform,
        conform,
        baseFair,
        setBaseFair,
        setSelectedVehicle,
        selectedVehicle,
        startDate,
        setStartDate,
        encodedPolyline,
        setEncodedPolyline,
        // permitCharges,
        // setPermitCharges,
        duration,
        setDuration,
        adminPhone,
        setAdminPhone,
        vehicles,
        setVehicles,
        permitCharges,
        setPermitCharges,
        minKm,
        setMinKm,
        driverAllowance,
        setDriverAllowance,
      }}
    >
      {children}
    </TripContext.Provider>
  );
};
// vn
export const useTrip = () => useContext(TripContext);
// ok
