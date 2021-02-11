import React from "react";
import { Container, Image, Stack, Text } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { FC } from "react";
import { Place } from "../common/types";

export const AccommodationItem: FC<{ place: Place; onClick: () => void }> = (
  props
) => {
  const {
    matchPercent,
    name,
    noOfBathrooms,
    noOfBedrooms,
    sleepCount,
    rating,
    averageReview,
    image,
    id,
  } = props.place;
  return (
    <Stack id={id} direction="row" spacing="4" onClick={props.onClick}>
      <Image src={image} width="100px" borderRadius="4px" />
      <Stack>
        <Stack spacing="1">
          <Text
            color={matchPercent >= 75 ? "green" : "yellow.500"}
            fontSize="xs"
          >
            {matchPercent}% match
          </Text>
          <Stack spacing="0">
            <Container padding="0" textOverflow="ellipsis" noOfLines={1}>
              <Text fontSize="md">{name}</Text>
            </Container>
            <Text fontSize="sm">
              <>{noOfBathrooms ? `${noOfBathrooms}br. ` : null}</>
              <>{noOfBedrooms ? `${noOfBedrooms}ba. ` : null}</>
              Sleeps {sleepCount}
            </Text>
          </Stack>
        </Stack>
        <Stack direction="row" align="center">
          <Stack direction="row">
            {Array.from({ length: rating }).map((rating) => (
              <StarIcon />
            ))}
          </Stack>
          <Text>({averageReview})</Text>
        </Stack>
      </Stack>
    </Stack>
  );
};
