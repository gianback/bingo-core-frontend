import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_URL_BACKEND;
const BASE_URL_SERVER = process.env.URL_BACKEND;
export const baseApi = axios.create({
  baseURL: BASE_URL,
});
export const baseApiServer = axios.create({
  baseURL: BASE_URL_SERVER,
});
