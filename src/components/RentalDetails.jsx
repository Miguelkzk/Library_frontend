import { useEffect, useState } from "react";
import GoBack from "./Buttons/GoBack";
import { RetalService } from "../service/RentalService";

function formatDate(isoDate) {
  const options = { day: "numeric", month: "numeric", year: "numeric" };
  return new Date(isoDate).toLocaleDateString(undefined, options);
}

function RentalDetails({ selectRental, goBack }) {
  const [info, setInfo] = useState();

  useEffect(() => {
    fetchInfo();
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

  return (
    <>
      <div className="container mt-3">
        {info && (
          <>
            <h2>Rental id: {selectRental.rent_id}</h2>
            <p>Rented at: {formatDate(selectRental.rented_at)}</p>
            <p>Expire at: {formatDate(selectRental.expire_at)}</p>
            <p>Status: {selectRental.status_rented}</p>
            <p>Client: {info.info_client.name} {info.info_client.lastname}, id card: {info.info_client.card_id}</p>
            <p>Books</p>
            <ul>
              {info.info_book.map((book) => (
                <li key={book.id_copy}>{book.title}, copy id: {book.id_copy}</li>
              ))}
            </ul>
          </>
        )}
        <GoBack onClick={goBack} />
      </div>
    </>
  );
} export default RentalDetails;