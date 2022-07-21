import axios from "axios";
import {apiBaseUrl} from "../config";

const client = axios.create({baseURL: apiBaseUrl});

client.interceptors.request.use((config) => {
  const idToken = localStorage.getItem("access_token");
  if (idToken) {
    config.headers.Authorization = `Bearer ${idToken}`;
  }

  return config;
});

client.interceptors.response.use(
  (response) => {
    if (response.status === 401) {
      window.location.reload();
    }

    return response;
  },
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("access_token");
      window.location.reload();
    }
    return Promise.reject(err);
  }
);
export {
  client
};