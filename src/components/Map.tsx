import React, { FC } from "react";
import {
  LoadScript,
  GoogleMap,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { Center, Place } from "../common/types";
import { Box, Text } from "@chakra-ui/react";

const containerStyle = {
  width: "100vw",
  height: "100vh",
};

type MapProps = {
  places: Place[];
  center: Center;
  onMarkerClick: (place: Place) => void;
};
const Map: FC<MapProps> = (props) => {
  const { places, center, onMarkerClick } = props;
  const isSelectedPlace = (place: Place) =>
    place.latitude === center.lat && place.longitude === center.lng;
  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY!}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
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
