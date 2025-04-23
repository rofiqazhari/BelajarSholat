import { axios } from "@/plugins/axios";

import { RestResource } from "@/models";
import type { TResponseLogin, TResponseLoginExternal, TResponseRefresh } from "@/types";

const BASE_URL = `${import.meta.env.VITE_AUTH_ENDPOINT}`;

export const login = async (username: string, password: string): Promise<TResponseLogin> => {
  const url = `${BASE_URL}/v1/users/authenticate`;

  const { data } = await axios.post<RestResource<TResponseLogin>>(url, {
    bearer: "database",
    username,
    password,
  });

  if (data.metadata.code !== 200) throw new Error(data.metadata.message);

  return data.response;
};

export const loginScope = async (
  username: string,
  password: string
): Promise<TResponseLoginExternal> => {
  const scope = "SCOPE_APP_NAME";

  const url = `${BASE_URL}/v1/users/authenticate/${scope}`;

  const { data } = await axios.post<RestResource<TResponseLoginExternal>>(url, {
    bearer: "database",
    username,
    password,
  });

  if (data.metadata.code !== 200) throw new Error(data.metadata.message);

  return data.response;
};

export const refreshToken = async (): Promise<RestResource<TResponseRefresh>> => {
  const url = `${BASE_URL}/v2/users/refresh`;
  const { data } = await axios.post<RestResource<TResponseRefresh>>(url);
  return data;
};

export const logout = async () => {
  const url = `${BASE_URL}/v2/users/revoke`;
  await axios.post(url, {
    token: null,
  });
};
