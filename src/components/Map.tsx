import React, { FC } from "react";
import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import { Place } from "../common/types";

const containerStyle = {
  width: "100vw",
  height: "100vh",
};

type MapProps = {
  places: Place[];
  center: {
    lat: number;
    lng: number;
  };
};
const Map: FC<MapProps> = (props) => {
  const { places, center } = props;
  const isSelectedPlace = (place: Place) =>
    place.latitude === center.lat && place.longitude === center.lng;
  const handleMarkerClick = (place: Place) => {
    const element = document.getElementById(place.id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
      });
      element.style.border = "1px solid red";
      setTimeout(() => {
        element.style.border = "none";
      }, 1000);
    }
  };
  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY!}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
        {places.map((place) => (
          <Marker
            position={{ lat: place.latitude, lng: place.longitude }}
            label={isSelectedPlace(place) ? "Current" : null}
            title={place.name}
            onClick={() => handleMarkerClick(place)}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export { Map };
