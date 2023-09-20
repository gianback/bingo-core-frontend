import axios from "axios";

const BASE_URL = import.meta.env.VITE_URL_BACKEND;

export const baseApi = axios.create({
  baseURL: BASE_URL,
});
