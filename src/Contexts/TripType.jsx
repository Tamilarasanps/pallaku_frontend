import { createContext, useContext, useState } from "react";

const TripContext = createContext();

export const TripContextProvider = ({ children }) => {
  const [tripType, setTripType] = useState("onewaytrip");
  const [fromInput, setFromInput] = useState("");
  const [toInput, setToInput] = useState("");
  const [vehicleList, setVehicleList] = useState(false);
  const [totalKms, setTotalKms] = useState(null);
  const [vehiclePriceList, setVehiclePriceList] = useState(null);
  const [tollCharge, setTollCharge] = useState(null);
  const [conform, setconform] = useState(false);
  const [baseFair, setBaseFair] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [startDate, setStartDate] = useState([new Date()]);

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
      }}
    >
      {children}
    </TripContext.Provider>
  );
};

export const useTrip = () => useContext(TripContext);
