import axios from "axios";

// const API_URL =
  // "https://8o289dk2s0.execute-api.ap-south-1.amazonaws.com/default/my-backend-api"; // Adjust port if needed
const API_URL = "http://localhost:5000/api/vehicles"; // Adjust port if needed

export const getAllVehicles = async () => {
  const response = await axios.get(API_URL);

  return response.data;
};
