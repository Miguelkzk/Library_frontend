import { useEffect, useState } from "react";
import GoBack from "./Buttons/GoBack";
import { RetalService } from "../service/RentalService";
import { Button } from "react-bootstrap";

function formatDate(isoDate) {
  const options = { day: "numeric", month: "numeric", year: "numeric" };
  return new Date(isoDate).toLocaleDateString(undefined, options);
}

function RentalDetails({ selectRental, goBack }) {
  const [info, setInfo] = useState();
  const [price, setPrice] = useState();
  const [status, setStatus] = useState();

  useEffect(() => {
    fetchInfo();
    setStatus(selectRental.status_rented)
  }, [selectRental]);
  const fetchInfo = async () => {
    try {
      const id = selectRental.id;
      const dataInfo = await RetalService.getInfo(id);
      setInfo(dataInfo);
    } catch (error) {
      console.error("Error fetching rental info:", error);
    }
  };
  const CalculatePrice = () => {
    if (info) {
      var rentedAt = new Date(selectRental.rented_at);
      var expireAt = new Date(selectRental.expire_at);
      var time = (expireAt - rentedAt) / (1000 * 60 * 60 * 24)
      Math.round(time)
      var totalprice = 0;
      var price_per_day = 0;
      info.info_book.map((data) => (
        price_per_day = (data.price_per_day),
        totalprice += (price_per_day * time)
      ))
      setPrice(totalprice);
    }
  }
  useEffect(() => {
    if (info) {
      CalculatePrice();
    }
  }, [info]);

  const handleEdit = async () => {
    try {
      var book_rental = {
        id: selectRental.id,
        status_rented: 0
      }
      await RetalService.changeStatusRental(book_rental);
      setStatus('completed')
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <>
      <div className="container mt-3">
        {info && (
          <>
            <h2>Rental id: {selectRental.rent_id}</h2>
            <p>Rented at: {formatDate(selectRental.rented_at)}</p>
            <p>Expire at: {formatDate(selectRental.expire_at)}</p>
            <p>Status: {status}</p>
            <p>Client: {info.info_client.name} {info.info_client.lastname}, id card: {info.info_client.card_id}</p>
            <p>Books</p>
            <ul>
              {info.info_book.map((book) => (
                <li key={book.id_copy}>{book.title}, copy id: {book.id_copy}, price per day: {book.price_per_day}</li>
              ))}
            </ul>
            <p>Price of rental: {price}</p>
            <div style={{ marginBottom: '1rem' }}>
              {status != 'completed' ? (<Button onClick={handleEdit}>Mark as completed</Button>) : ('')}
            </div>

          </>
        )}
        <GoBack onClick={goBack} />
      </div>
    </>
  );
} export default RentalDetails;