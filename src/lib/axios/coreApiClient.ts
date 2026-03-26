
import { useAuthStore } from "@/stores/auth.store";
import axios from "axios";
import { Envs } from "@/config/const";
import { requestToken } from "@/services/auth";

export const coreApiClient = axios.create({
  baseURL: Envs.VITE_API_URL,
});

coreApiClient.interceptors.request.use((config) => {
  const accessToken = useAuthStore.getState().accessToken;
  config.headers["Content-Type"] = "application/json";
  if (accessToken) {
    config.headers["access-token"] = accessToken; // <-- Use "access-token" header
    // If Authorization header is present, remove it.
    if ("Authorization" in config.headers) {
      delete config.headers.Authorization;
    }
  }
  return config;
});

coreApiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      originalRequest._retry = true;
      try {
        const token = useAuthStore.getState().accessToken;
        if (!token) {
          useAuthStore.getState().setAccessToken(null);
          throw new Error("No token");
        }
        const accessToken = await requestToken();
        useAuthStore.getState().setAccessToken(accessToken);
        originalRequest.headers["access-token"] = accessToken;
        if ("Authorization" in originalRequest.headers) {
          delete originalRequest.headers.Authorization;
        }
        return coreApiClient(originalRequest);
      } catch (tokenError) {
        return Promise.reject(tokenError);
      }
    }
    return Promise.reject(error);
  },
);
