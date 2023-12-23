
import { BookService } from "../service/BookService";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import BookCopies from "../components/BookCopies";
import ViewButton from "../components/Buttons/ViewButton";
function BooksTable() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);


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



  return (
    <>
      {selectedBook ? (
        <BookCopies selectedBook={selectedBook} goBack={goBack} />
      ) : (
        <div className="container mt-3 ">
          <Table hover style={{ fontSize: '18px' }}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Price per day</th>
                <th>See copies</th>
              </tr>
            </thead>
            <tbody>
              {books.map(book => (
                <tr key={book.id}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.price_per_day}</td>
                  <td> <ViewButton onClick={() => showCopies(book)}>watch </ViewButton></td>
                </tr>
              ))}
            </tbody>
          </Table >
        </div>
      )}

    </>


  )
}
export default BooksTable;