import http, { AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from "axios";
import { type ClassConstructor, plainToInstance } from "class-transformer";
import { jwtDecode } from "jwt-decode";

import { refreshToken } from "@/services/auth";
import { useUserStore } from "@/stores/user.store";
import "@/utils/app";
import "@/utils/localstorage";

import { RestMetadata, RestResource } from "@/models";

export const axios = http.create({ withCredentials: true });

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers["X-Client-Name"] = window.location.APP_NAME().toUpperCase();
  config.headers["Authorization"] = `Bearer ${token ?? ""}`;
  config.headers["Access-Control-Allow-Headers"] = true;
  return config;
});

axios.interceptors.response.use(
  async (response) => {
    const { config, data } = response;
    const user = useUserStore();
    const resource: RestResource<unknown> = data;

    if (!resource.metadata) {
      return response;
    }

    // If response indicates unauthorized, try to refresh the token.
    if (resource.metadata.code === 401) {
      const refreshResponse = await refreshToken();
      const newToken = refreshResponse.response?.jwtToken;

      if (newToken) {
        localStorage.setItem("token", newToken);
        user.initUser();

        config.headers["Authorization"] = `Bearer ${newToken}`;
        return axios.request(config);
      }

      // Clear settings and redirect if token refresh fails.
      localStorage.clearExcludes("settings");

      // Redirect to login page
      window.location.href = import.meta.env.DEV
        ? `${import.meta.env.BASE_URL}/login`
        : "/login?r=" + import.meta.env.BASE_URL;
    }

    return response;
  },

  async (error) => {
    if (error instanceof AxiosError) {
      const config = error.config as InternalAxiosRequestConfig & { sent?: boolean };
      const user = useUserStore();

      // Attempt token refresh if unauthorized and request hasn't been retried yet.
      if (error.status === 401 && !config?.sent) {
        config.sent = true;
        try {
          const refreshResponse = await refreshToken();
          const newToken = refreshResponse.response?.jwtToken;
          if (newToken) {
            localStorage.setItem("token", newToken);
            user.initUser();

            config.headers["Authorization"] = `Bearer ${newToken}`;
            return axios.request(config);
          }
        } catch (refreshError) {
          console.error("Refresh token failed:", refreshError);
        }

        // Clear settings and redirect if token refresh fails.
        localStorage.clearExcludes("settings");

        // Redirect to login page
        window.location.href = import.meta.env.DEV
          ? `${import.meta.env.BASE_URL}/login`
          : "/login?r=" + import.meta.env.BASE_URL;
      }
    }

    return Promise.reject(error);
  }
);

/**
 * Get access token from local storage and refresh token if expired
 * @returns
 */
export async function getAccessToken() {
  const currentToken = localStorage.getItem("token");
  if (!currentToken) return "";

  const result = jwtDecode(currentToken);
  if (result.exp) {
    const exp = result.exp * 1000;
    const now = Date.now();
    if (now >= exp) {
      const r = await refreshToken();
      if (r.metadata.code !== 200) {
        return "";
      }
      localStorage.setItem("token", r.response.jwtToken);
      return r.response.jwtToken;
    }
  }

  return currentToken;
}

/**
 * Format axios response as RestResource<T> class
 * @param Model The class model
 * @param response Axios response
 * @returns
 */
export function formatResponse<T>(
  Model: ClassConstructor<T>,
  { data, status }: AxiosResponse<RestResource<T>, unknown>
): RestResource<T | null> {
  try {
    const response = plainToInstance<T, T>(Model, data.response);
    const metadata = plainToInstance(RestMetadata, data.metadata);
    return new RestResource(metadata, response);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const metadata = new RestMetadata(status, errorMessage, "error", Date.now());
    return new RestResource(metadata, null);
  }
}
