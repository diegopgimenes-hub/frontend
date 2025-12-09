// 📄 src/api/userApi.ts
import api from "./axiosInstance";

export interface User {
  id: number;
  username: string;
  email: string;
  enabled: boolean;
  createdAt: string;
  roles: string[];
}

export interface UpsertUserRequest {
  username: string;
  email: string;
  password?: string;
  enabled?: boolean;
  roles?: string[];
}

const BASE_URL = "/admin/users";

export async function getUsers(): Promise<User[]> {
  const response = await api.get<User[]>(BASE_URL);
  return response.data;
}

export async function getUser(id: number): Promise<User> {
  const response = await api.get<User>(`${BASE_URL}/${id}`);
  return response.data;
}

export async function createUser(payload: UpsertUserRequest): Promise<User> {
  const response = await api.post<User>(BASE_URL, payload);
  return response.data;
}

export async function updateUser(id: number, payload: UpsertUserRequest): Promise<User> {
  const response = await api.put<User>(`${BASE_URL}/${id}`, payload);
  return response.data;
}

export async function deleteUser(id: number): Promise<void> {
  await api.delete(`${BASE_URL}/${id}`);
}
