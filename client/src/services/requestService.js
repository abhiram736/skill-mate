import api from "./axiosConfig";

export const sendRequest = (data) => api.post("/requests/send", data);

export const getRequests = () => api.get("/requests");

export const acceptRequest = (id) => api.put(`/requests/${id}/accept`);

export const rejectRequest = (id) => api.put(`/requests/${id}/reject`);
