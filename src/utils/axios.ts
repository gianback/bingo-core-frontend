import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_URL_BACKEND;

export const baseApi = axios.create({
  baseURL: BASE_URL,
});
