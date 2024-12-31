import styled from "styled-components";
import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useBook } from "./useBook";
import { useNavigate } from "react-router-dom";
import { HiArrowDownOnSquare, HiArrowUpOnSquare, HiTrash } from "react-icons/hi2";
import { useCheckout } from "../check-in-out/useCheckout";
import Modal from "../../ui/Modal";
import { useDeleteBooking } from "./useDeleteBooking";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Empty from "../../ui/Empty";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking, isLoading } = useBook();
  const { checkout, isCheckingOut } = useCheckout()
  const { deleteBooking, isDeleting } = useDeleteBooking()
  const navigate = useNavigate();
  const moveBack = useMoveBack();
  if (isLoading) return <Spinner />
  if (!booking) return <Empty resourceName="booking" />
  const { status, id } = booking
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{id}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      {status === "unconfirmed" &&
        <Button
          icon={<HiArrowDownOnSquare />}
          onClick={() => navigate(`/checkin/${id}`)}
        >Check in
        </Button>}
      {status === "checked-in" &&
        <Button
          icon={<HiArrowUpOnSquare />}
          onClick={() => checkout(id)}
          disabled={isCheckingOut}
        >Check out
        </Button>}
      <Modal>
        <Modal.Open opens="delete-booking">
          <Button variation="danger" icon={<HiTrash />}>
            Delete booking
          </Button>
        </Modal.Open>
        <Modal.Window name="delete-booking">
          <ConfirmDelete resourceName="bookings" 
          disabled={isDeleting} 
          onConfirm={() => deleteBooking(id, { onSettled: () => navigate(-1) })} />
        </Modal.Window>
      </Modal>
      <ButtonGroup>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
