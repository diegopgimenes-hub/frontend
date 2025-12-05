import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// ============================
// 📘 Tipos
// ============================
export interface User {
  id: number;
  username: string;
  email: string;
  enabled: boolean;
  createdAt: string;
  roles: string[];
}

export interface CreateUserRequest {
  username: string;
  email: string;
  password: string;
  enabled?: boolean;
  roles?: string[];
}

export interface UpdateUserRequest {
  username?: string;
  email?: string;
  password?: string;
  enabled?: boolean;
  roles?: string[];
}

export interface Role {
  id: number;
  name: string;
}

// ============================
// 🧩 Users CRUD
// ============================

export async function getUsers(): Promise<User[]> {
  const res = await api.get("/admin/users");
  return res.data;
}

export async function getUser(id: number): Promise<User> {
  const res = await api.get(`/admin/users/${id}`);
  return res.data;
}

export async function createUser(user: CreateUserRequest): Promise<User> {
  const res = await api.post("/admin/users", user);
  return res.data;
}

export async function updateUser(id: number, user: UpdateUserRequest): Promise<User> {
  const res = await api.put(`/admin/users/${id}`, user);
  return res.data;
}

export async function deleteUser(id: number): Promise<void> {
  await api.delete(`/admin/users/${id}`);
}

// ============================
// 🧩 Roles API (restaurado)
// ============================

export async function getRoles(): Promise<Role[]> {
  const res = await api.get("/admin/roles");
  return res.data;
}

// ============================
// ✅ Export default para conveniência
// ============================
export default {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getRoles,
};
