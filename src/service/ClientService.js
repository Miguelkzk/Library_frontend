const BASE_URL = 'http://127.0.0.1:3000'
export const ClientService = {
  getClients: async () => {
    const response = await fetch(`${BASE_URL}/clients/`);
    const data = await response.json();
    return data;
  },
  saveClient: async (client) => {
    const response = await fetch(`${BASE_URL}/clients/`,
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(client)
      }

    );
    const data = await response.json();
    return data;
  },
  deleteClient: async (client) => {
    const response = await fetch(`${BASE_URL}/clients/${client.id}`,
      {
        method: "DELETE"
      }
    );
  },
  editClient: async (client) => {
    const response = await fetch(`${BASE_URL}/clients/${client.id}`,
      {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(client)
      }
    );
    const data = await response.json();
    return data;
  }, 
  searchClient: async(filter) => {
    const response = await fetch(`${BASE_URL}/clients/0/search_client?card_id=${filter}`);
    const data = await response.json();
    return data;
  }
}