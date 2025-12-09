import axios from "axios";

export interface Role {
  id: number;
  name: string;
}

export interface UpsertRoleRequest {
  name: string;
}

const BASE_URL = "/admin/roles";

export async function getRoles(): Promise<Role[]> {
  const { data } = await axios.get<Role[]>(BASE_URL);
  return data;
}

export async function getRole(id: number): Promise<Role> {
  const { data } = await axios.get<Role>(`${BASE_URL}/${id}`);
  return data;
}

export async function createRole(payload: UpsertRoleRequest): Promise<Role> {
  const { data } = await axios.post<Role>(BASE_URL, payload);
  return data;
}

export async function updateRole(id: number, payload: UpsertRoleRequest): Promise<Role> {
  const { data } = await axios.put<Role>(`${BASE_URL}/${id}`, payload);
  return data;
}

export async function deleteRole(id: number): Promise<void> {
  await axios.delete(`${BASE_URL}/${id}`);
}
