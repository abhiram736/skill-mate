import api from "./axiosConfig";

export const getUsers = () => api.get("/users");

export const getUser = (id) =>
  API.get(`/users/${id}`);

export const updateProfile = (data) =>
  API.put("/users/profile", data);