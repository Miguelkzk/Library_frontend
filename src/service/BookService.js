const BASE_URL = 'http://127.0.0.1:3000'
export const BookService = {
  getBooks: async () => {
    const response = await fetch(`${BASE_URL}/books/`);
    const data = await response.json();
    return data;
  },
  getCopies: async (id) => {
    const response = await fetch(`${BASE_URL}/books/${id}/show_copies`);
    const data = await response.json();
    return data;
  },
  saveBook: async (book) => {
    const response = await fetch(`${BASE_URL}/books/`,
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(book)
      }
    );
    const data = await response.json();
    return data;
  },
  updateBook: async (book) => {
    const response = await fetch(`${BASE_URL}/books/${book.id}`,
      {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(book)
      }
    );
    const data = await response.json();
    return data;
  },
  deleteBook: async (book) => {
    const response = await fetch(`${BASE_URL}/books/${book.id}`,
      {
        method: "DELETE"
      }
    );
  },
  serchBook: async (filters) => {
    const response = await fetch(`${BASE_URL}/books/0/search_books?title=${filters.title}&author=${filters.author}`);
    const data = await response.json();
    return data;
  }

}


