import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";
export function useTodayActivity() {
  const { isLoading, data: activity } = useQuery({
    queryKey: ["today-activity"],
    queryFn: () => getStaysTodayActivity(),
  });
  return { activity, isLoading };
}
