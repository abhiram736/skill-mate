import api from "./axiosConfig";

export const getMe = () => api.get("/users/me");

export const getUsers = () => api.get("/users");

export const getUser = (id) => api.get(`/users/${id}`);

export const updateProfile = (data) => api.put("/users/profile", data);
