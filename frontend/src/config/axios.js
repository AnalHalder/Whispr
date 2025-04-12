import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api", // backend URL 
  withCredentials: true, // So cookies (JWT) are sent
});

export default api;