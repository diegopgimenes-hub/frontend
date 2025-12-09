// 📄 src/api/roleApi.ts
import api from "./axiosInstance";

export interface Role {
  id: number;
  name: string;
}

export interface UpsertRoleRequest {
  name: string;
}

const BASE_URL = "/admin/roles";

export async function getRoles(): Promise<Role[]> {
  const response = await api.get<Role[]>(BASE_URL);
  return response.data;
}

export async function getRole(id: number): Promise<Role> {
  const response = await api.get<Role>(`${BASE_URL}/${id}`);
  return response.data;
}

export async function createRole(payload: UpsertRoleRequest): Promise<Role> {
  const response = await api.post<Role>(BASE_URL, payload);
  return response.data;
}

export async function updateRole(id: number, payload: UpsertRoleRequest): Promise<Role> {
  const response = await api.put<Role>(`${BASE_URL}/${id}`, payload);
  return response.data;
}

export async function deleteRole(id: number): Promise<void> {
  await api.delete(`${BASE_URL}/${id}`);
}
