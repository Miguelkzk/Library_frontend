const BASE_URL = 'http://127.0.0.1:3000'
export const RetalService = {
  getRentals: async () => {
    const response = await fetch(`${BASE_URL}/bookrentals/`);
    const data = await response.json();
    return data;
  },
  getInfo: async (id) => {
    const response = await fetch(`${BASE_URL}/bookrentals/${id}/info_rental`);
    const data = await response.json();
    return data;
  },
  searchRental: async (filter) => {
    const response = await fetch(`${BASE_URL}/bookrentals/0/search_rental?rent_id=${filter}`);
    const data = await response.json();
    return data;
  },
  saveRental: async (dataRental) => {
    console.log(dataRental);
    const response = await fetch(`${BASE_URL}/bookrentals/`,
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataRental)
      });
    const data = await response.json();
    return data;
  },
  changeStatusRental: async (book_rental) => {
    var rental = {
      book_rental
    }
    const response = await fetch(`${BASE_URL}/bookrentals/${book_rental.id}`,
      {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(rental)
      }
    );
    const data = await response.json();
    return data;
  }
}