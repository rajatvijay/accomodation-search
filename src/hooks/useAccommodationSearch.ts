import { useCallback, useState } from "react";
import { getPlaces } from "../common/api";
import { useQuery } from "react-query";

export const useAccommodationSearch = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const { status, data, error, isFetching } = useQuery(
    ["search-places", query, page],
    () => getPlaces(query, page),
    {
      enabled: !!(query && page),
      refetchOnWindowFocus: false,
    }
  );
  const search = useCallback((query: string) => {
    setQuery(query);
    setPage(1);
  }, []);
  const getNext = useCallback(() => {
    setPage((page) => page + 1);
  }, []);
  const getPrevious = useCallback(() => {
    setPage((page) => page - 1);
  }, []);
  return {
    status: isFetching ? "loading" : status,
    query,
    page,
    search,
    getNext,
    getPrevious,
    places: data?.listings || [],
    error: (error as Error)?.message || "",
    totalPage: data?.totalPages || 0,
  };
};
