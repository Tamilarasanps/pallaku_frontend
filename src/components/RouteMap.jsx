import React, { useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Polyline,
} from "@react-google-maps/api";
import { useTrip } from "../Contexts/TripType";

const containerStyle = {
  width: "100%",
  height: "50vh", // Optional: reduce from full screen
};

const RouteMap = () => {
  const { encodedPolyline, apiKey } = useTrip();
  const [path, setPath] = useState([]);

  const handleMapLoad = (map) => {
    if (!window.google?.maps?.geometry?.encoding || !encodedPolyline) return;

    const decodedPath = window.google.maps.geometry.encoding
      .decodePath(encodedPolyline)
      .map((latLng) => ({
        lat: latLng.lat(),
        lng: latLng.lng(),
      }));

    setPath(decodedPath);

    const bounds = new window.google.maps.LatLngBounds();
    decodedPath.forEach((coord) => bounds.extend(coord));
    map.fitBounds(bounds);
  };

  const polylineOptions = {
    strokeColor: "#FF0000",
    strokeOpacity: 1.0,
    strokeWeight: 4,
  };

  return (
    <LoadScript googleMapsApiKey={apiKey} libraries={["geometry"]}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        zoom={12}
        center={{ lat: 0, lng: 0 }}
        onLoad={handleMapLoad}
      >
        {path.length > 0 && <Polyline path={path} options={polylineOptions} />}
      </GoogleMap>
    </LoadScript>
  );
};

export default RouteMap;
