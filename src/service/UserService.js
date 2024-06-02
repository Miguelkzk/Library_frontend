const BASE_URL = 'http://127.0.0.1:3000'
export const UserService = {
  login: async (user) => {
    const response = await fetch(`${BASE_URL}/login`,
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      }
    )
    const data = await response.json();
    return data;
  }
}