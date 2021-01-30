import axios, { AxiosRequestConfig } from 'axios';
// import API_URL from "./config";
import JwtService from './jwt';

// import axios from 'axios'
// import store from '../store'

const baseURL: string = process.env.VUE_APP_API_BASE_URL?.toString() || '';

const service = axios.create({
  baseURL,
  timeout: 60000,
  withCredentials: false,
});

service.interceptors.request.use(
  (config) => {
    config.params = {
      ...config.params,
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

service.interceptors.response.use((response) => {
  console.log(response);
  if (response.status !== 200) return Promise.reject(response.data);

  return response;
});

export const setHeader = () => {
  console.log('Setting headers....');
  console.log(JwtService.getToken());
  if (JwtService.getToken()) {
    console.log('Token found....');
    service.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${JwtService.getToken()}`;
  }
};

export const runGet = (resource: string) => {
  return service.get(resource).catch((error) => {
    throw new Error(`Api ${error}`);
  });
};

export const runPost = (
  resource: string,
  params: Record<string, any>,
  config?: AxiosRequestConfig | undefined
) => {
  return service.post(resource, params, config);
};

export default service;
