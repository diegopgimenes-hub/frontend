import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// ===============================
// 📘 Tipos
// ===============================
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

// ===============================
// 👤 Users API
// ===============================
export async function getUsers(): Promise<User[]> {
  const res = await api.get<User[]>("/admin/users");
  return res.data;
}

export async function getUserById(id: number): Promise<User> {
  const res = await api.get<User>(`/admin/users/${id}`);
  return res.data;
}

export async function createUser(user: CreateUserRequest): Promise<User> {
  const res = await api.post<User>("/admin/users", user);
  return res.data;
}

export async function updateUser(id: number, user: UpdateUserRequest): Promise<User> {
  const res = await api.put<User>(`/admin/users/${id}`, user);
  return res.data;
}

export async function deleteUser(id: number): Promise<void> {
  await api.delete(`/admin/users/${id}`);
}

export async function getRoles(): Promise<Role[]> {
  const res = await api.get<Role[]>("/admin/roles");
  return res.data;
}

// ===============================
// ✅ Export padrão e nomeado
// ===============================
export default {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getRoles,
};
