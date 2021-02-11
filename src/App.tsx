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
  const handlePlaceClick = (place: Place) => {
    setMapCenter({
      lat: place.latitude,
      lng: place.longitude,
    });
  };
  return (
    <ChakraProvider theme={theme}>
      <SearchAccommodation
        onPlaceClick={handlePlaceClick}
        status={status}
        onSearch={search}
        places={places}
        error={error}
        totalPages={totalPage}
        currentPage={page}
        getNext={getNext}
        getPrevious={getPrevious}
      />
      <Map center={mapCenter} places={places} />
    </ChakraProvider>
  );
};
