import React from "react";
import {
  Button,
  Center,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon, SearchIcon } from "@chakra-ui/icons";
import { FC } from "react";
import { Place } from "../common/types";
import debounce from "lodash.debounce";
import { QueryStatus } from "react-query";
import { AccommodationItem } from "./AccommodationItem";

type SearchAccommodationProps = {
  status: QueryStatus;
  places: any[];
  onSearch: (query: string) => void;
  onPlaceClick: (place: Place) => void;
  error: string;
  totalPages: number;
  currentPage: number;
  getNext: () => void;
  getPrevious: () => void;
};
export const SearchAccommodation: FC<SearchAccommodationProps> = (props) => {
  const {
    status,
    places,
    onSearch,
    onPlaceClick,
    error,
    totalPages,
    currentPage,
    getNext,
    getPrevious,
  } = props;
  const handleSearch: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;
    onSearch(value);
  };
  return (
    <Stack
      position="fixed"
      top="0"
      bottom="0"
      left="0"
      width="400px"
      background="white"
      zIndex="9999"
      borderRight="1px solid"
      borderColor="gray.200"
      boxShadow="lg"
      paddingX="2"
      paddingY="5"
      spacing="6"
    >
      <Stack spacing="0">
        <InputGroup>
          <InputLeftElement children={<SearchIcon color="gray.400" />} />
          <Input
            placeholder="Search by property ID or title"
            onChange={debounce(handleSearch, 1000)}
          />
          {status === "loading" && (
            <InputRightElement children={<Spinner color="green.500" />} />
          )}
        </InputGroup>
        {status === "error" && (
          <Text fontSize="xs" color="red.500">
            {error}
          </Text>
        )}
      </Stack>
      <Stack overflowY="auto" height="100%" spacing="4">
        <Center>
          {status === "success" && !places.length ? (
            <Text fontSize="sm" color="red.500">
              No places found!
            </Text>
          ) : null}
        </Center>
        {places.map((place) => (
          <AccommodationItem
            place={place}
            onClick={() => onPlaceClick(place)}
          />
        ))}
      </Stack>
      {places.length ? (
        <Stack direction="row" justifyContent="space-between" align="center">
          <Text fontSize="md">
            Page: {currentPage} of {totalPages}
          </Text>
          <Stack direction="row" spacing="2">
            {currentPage > 1 && currentPage < totalPages ? (
              <Button onClick={getPrevious}>
                <ArrowLeftIcon />
              </Button>
            ) : null}
            {currentPage < totalPages ? (
              <Button onClick={getNext}>
                <ArrowRightIcon />
              </Button>
            ) : null}
          </Stack>
        </Stack>
      ) : null}
    </Stack>
  );
};
