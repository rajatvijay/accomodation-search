import { Place } from "./types";
import levenshtein from "js-levenshtein";

export const getPlaces = (
  query: string,
  page: number
): Promise<{ listings: Place[]; totalPages: number }> => {
  return fetch(`http://localhost:8080/search?q=${query}&page=${page}`)
    .then((response) => response.json())
    .then((response) => {
      return {
        totalPages: Math.ceil(
          response.data.results.resultCount / response.data.results.pageSize
        ),
        listings: response.data.results.listings
          .map((listing: any) => {
            const name =
              listing.propertyMetadata.propertyName ||
              listing.propertyMetadata.headline;
            return {
              id: listing.listingId,
              latitude: listing.geoCode.latitude,
              longitude: listing.geoCode.longitude,
              matchPercent: levenshtein(query, name), // TODO: Calculate this!
              name,
              noOfBathrooms:
                listing.bathrooms.full +
                listing.bathrooms.half +
                listing.bathrooms.toiletOnly,
              noOfBedrooms: listing.bedrooms,
              sleepCount: listing.sleeps,
              rating: listing.averageRating,
              averageReview: listing.reviewCount,
              image: listing.images[0]?.c9_uri || "",
            };
          })
          .sort((place1: Place, place2: Place) =>
            place1.matchPercent > place2.matchPercent ? -1 : 1
          ),
      };
    });
};
