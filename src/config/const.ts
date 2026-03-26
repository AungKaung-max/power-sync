export const Envs = {
  VITE_GOOGLE_MAPS_API_KEY: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  VITE_CLIENT_ID: import.meta.env.VITE_CLIENT_ID,
  VITE_CLIENT_SECRET: import.meta.env.VITE_CLIENT_SECRET,
  VITE_AUTH_URL: import.meta.env.VITE_AUTH_URL,
  VITE_TOKEN_URL: import.meta.env.VITE_TOKEN_URL,
  VITE_API_URL : import.meta.env.VITE_API_URL
};

export const ENCRYPT_KEY = import.meta.env.VITE_ENCRYPT_KEY ?? "Default";
