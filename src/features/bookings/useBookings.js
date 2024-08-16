import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constance";

export function useBookings() {
  const [searchParams] = useSearchParams();

  const queryClient = useQueryClient();

  // 1) FILTER
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  // 2) SORTBY
  const sortByRow = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRow.split("-");
  const sortBy = { field, direction };

  // 3) PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  // 4) QUERY
  const {
    data: result,
    error,
    isLoading,
  } = useQuery({
    queryFn: () => getAllBookings({ filter, sortBy, page }),
    queryKey: ["bookings", filter, sortBy, page],
  });

  const bookings = result?.data || [];
  const count = result?.count || 0;

  // 5) PRE-FETCHING
  const totalPage = Math.ceil(count / PAGE_SIZE);

  if (page < totalPage)
    queryClient.prefetchQuery({
      queryFn: () => getAllBookings({ filter, sortBy, page: page + 1 }),
      queryKey: ["bookings", filter, sortBy, page + 1],
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryFn: () => getAllBookings({ filter, sortBy, page: page - 1 }),
      queryKey: ["bookings", filter, sortBy, page - 1],
    });

  return { bookings, error, isLoading, count };
}
