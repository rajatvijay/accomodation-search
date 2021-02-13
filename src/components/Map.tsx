import React, { FC } from "react";
import {
  LoadScript,
  GoogleMap,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { Place } from "../common/types";
import { Box, Text } from "@chakra-ui/react";
import { AreaSelector } from "./AreaSelector";

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
  onMarkerClick: (place: Place) => void;
  setFocusBounds: (bounds: google.maps.LatLngBounds | null) => void;
};
const Map: FC<MapProps> = (props) => {
  const { places, center, onMarkerClick, setFocusBounds } = props;
  const isSelectedPlace = (place: Place) =>
    place.latitude === center.lat && place.longitude === center.lng;
  const onRectangleComplete = (rectangle: google.maps.Rectangle | null) => {
    setFocusBounds(rectangle?.getBounds() || null);
  };
  return (
    <LoadScript
      libraries={["drawing"]}
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY!}
    >
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
        <AreaSelector onRectangleComplete={onRectangleComplete} />
        {places.map((place) => (
          <>
            <Marker
              position={{ lat: place.latitude, lng: place.longitude }}
              title={place.name}
              onClick={() => onMarkerClick(place)}
            />
            {isSelectedPlace(place) && (
              <InfoWindow
                position={{ lat: place.latitude, lng: place.longitude }}
              >
                <Box>
                  <Text>{place.name}</Text>
                </Box>
              </InfoWindow>
            )}
          </>
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export { Map };
