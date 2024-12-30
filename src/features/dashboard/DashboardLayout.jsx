import styled from "styled-components";
import { useRecentStays } from "./useRecentStays";
import Spinner from "../../ui/Spinner";
import { useRecentBookings } from "./useRecentBookings";
import Stats from "./stats";
import { useCabins } from "../cabins/useCabins";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;
function DashboardLayout() {
  const {bookings, isLoading} = useRecentBookings();
  const {stays, confirmedStays, isLoading : isLoadingStays, numDays} = useRecentStays();
  const {cabins , isLoading : isLoadingCabin} = useCabins();
  if(isLoading || isLoadingStays || isLoadingCabin) return <Spinner />
  return (
   <StyledDashboardLayout>
    <Stats bookings={bookings} confirmedStays={confirmedStays} numDays={numDays} cabinCount={cabins.length} />
    <div>Today's activity</div>
    <div>Chart stay durations</div>
    <div>Chart sales</div>
   </StyledDashboardLayout>
  )
}

export default DashboardLayout
