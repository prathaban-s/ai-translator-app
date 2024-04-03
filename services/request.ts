import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { REQUEST_METHODS } from "@/constants";
const { GET, POST, PUT, DELETE, PATCH } = REQUEST_METHODS;

interface AxiosRequestPayload extends AxiosRequestConfig {
  payload?: Record<string, any>;
}

const axiosRequest = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BACKEND_URL,
  headers: {
    lang: "en",
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const request = async (
  obj: AxiosRequestPayload = {}
): Promise<AxiosResponse> => {
  const { url, method, params = {}, payload = {} } = obj;
  if (!url) throw new Error("URL is required");
  let res;
  switch (method) {
    case GET:
      res = await axiosRequest.get(url, {
        params: params,
      });
      break;
    case POST:
      res = await axiosRequest.post(url, payload);
      break;
    case PUT:
      res = await axiosRequest.put(url, payload, {
        params: params,
      });
      break;
    case DELETE:
      res = await axiosRequest.delete(url, {
        params: params,
      });
      break;
    case PATCH:
      res = await axiosRequest.patch(url, payload, {
        params: params,
      });
      break;
    default:
      throw new Error("Invalid method");
  }
  return res;
};

export { request };
