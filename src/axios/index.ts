import config from "@/config";
import axios from "axios";
import qs from "qs";

export const instanceJsonPlaceholder = axios.create({
  baseURL: config.jsonPlaceholder.host,
  paramsSerializer,
});

instanceJsonPlaceholder.interceptors.request.use(requestHandler);
instanceJsonPlaceholder.interceptors.response.use(responseHandler, errorHandler);


function paramsSerializer(params: any) {
  return qs.stringify(params, { arrayFormat: "repeat" });
}

function requestHandler(request: any) {
  return request;
}

function responseHandler(response: any) {
  // success notify
  return response;
}

function errorHandler(error: any) {
  // error notify
  return error
}

