import axios, { AxiosRequestConfig } from 'axios';
// import API_URL from "./config";
import JwtService from './jwt';
import { routerPush } from '../router';
import { useStore } from 'vuex';
import { LOGOUT } from '../store/actions.type';
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

service.interceptors.response.use(
  (response) => {
    if (response.status !== 200) return Promise.reject(response.data);

    return response;
  },
  (error) => {
    console.log(error.response.status);
    if (error.response.status === 401) {
      //JwtService.destroyToken();
      const store = useStore();
      store.dispatch(LOGOUT);
      routerPush('home');
    }
  }
);

export const setHeader = () => {
  if (JwtService.getToken()) {
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
