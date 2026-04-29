import api from "./api";

// ✅ LOGIN
export const loginUser = (data) => api.post("/login", data);

// ✅ GET USERS (admin)
export const getUsers = () => api.get("/users");

// ✅ CREATE EMPLOYEE
export const createEmployee = (data) =>
  api.post("/create-employee", data);

// ✅ DELETE USER
export const deleteUser = (id) =>
  api.delete(`/user/${id}`);