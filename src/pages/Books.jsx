
import { BookService } from "../service/BookService";
import { useEffect, useState } from "react";
import { Button, Form, Table, FormControl } from "react-bootstrap";
import BookCopies from "../components/BookCopies";
import ViewButton from "../components/Buttons/ViewButton";
import GenericModal from "../components/GenericModal";
import EditButton from "../components/Buttons/EditButton";
import DeleteButton from "../components/Buttons/DeleteButton";
import ConfirmModal from "../components/ConfirmModal";
import SearchButton from "../components/Buttons/SeachButton";
import ClearButton from "../components/Buttons/ClearButton";
function BooksTable() {
  const [books, setBooks] = useState([]);
  const [titleModal, setTitleModal] = useState('')
  const [selectedBook, setSelectedBook] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isedit, setIsEdit] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [book, setBook] = useState({
    id: '',
    title: '',
    author: '',
    price_per_day: ''
  })

  const [filters, setFilters] = useState({
    title: '',
    author: '',
  })

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const booksdata = await BookService.getBooks()
    setBooks(booksdata);
  }

  const showCopies = (book) => {
    setSelectedBook(book);
  }

  const goBack = () => {
    setSelectedBook(null);
  }

  const handleOpenModal = () => {
    setTitleModal('New book')
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setIsEdit(false)
    clearBook();
  };

  const clearBook = () => {
    setBook({
      title: "",
      author: "",
      price_per_day: ""
    });

  }
  const handleSave = async () => {
    if (isedit) {
      BookService.updateBook(book)
    }
    else {
      BookService.saveBook(book)
    }

    handleCloseModal();
    await fetchBooks();
    setIsEdit(false)
    clearBook();
  };

  const handleEdit = (book) => {
    setTitleModal('Edit book')
    setBook({
      id: book.id,
      title: book.title,
      author: book.author,
      price_per_day: book.price_per_day
    });
    setShowModal(true);
    setIsEdit(true);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: value
    }));
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    clearBook();
  };

  const handleConfirmDelete = async () => {
    await BookService.deleteBook(book);
    await fetchBooks();
    setShowDeleteModal(false);

  };
  const handleDelete = (book) => {
    setBook(book)
    setShowDeleteModal(true)
  }
  const handleSeach = async () => {
    const filterbooks = await BookService.serchBook(filters)
    setBooks(filterbooks)

  }
  const clearTitle = () => {
    setFilters({ ...filters, title: '' })
  }
  const clearAuthor = () => {
    setFilters({ ...filters, author: '' })
  }

  const formContent = (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Title</Form.Label>
        <FormControl type="text"
          placeholder="Enter title of the book"
          name="title"
          value={book.title}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Author</Form.Label>
        <FormControl type="text"
          placeholder="Enter author of the book"
          name="author"
          value={book.author}
          onChange={handleInputChange} />
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Price per day</Form.Label>
        <FormControl type="number"
          name="price_per_day"
          placeholder="Price"
          value={book.price_per_day}
          onChange={handleInputChange} />
      </Form.Group>
    </Form>
  );

  return (
    <>

      {selectedBook ? (
        <BookCopies selectedBook={selectedBook} goBack={goBack} />
      ) : (
        <div className="container mt-4 ">
          <div className=" d-flex justify-content-between align-items-center">
            <Form className="d-flex position-relative">
              <FormControl
                type="text"
                placeholder="Title"
                className="mr-sm-2"
                value={filters.title}
                onChange={(e) =>
                  setFilters({ ...filters, title: e.target.value })
                }

              />
              {filters.title && (<ClearButton onClick={clearTitle} />)}
              <FormControl
                type="text"
                placeholder="Author"
                className="mr-sm-2"
                value={filters.author}
                onChange={(e) =>
                  setFilters({ ...filters, author: e.target.value })
                }
                style={{ marginLeft: '2rem' }}
              />
              {filters.author && (<ClearButton onClick={clearAuthor} />)}
              <SearchButton onClick={handleSeach} />
            </Form>
            <Button onClick={handleOpenModal} >Add book</Button>
          </div>
          <Table hover style={{ fontSize: '18px', marginTop: '2rem' }}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Price per day</th>
                <th>See copies</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {books.map(book => (
                <tr key={book.id}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.price_per_day}</td>
                  <td> <ViewButton onClick={() => showCopies(book)}>watch </ViewButton></td>
                  <td>
                    <EditButton variant="info" onClick={() => handleEdit(book)}>
                    </EditButton>
                  </td>
                  <td>
                    <DeleteButton onClick={() => handleDelete(book)}>
                      Delete
                    </DeleteButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table >
          <GenericModal
            show={showModal}
            handleClose={handleCloseModal}
            title={titleModal}
            formContent={formContent}
            onSave={handleSave}
          />
          <ConfirmModal
            show={showDeleteModal}
            handleClose={handleCancelDelete}
            title="Confirm delete"
            content={`Are you sure you want to delete the book: ${book.title} ?`}
            onConfirm={handleConfirmDelete}
            onCancel={handleCancelDelete}
          />

        </div>
      )}

    </>


  )
}
export default BooksTable;