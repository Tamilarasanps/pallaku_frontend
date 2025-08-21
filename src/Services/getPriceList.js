import axios from "axios";
import BASE_URL from "../Hooks/apiUrl";

// "http://localhost:5000/pricelist"

const getPriceList = async () => {
  try {
    const response = await axios.get("https://pallaku-backend.onrender.com/pricelist");   
    if (response.status !== 200) {
      throw new Error("Failed to fetch price list");
    }
    return response.data;
  } catch (error) {
    console.error("Price list fetch error:", error.message);
    return null;
  }
};

export default getPriceList;
