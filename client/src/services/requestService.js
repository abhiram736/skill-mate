import api from "./axiosConfig";

export const sendRequest = (data) => api.post("/requests/send", data);