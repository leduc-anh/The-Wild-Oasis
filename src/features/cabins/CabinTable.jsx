
import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import { fi } from "date-fns/locale";


const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;
function CabinTable() {
  const [searchParams] = useSearchParams();
  const { isLoading, cabins } = useCabins();
  if (isLoading) return <Spinner />
  //Filter
  const filerValue = searchParams.get('discount') || 'all'
  let filteredCabins;
  if (filerValue === 'all') {
    filteredCabins = cabins;
  }
  if (filerValue === 'no-discount') {
    filteredCabins = cabins.filter(cabin => cabin.discount === 0)
  }
  if (filerValue === 'with-discount') {
    filteredCabins = cabins.filter(cabin => cabin.discount > 0)
  }
  //Sort
  const sortBy = searchParams.get('sortBy') || 'StartDate-asc'
  const [field, direction] = sortBy.split('-');
  const modifier = direction === 'asc' ? 1 : -1
  const sortedCabins = filteredCabins.sort((a, b) => 
    (a[field] - b[field]) * modifier
  ) ;
  if (!cabins.length) return <Empty resourceName="cabins" />
  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header >
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body data={sortedCabins} render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />} />
      </Table>
    </Menus>
  )
}

export default CabinTable
