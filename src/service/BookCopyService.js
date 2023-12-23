const BASE_URL = 'http://127.0.0.1:3000'
export const BookCopyService = {
  updateCopy: async (copy) => {
    const response = await fetch(`${BASE_URL}/bookcopies/${copy.id}`,
      {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(copy)
      }
    );
    const data = await response.json();
    return data;
  }
}