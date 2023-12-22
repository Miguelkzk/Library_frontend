
import { BookService } from "../service/BookService";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import BookCopies from "../components/BookCopies";
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
          <Table hover>
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
                  <td><button onClick={() => showCopies(book)}>watch</button></td>
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