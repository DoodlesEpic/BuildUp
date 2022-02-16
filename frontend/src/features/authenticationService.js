const API_URL = "/api/users/";

// Register user
const register = async (user) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (response.json()) {
    localStorage.setItem("user", JSON.stringify(response.json()));
  }

  return response.json();
};

const authenticationService = {
  register,
};

export default authenticationService;
