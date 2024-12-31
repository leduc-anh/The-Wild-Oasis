import styled from "styled-components";
import { useRecentStays } from "./useRecentStays";
import Spinner from "../../ui/Spinner";
import { useRecentBookings } from "./useRecentBookings";
import Stats from "./stats";
import { useCabins } from "../cabins/useCabins";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";
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
    <TodayActivity stays={stays} />
    <DurationChart confirmedStays={confirmedStays} />
    <SalesChart bookings={bookings} numDays={numDays} />
   </StyledDashboardLayout>
  )
}

export default DashboardLayout
