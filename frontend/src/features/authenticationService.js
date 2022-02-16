import axios from "axios";

const API_URL = "/api/users/";

// Register user
const register = async (user) => {
  const response = await axios.post(API_URL, user);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Logout user
const logout = async () => {
  localStorage.removeItem("user");
};

const authenticationService = {
  register,
  logout,
};

export default authenticationService;
