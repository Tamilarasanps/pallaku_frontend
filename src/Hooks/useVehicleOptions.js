// hooks/useVehicleOptions.js
import { useState, useEffect } from "react";

import etios from "../assets/etios.png";
import suv from "../assets/suv.png";
import sedan from "../assets/sedan.png";
import innova from "../assets/innova.png";

const vehicleData = [
  {
    type: "Sedan",
    capacity: "4 seater + 1 Driver",
    options: [
      "Any Sedan",
      "Maruti Dzire",
      "Honda Amaze",
      "Ford Aspire",
      "Tata Zest",
      "Etios",
      "Only Etios",
    ],
    img: sedan,

  },
  {
    type: "SUV",
    capacity: "4 seater + 1 Driver",
    options: [
      "Any SUV",
      "Ertiga",
      "Enjoy",
      "Xylo",
      "Tavera",
      "Marazzo",
      "Renault Lodgy",
      "Kia",
      "Carens or Similar",
    ],
    img: suv,
  },
  {
    type: "Etios",
    capacity: "7 seater + 1 Driver",
    options: ["Only Etios car Sedan Type"],
    img: etios,
  },
  {
    type: "Innova",
    capacity: "7 seater + 1 Driver",
    options: ["Only Innova"],
    img: innova,
  },
];

const useVehicleOptions = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    setVehicles(vehicleData);
  }, []);

  return { vehicles };
};

export default useVehicleOptions;
