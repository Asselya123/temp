import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;

const axiosApi = axios.create({
  baseURL: baseURL,
});

const axiosAuthorizedApi = axios.create({
  baseURL: baseURL,
});

axiosAuthorizedApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});

export { axiosApi, axiosAuthorizedApi };
