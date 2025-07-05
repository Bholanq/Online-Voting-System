import axios from "axios";

const API = axios.create({
    baseURL: 'http://localhost:5001/api',
});

export const registerUser = (userData) => API.post('/auth/register',userData);

export const loginUser = async (loginData) => {
  try {
    const res = await API.post('/auth/login', loginData);
    return res.data;
  } catch (err) {
    throw err;
  }
};