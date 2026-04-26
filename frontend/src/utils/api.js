import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// attach token
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});


export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/fetchAllTasks`);
    return response.data;
  } catch (error) {
    console.error("Error fetching notes", error);
    return [];
  }
};

export default API;