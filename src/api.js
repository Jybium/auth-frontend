import axios from "axios";

const base_url =
  "https://auth-jybium.netlify.app/api" ||
  "http://localhost:5137" ;


export const api = axios.create({
  baseURL: base_url,
});



export const apiPrivate = axios.create({
  baseURL: base_url,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});


export default api;
