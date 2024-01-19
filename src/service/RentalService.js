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
  }
}