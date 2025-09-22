import { useEffect, useCallback, useRef } from "react";
import { useJsApiLoader } from "@react-google-maps/api";

import Header from "./components/Header";
import Banner from "./components/Banner";
import Location from "./components/Location";
import VehiclesList from "./components/VehiclesList";
import Experience from "./components/Experience";
import Fleets from "./components/Fleets";
import Footer from "./components/Footer";
import RouteMap from "./components/RouteMap";
import BookingConfirmation from "./components/Confirmation";
import AboutUs from "./components/AboutUs";

import { useTrip } from "./Contexts/TripType";
import getPriceList from "./Services/getPriceList";
import { getAllVehicles } from "./Services/getAllVehicles";
import Loader from "./Loader";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const mapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

function App() {
  const {
    vehicleList,
    setVehiclePriceList,
    conform,
    adminPhone,
    setAdminPhone,
    setVehicles,
  } = useTrip();

  const bookingRef = useRef(null);
  const vehicleRef = useRef(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: mapsApiKey,
    libraries: ["places", "geometry"],
  });

  const fetchPrices = useCallback(async () => {
    const data = await getPriceList();
    setVehiclePriceList(data.priceList);
    setAdminPhone(data.adminPhone);
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getAllVehicles();
        setVehicles(response);
      } catch (error) {
        console.error("Failed to fetch trips:");
      }
    };
    getData();
    fetchPrices();
  }, [fetchPrices]);

  useEffect(() => {
    if (conform && bookingRef?.current) {
      bookingRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [conform]);

  useEffect(() => {
    if (vehicleList && vehicleRef?.current) {
      vehicleRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [vehicleList]);

  if (loadError) return <div>Something went wrong</div>;
  if (!isLoaded) return null;
  return (
    <div className="h-full w-full overflow-hidden">
      <ToastContainer
        transition={Slide}
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        toastClassName={() =>
          "relative z-[9999] flex items-start space-x-3 max-w-sm w-full bg-white text-gray-800 rounded-lg shadow-lg py-4 px-4 border-l-4 border-white overflow-hidden"
        }
        bodyClassName={() =>
          "flex flex-col text-sm font-medium whitespace-pre-wrap break-words"
        }
        progressClassName="Toastify__progress-bar !left-0 !ml-0 !w-full"
        closeButton={false}
      />

      <Header adminPhone={adminPhone} />
       {/* Spacer div to prevent content from hiding behind fixed header */}
      <div className="h-16 " style={{ zIndex: 999 }}></div>
      <main>
        <div
          className="relative flex flex-col bg-[#f8f5ef] "
          
        >
          <Banner adminPhone={adminPhone}/>

          <Location isMapLoaded={isLoaded} />

          {vehicleList && (
            <div ref={vehicleRef}>
              <VehiclesList />
            </div>
          )}
          {conform && (
            <div ref={bookingRef}>
              <RouteMap isMapLoaded={isLoaded} />
              <BookingConfirmation />
            </div>
          )}
          <Experience />
          <AboutUs />
          <Fleets />
          <Footer />
        </div>
      </main>
    </div>
  );
}

export default App;
// ok
