import {
  AxiosRequestHeaders,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { getCookie } from "../utils/cookies";
import { getValidationError } from "../utils/getValidationError";
import { baseApi } from "../utils/axios";
export const AxiosInterceptor = () => {
  const updateHeader = (request: InternalAxiosRequestConfig) => {
    const token = getCookie("token") as string;
    // console.log({token});

    const newHeaders = {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    request.headers = newHeaders as AxiosRequestHeaders;

    return request;
  };

  baseApi.interceptors.request.use((request) => {
    return updateHeader(request);
  });

  baseApi.interceptors.response.use(
    (response: AxiosResponse) => {
      return response.data;
    },
    (error) => {
      console.log("error", getValidationError(error));
      return Promise.reject(error);
    }
  );
};
