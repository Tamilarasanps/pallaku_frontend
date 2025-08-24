import React, { useState, useEffect } from "react";
import { GoogleMap, Polyline } from "@react-google-maps/api";
import { useTrip } from "../Contexts/TripType";

const containerStyle = {
  width: "100%",
  height: "50vh",
  border: "1px solid red",
  backgroundColor: "#eee",
};

const RouteMap = ({ isMapLoaded }) => {
  const { encodedPolyline } = useTrip();
  const [path, setPath] = useState([]);

  useEffect(() => {
    if (isMapLoaded && window.google?.maps?.geometry?.encoding && encodedPolyline) {
      const decodedPath = window.google.maps.geometry.encoding
        .decodePath(encodedPolyline)
        .map((latLng) => ({
          lat: latLng.lat(),
          lng: latLng.lng(),
        }));
      setPath(decodedPath);
    }
  }, [isMapLoaded, encodedPolyline]);

  const handleMapLoad = (map) => {
    if (path.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      path.forEach((coord) => bounds.extend(coord));
      map.fitBounds(bounds);
    }
  };

  if (!isMapLoaded) return <div>...loading</div>;
// ok
  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      zoom={12}
      center={path[0] || { lat: 0, lng: 0 }}
      onLoad={handleMapLoad}
    >
      {path.length > 0 && (
        <Polyline
          path={path}
          options={{ strokeColor: "#FF0000", strokeOpacity: 1.0, strokeWeight: 4 }}
        />
      )}
    </GoogleMap>
  );
};

export default RouteMap;
