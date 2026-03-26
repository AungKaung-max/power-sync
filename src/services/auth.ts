import { Envs } from "@/config/const";
import { authApiClient } from "@/lib/axios/authApiClient";

export const requestToken = async () => {
  // Make body with client_id and client_secret as x-www-form-urlencoded
  const formData = new URLSearchParams();
  formData.append("client_id", Envs.VITE_CLIENT_ID);
  formData.append("client_secret", Envs.VITE_CLIENT_SECRET);
  formData.append("grant_type", "client_credentials");

  const response = await authApiClient.post("/oauth2/token", formData);
  return response.data.access_token;
};