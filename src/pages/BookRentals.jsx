import { useEffect, useState } from "react";
import { RetalService } from "../service/RentalService";
import { Table } from "react-bootstrap";
import ViewButton from "../components/Buttons/ViewButton";
import RentalDetails from "../components/RentalDetails";

function BookRentals() {
  const [rentals, setRentals] = useState([]);
  const [selectRental, setSelectedRental] = useState(null)

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
  }

  return (
    <>
      {selectRental ? (<RentalDetails selectRental={selectRental} goBack={goBack} />) : (
        <div className="container">
          <Table hover style={{ fontSize: '18px', marginTop: '2rem' }}>
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
    </>
  )
}
export default BookRentals;