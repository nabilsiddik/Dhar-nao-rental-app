import Cookies from "js-cookie";

const TOKEN_KEY = "token";

export const setAuthToken = (token: string) => {
  if (!token) return;
  Cookies.set(TOKEN_KEY, token, {
    expires: 7,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
};

export const removeAuthToken = () => {
  Cookies.remove(TOKEN_KEY);
};

export const getAuthToken = () => Cookies.get(TOKEN_KEY);
