import { useEffect, useState } from "react";
import { RetalService } from "../service/RentalService";
import { Button, Table } from "react-bootstrap";
import ViewButton from "../components/Buttons/ViewButton";
import RentalDetails from "../components/RentalDetails";
import NewRental from "../components/NewRental";

function BookRentals() {
  const [rentals, setRentals] = useState([]);
  const [selectRental, setSelectedRental] = useState(null)
  const [New, setNew] = useState(false);

  useEffect(() => {
    fetchRentals();
  }, []);

  const fetchRentals = async () => {
    const rentalData = await RetalService.getRentals()
    setRentals(rentalData)
  }

  const showDetails = (rental) => {
    setSelectedRental(rental)

  }
  const goBack = () => {
    setSelectedRental(null)
    setNew(false);
  }

  return (
    <>
      {New ? (<NewRental goBack={goBack} />) : (<>
        {selectRental ? (<RentalDetails selectRental={selectRental} goBack={goBack} />) : (
          <div className="container mt-3">
            <Button onClick={() => setNew(true)}>New rental</Button>
            <Table hover style={{ fontSize: '18px', marginTop: '1rem' }}>
              <thead>
                <tr>
                  <th>Rental id</th>
                  <th>Status</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {rentals.map(rental => (
                  <tr key={rental.id}>
                    <td>{rental.rent_id}</td>
                    <td>{rental.status_rented}</td>
                    <td> <ViewButton onClick={() => showDetails(rental)} /></td>
                  </tr>
                ))}
              </tbody>
            </Table >
          </div>
        )}
      </>)}
    </>
  )
}
export default BookRentals;