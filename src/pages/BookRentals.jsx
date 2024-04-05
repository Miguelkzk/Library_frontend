import { useEffect, useState } from "react";
import { RetalService } from "../service/RentalService";
import { Button, Form, FormControl, Table } from "react-bootstrap";
import ViewButton from "../components/Buttons/ViewButton";
import RentalDetails from "../components/RentalDetails";
import NewRental from "../components/NewRental";
import { useLocation } from "react-router-dom";
import SearchButton from "../components/Buttons/SeachButton";
import ClearButton from "../components/Buttons/ClearButton";

function BookRentals() {
  const [rentals, setRentals] = useState([]);
  const [selectRental, setSelectedRental] = useState(null)
  const [New, setNew] = useState(false);
  const location = useLocation();
  const [filter, setFilter] = useState('');
  const [error, setError] = useState(false)

  useEffect(() => {
    fetchRentals();
  }, []);


  useEffect(() => {
    if (location.state && location.state.New) {
      setNew(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state]);


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
    fetchRentals();
  }
  const handleChange = (e) => {
    const { value } = e.target;
    if (value.trim() !== '') {
      setFilter(value);
    }
  }
  const searchRental = async () => {
    if (filter != '') {
      const data = await RetalService.searchRental(filter)
      if (data != null) {
        console.log(data)
        const arraydata = [data]
        setRentals(arraydata)
      }
      else {
        setError(true)

      }
    }
  }
  const clearFilter = () => {
    setFilter('')
    fetchRentals()
    setError(false)
  }

  return (
    <>
      {New ? (<NewRental goBack={goBack} />) : (<>
        {selectRental ? (<RentalDetails selectRental={selectRental} goBack={goBack} />) : (
          <div className="container mt-3">
            <Button onClick={() => setNew(true)}>New rental</Button>
            <div className="d-flex justify-content-center align-items-center">
              <Form style={{ width: '40%' }}>
                <FormControl
                  type="text"
                  placeholder="Insert Rental id"
                  value={filter}
                  onChange={handleChange}
                />
              </Form>
              {filter && (<ClearButton onClick={clearFilter} />)}
              <SearchButton onClick={searchRental} />
            </div>
            {error ? (<p style={{ fontSize: '30px', color: 'red', fontWeight: "bold" }}>No rental with ID: "{filter}" found </p>) : (
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
            )}
          </div>

        )}
      </>)}
    </>
  )
}
export default BookRentals;