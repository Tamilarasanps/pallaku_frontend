import { useEffect, useCallback, useRef } from "react";
import Header from "./components/Header";
import Banner from "./components/Banner";
import Location from "./components/Location";
import VehiclesList from "./components/VehiclesList";
import Experience from "./components/Experience";
import Fleets from "./components/Fleets";
import Footer from "./components/Footer";
import IndustryForm from "./components/IndustryForm";
import IndustryForm1 from "./components/IndustryForm1";
import IndustryForm2 from "./components/IndustryFrom2";
import IndustryForm3 from "./components/IndustryForm3";
import IndustryForm4 from "./components/IndustryForm4";
import { useTrip } from "./Contexts/TripType";
import getPriceList from "./Services/getPriceList";
import BookingConfirmation from "./components/Confirmation";
import { ToastContainer, toast, Slide, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { vehicleList, setVehiclePriceList, conform } = useTrip();
  const bookingRef = useRef(null);
  const vehicleRef = useRef(null);

  const fetchPrices = useCallback(async () => {
    const data = await getPriceList();
    setVehiclePriceList(data);
  }, []);

  useEffect(() => {
    fetchPrices();
  }, [fetchPrices]);

  useEffect(() => {
    if (conform && bookingRef.current) {
      bookingRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [conform]);

  useEffect(() => {
    if (vehicleList && vehicleRef.current) {
      vehicleRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [vehicleList]);

  return (
    <div className="h-full w-full">
      <ToastContainer
        transition={Slide} // or Zoom
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
      />

      <Header />
      <main>
        <div className="relative flex flex-col bg-[#F9EBE0]">
          <Banner />
          <Location />

          {vehicleList && (
            <div ref={vehicleRef}>
              <VehiclesList />
            </div>
          )}
          {conform && (
            <div ref={bookingRef}>
              <BookingConfirmation />
            </div>
          )}
          <Experience />
          <Fleets />
        </div>
      </main>
      <Footer />

      {/* <IndustryForm /> */}
      {/* <IndustryForm1 />
      <IndustryForm2 />
      <IndustryForm3 />
      <IndustryForm4 /> */}
    </div>
  );
}

export default App;
