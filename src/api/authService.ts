import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

export interface LoginRequest {
  username: string;
  password: string;
  rememberMe: boolean;
}

export interface User {
  id: number;
  username: string;
  email: string;
  roles: string[];
}

export async function login(req: LoginRequest): Promise<User> {
  const { data } = await axios.post(`${API_BASE_URL}/auth/login`, req, {
    withCredentials: true,
  });
  return data;
}

export async function logout(): Promise<void> {
  await axios.post(`${API_BASE_URL}/auth/logout`, {}, { withCredentials: true });
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/auth/me`, {
      withCredentials: true,
    });
    return data;
  } catch {
    return null;
  }
}
