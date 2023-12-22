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
  }

}

