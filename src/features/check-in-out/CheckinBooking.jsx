import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";
import CheckBox from "../../ui/CheckBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useBook } from "../bookings/useBook";
import { useEffect, useState } from "react";
import { gu } from "date-fns/locale";
import { format, set } from "date-fns";
import { useCheckin } from "./useCheckin";
import { formatCurrency } from "../../utils/helpers";
import { useSettings } from "../settings/useSettings";
const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const { settings, isLoading: isLoadingSettings } = useSettings();
  const { booking, isLoading } = useBook();
  useEffect(() => {
    setConfirmPaid(booking?.isPaid || false)
  }, [booking])
  const moveBack = useMoveBack();
  const { checkin, isCheckingIn } = useCheckin();

  if (isLoading || isLoadingSettings) return <Spinner />
  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const optionalBreakfastPrice = settings.breakfastPrice * numNights * numGuests;
  function handleCheckin() {
    if (!confirmPaid) return;
    if(addBreakfast) {
      checkin({bookingId,breakfast:{hasBreakfast:true,extrasPrice:optionalBreakfastPrice,totalPrice:totalPrice + optionalBreakfastPrice}})
    }else{

      checkin({bookingId,breakfast:{}})
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      {!hasBreakfast && (<Box>
        <CheckBox checked={addBreakfast}
          onChange={() => {
            setAddBreakfast((confirm) => !confirm)
            setConfirmPaid(false)
          }}
          id='breakfast'
          disabled={hasBreakfast || isCheckingIn}
        >
          I want to add breakfast for {formatCurrency(optionalBreakfastPrice)}.
        </CheckBox>
      </Box>)}
      <Box>
        <CheckBox checked={confirmPaid}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
          id='confirm'
          disabled={confirmPaid || isCheckingIn}
        >
          I confirm that I have full payment for {guests.fullName} with the price of {!addBreakfast ? formatCurrency(totalPrice) : `${formatCurrency(totalPrice + optionalBreakfastPrice)}`}.
        </CheckBox>
      </Box>
      <ButtonGroup>
        <Button disabled={!confirmPaid || isCheckingIn} onClick={handleCheckin}>Check in booking #{bookingId}</Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
