import { useEffect, useState } from "react";
import { BookService } from "../service/BookService";
import { Button, Table } from "react-bootstrap";
import CopyModal from "./ModalCopies";
import EditButton from "./Buttons/EditButton";
import DeleteButton from "./Buttons/DeleteButton";
import { BookCopyService } from "../service/BookCopyService";


function BookCopies({ selectedBook, goBack }) {
  const [copiesData, setCopiesData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCopy, setSelectedCopy] = useState(null);

  const handleShowModal = (copy) => {
    setSelectedCopy(copy);
    setShowModal(true);
  }
  const handleCloseModal = () => {
    setSelectedCopy(null);
    setShowModal(false);
  };
  const handleSaveCopy = async (copy) => {
    await BookCopyService.updateCopy(copy);
    await fetchCopies(selectedBook.id);

  };
  const handleDeleteCopy = () => {
    console.log("delete")
  }

  useEffect(() => {
    if (selectedBook) {
      fetchCopies(selectedBook.id);
    }
  }, [selectedBook]);

  const fetchCopies = async (id) => {
    try {
      const copiesData = await BookService.getCopies(id);
      setCopiesData(copiesData);
    } catch (error) {
      console.error("Error fetching book copies:", error);
    }
  };

  return (
    <div className="container mt-3 ">
      <h3>{selectedBook.title}</h3>
      <div className="d-flex justify-content-between align-items-center">
        <span>
          <p className="mb-0">Free Copies: {copiesData.free}</p>
          <p className="mb-0">Rented Copies: {copiesData.rented}</p>
        </span>
        <Button variant="primary" onClick={() => handleShowModal(null)}>
          Add Copy
        </Button>
      </div>
      <Table hover style={{ fontSize: '18px', marginTop: '1rem' }}>
        <thead>
          <tr>
            <th>Copy id</th>
            <th>Status copy</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {copiesData.book_copies && copiesData.book_copies.map(copy => (
            <tr key={copy.id}>
              <td>{copy.id_copy}</td>
              <td>{copy.copy_status}</td>
              <td>
                <EditButton variant="info" onClick={() => handleShowModal(copy)}>
                </EditButton>
              </td>
              <td>
                <DeleteButton onClick={() => handleDeleteCopy(copy.id)}>
                  Delete
                </DeleteButton>
              </td>

            </tr>
          ))}
        </tbody>
      </Table>
      <div className="d-flex justify-content-center align-items-center">
        <Button variant="primary" onClick={goBack}>Go Back to Books</Button>
      </div>
      <CopyModal
        show={showModal}
        handleClose={handleCloseModal}
        handleSave={handleSaveCopy}
        copy={selectedCopy}
      />
    </div>
  );
}

export default BookCopies;
