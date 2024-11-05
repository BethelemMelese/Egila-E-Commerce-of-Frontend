// components/LocationPicker.js
import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "200px",
  borderRadius: "10px"
};

const LocationPicker = ({ onLocationSelect }: any) => {
  const [currentPosition, setCurrentPosition] = useState({ lat: 0, lng: 0 });
  const apiKey: any = process.env.CURRENT_LOCATION_API_KEY;

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: apiKey,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition({ lat: latitude, lng: longitude });
          onLocationSelect({ lat: latitude, lng: longitude });
        },
        (error) => console.error(error),
        { enableHighAccuracy: true }
      );
    }
  }, [onLocationSelect]);

  const handleMapClick = (event: any) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setCurrentPosition({ lat, lng });
    onLocationSelect({ lat, lng });
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={currentPosition}
      zoom={15}
      onClick={handleMapClick}
    >
      <Marker position={currentPosition} />
    </GoogleMap>
  );
};

export default LocationPicker;
