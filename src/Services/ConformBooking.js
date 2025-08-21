import axios from "axios";
import BASE_URL from "../Hooks/apiUrl";

const ConformBooking = async (bookingData) => {
  try {
    const response = await axios.post(
      // "http://localhost:5000/conform",
      "https://pallaku-backend.onrender.com/conform",
      bookingData
    );
    console.log(response);
    if (response.status !== 200) {
      throw new Error("Booking confirmation failed");
    }

    return response;
  } catch (error) {
    console.error("Booking error:", error.message);
    return null;
  }
};
export default ConformBooking;
