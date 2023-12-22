import { useEffect, useState } from "react";
import { BookService } from "../service/BookService";
import { Table } from "react-bootstrap";

function BookCopies({ selectedBook, goBack }) {
  const [copies, setCopies] = useState([]);
  useEffect(() => {
    if (selectedBook) {
      fetchCopies(selectedBook.id);
    }
  }, [selectedBook]);

  const fetchCopies = async (id) => {
    try {
      const bookCopies = await BookService.getCopies(id);
      setCopies(bookCopies)
    } catch (error) {
      console.error("Error fetching book copies:", error);
    }
  };

  return (<>
    <div className="container mt-3 ">
      <h3>{selectedBook.title}</h3>
      <Table hover>
        <thead>
          <tr>
            <th>Copy id</th>
            <th>Status copy</th>
          </tr>
        </thead>
        <tbody>
          {copies.map(copy => (
            <tr key={copy.id}>
              <td>{copy.id_copy}</td>
              <td>{copy.copy_status}</td>
            </tr>
          ))}
        </tbody>
      </Table >
      <button onClick={goBack}>Go Back to Books</button>
    </div>
  </>)
}

export default BookCopies;
