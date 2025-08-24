import axios from "axios";
import BASE_URL from "../Hooks/apiUrl";

const API_URL = "https://pallaku-backend.onrender.com/api/vehicles";

// const API_URL = "http://localhost:5000/api/vehicles";

export const getAllVehicles = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data; // { message: "cab booking is available now!" }
  } catch (error) {
    throw error;
  }
};
// ok