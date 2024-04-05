import { useEffect, useState } from "react";
import { BookService } from "../service/BookService";
import { Button, Table } from "react-bootstrap";
import CopyModal from "./ModalCopies";
import EditButton from "./Buttons/EditButton";
import DeleteButton from "./Buttons/DeleteButton";
import { BookCopyService } from "../service/BookCopyService";
import ConfirmModal from "./ConfirmModal";
import GoBack from "./Buttons/GoBack";
import { useAppState } from "./AppStateContext";
import Addbtn from "./Buttons/AddBtn";


function BookCopies({ selectedBook, goBack }) {
  const [copiesData, setCopiesData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCopy, setSelectedCopy] = useState(null);
  const [idcopy_selected, setIdcopy_selected] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { state, dispatch } = useAppState();
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
  const handleCreateCopy = async (copy) => {
    copy.book_id = selectedBook.id;
    await BookCopyService.createCopy(copy);
    await fetchCopies(selectedBook.id);
  }

  const handleDeleteCopy = (copy) => {
    setSelectedCopy(copy.id);
    setIdcopy_selected(copy.id_copy)
    setShowDeleteModal(true);
  }
  const handleConfirmDelete = async (id) => {
    id = selectedCopy;
    await BookCopyService.deleteCopy(id)
    setShowDeleteModal(false)
    await fetchCopies(selectedBook.id);

  };
  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setSelectedCopy(null);
  };
  useEffect(() => {
    if (selectedBook) {
      fetchCopies(selectedBook.id);
    }
  }, [selectedBook]);

  const fetchCopies = async (id) => {
    try {
      const copiesData = await BookService.getCopies(id);
      console.log(copiesData)
      setCopiesData(copiesData);
    } catch (error) {
      console.error("Error fetching book copies:", error);
    }
  };
  const addCopyData = (copy) => {
    const dataRental = ({
      id: copy.id,
      title: selectedBook.title,
      price_per_day: selectedBook.price_per_day,
      id_copy: copy.id_copy
    })
    console.log(dataRental)
    const { name, value } = dataRental;
    dispatch({
      type: 'SET_BOOK_DATA',
      payload: {
        ...state.booksData,
        copies: [...state.booksData.copies, dataRental],
      },
    });

  }

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
            <th >Edit</th>
            <th  >Add to rental</th>
            <th >Delete</th>
          </tr>
        </thead>
        <tbody>
          {copiesData.book_copies && copiesData.book_copies.map(copy => (
            <tr key={copy.id}>
              <td>{copy.id_copy}</td>
              <td>{copy.status}</td>
              <td>
                <EditButton variant="info" onClick={() => handleShowModal(copy)}>
                </EditButton>
              </td>
              <td>
                {copy.status != 'rented' ? (< Addbtn onClick={() => addCopyData(copy)}>Add to rental</Addbtn>) : (<p>Not available</p>)}

              </td>
              <td >
                <DeleteButton onClick={() => handleDeleteCopy(copy)}>
                  Delete
                </DeleteButton>
              </td>

            </tr>
          ))}
        </tbody>
      </Table >
      <div className="d-flex justify-content-center align-items-center">
        <GoBack onClick={goBack}></GoBack>
      </div>
      <ConfirmModal
        show={showDeleteModal}
        handleClose={handleCancelDelete}
        title="Confirm delete"
        content={`Are you sure you want to delete the copy with id: ${idcopy_selected}?`}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
      <CopyModal
        show={showModal}
        handleClose={handleCloseModal}
        handleSave={handleSaveCopy}
        handleCreate={handleCreateCopy}
        copy={selectedCopy}
      />
    </div >
  );
}

export default BookCopies;
