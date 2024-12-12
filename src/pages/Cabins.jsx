import { useEffect } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { getCabins } from "../services/apiCabins";

function Cabins() {
  useEffect(
    function () {
    getCabins().then(console.log)
  },[])
  return (
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      <p>TEST</p>
      <img src="https://pgpasurkskbtwrcnqyck.supabase.co/storage/v1/object/public/cabin-Images/cabin-001.jpg"></img>
    </Row>
  );
}

export default Cabins;
