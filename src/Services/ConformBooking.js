import axios from "axios";

const ConformBooking = async (bookingData) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/conform",
      // "https://pallaku-backend.onrender.com/conform",
      bookingData
    );
    // console.log('response :', response)
    if (response.status !== 200) {
      throw new Error("Booking confirmation failed");
    }

    return response;
  } catch (error) {
    return null;
  }
};
export default ConformBooking;
// ok