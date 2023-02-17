import axios from "axios";

const API_URL = "/api/habits/";

const createHabit = async (habit, userToken) => {
  const config = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };

  const response = await axios.post(API_URL, habit, config);
  return response.data;
};

const editHabit = async (habit, userToken) => {
  const config = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };

  const response = await axios.put(API_URL + habit._id, habit, config);
  return response.data;
};

const deleteHabit = async (habit, userToken) => {
  const config = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };

  const response = await axios.delete(API_URL + habit._id, config);
  return response.data;
};

const getHabits = async (userToken) => {
  const config = {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};

const habitsService = {
  createHabit,
  editHabit,
  deleteHabit,
  getHabits,
};

export default habitsService;
