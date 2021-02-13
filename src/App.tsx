import React, { useState } from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { SearchAccommodation } from "./components/SearchAccommodation";
import { Map } from "./components/Map";
import { Place } from "./common/types";
import { useAccommodationSearch } from "./hooks/useAccommodationSearch";

export const App = () => {
  const {
    status,
    search,
    places,
    error,
    totalPage,
    page,
    getNext,
    getPrevious,
  } = useAccommodationSearch();
  const [mapCenter, setMapCenter] = useState({
    lat: -3.745,
    lng: -38.523,
  });
  const [
    focusBounds,
    setFocusBounds,
  ] = useState<google.maps.LatLngBounds | null>(null);
  const handlePlaceClick = (place: Place) => {
    setMapCenter({
      lat: place.latitude,
      lng: place.longitude,
    });
  };
  const handleMarkerClick = (place: Place) => {
    setMapCenter({
      lat: place.latitude,
      lng: place.longitude,
    });

    // Scroll place into view from left panel
    const element = document.getElementById(place.id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
      });
      element.style.border = "2px solid red";
      element.style.borderRadius = "4px";
      setTimeout(() => {
        element.style.border = "none";
      }, 2000);
    }
  };
  const filteredPlaces = focusBounds
    ? places.filter((place) =>
        focusBounds.contains({ lat: place.latitude, lng: place.longitude })
      )
    : places;
  return (
    <ChakraProvider theme={theme}>
      <SearchAccommodation
        onPlaceClick={handlePlaceClick}
        status={status}
        onSearch={search}
        places={filteredPlaces}
        error={error}
        totalPages={totalPage}
        currentPage={page}
        getNext={getNext}
        getPrevious={getPrevious}
      />
      <Map
        onMarkerClick={handleMarkerClick}
        center={mapCenter}
        places={places}
        setFocusBounds={setFocusBounds}
      />
    </ChakraProvider>
  );
};
