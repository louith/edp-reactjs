import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 3000,
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   add more details as needed, e.g., timeout, headers, etc.
});

// API calls
export const getUsers = () => API.get("/users");

export const createUser = (data) => API.post("/users", data);

export const updateUser = (id, data) => API.put(`/users/${id}`, data);

export const patchUser = (id, data) => API.patch(`/users/${id}`, data);

export const deleteUser = (id) => API.delete(`/users/${id}`);
