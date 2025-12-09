// 📄 src/api/authService.ts
import api from "./axiosInstance";

export interface LoginRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  type?: string; // ex: "Bearer"
  username?: string;
  roles?: string[];
}

export interface CurrentUser {
  id: number;
  username: string;
  email: string;
  roles: string[];
  enabled: boolean;
}

// ====================== LOGIN ======================
export async function login(credentials: LoginRequest): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>("/auth/login", credentials);
  const data = response.data;

  // 💾 salva o token no localStorage
  if (data?.token) {
    localStorage.setItem("token", data.token);
  }

  return data;
}

// ====================== LOGOUT ======================
export function logout(): void {
  localStorage.removeItem("token");
  // opcional: chame endpoint de logout do backend, se existir
  // await api.post("/auth/logout");
}

// ====================== GET USER INFO ======================
export async function getCurrentUser(): Promise<CurrentUser> {
  const response = await api.get<CurrentUser>("/auth/me");
  return response.data;
}

// ====================== TOKEN HANDLING ======================
export function getToken(): string | null {
  return localStorage.getItem("token");
}

// ====================== AXIOS INTERCEPTOR ======================
// Aplica o token automaticamente em todas as requisições
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default {
  login,
  logout,
  getCurrentUser,
  getToken,
};
