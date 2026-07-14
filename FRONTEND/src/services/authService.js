import api from "./api";

export const registerUser = (data) => {
  return api.post("/auth/sign-up", data);
};

export const loginUser = (data) => {
  return api.post("/auth/sign-in", data);
};

export const logoutUser = () => {
  return api.post("/auth/sign-out");
};