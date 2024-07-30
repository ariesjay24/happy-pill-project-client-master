import axios from "axios";

const http = (options = {}) => {
  const token = localStorage.getItem("token");
  const headers = {
    Accept: "application/json",
    Authorization: token ? `Bearer ${token}` : undefined,
    ...options.headers,
  };

  return axios.create({
    baseURL: import.meta.env.VITE_API || "http://127.0.0.1:8000/api",
    headers,
    withCredentials: true,
  });
};

export default http;
