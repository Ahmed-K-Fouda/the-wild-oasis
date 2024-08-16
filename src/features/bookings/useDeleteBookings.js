import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useDeleteBookings() {
  const queryClient = useQueryClient();
  const { mutate: deletingBooking, isLoading: isDeleteingBooking } =
    useMutation({
      mutationFn: deleteBooking,
      onSuccess: (data) => {
        toast.success(`Booking has been successfully delted`);
        queryClient.invalidateQueries({
          queryKey: ["bookings"],
        });
      },
      onError: (err) => toast.error(err.message),
    });
  return { deletingBooking, isDeleteingBooking };
}
