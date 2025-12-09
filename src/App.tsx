import { Navigate, Route, Routes } from "react-router-dom";

import HomePage from "@/components/home/HomePage";
import AppLayout from "@/components/layout/AppLayout";

import RoleList from "@/components/roles/RoleList";
import UserList from "@/components/users/UserList";

import ProtectedRoute from "@/components/routes/ProtectedRoute";
import { AuthProvider } from "@/context/AuthContext";
import { ColorModeProvider } from "@/context/ColorModeContext";

import { DialogsProvider } from "@/hooks/useDialogs/DialogsProvider";
import { NotificationsProvider } from "@/hooks/useNotifications/NotificationsProvider";

import LoginPage from "@/pages/LoginPage";

export default function App() {
  return (
    <ColorModeProvider>
      <DialogsProvider>
        <NotificationsProvider>
          <AuthProvider>
            <Routes>
              {/* 🔐 Rota pública de login */}
              <Route path="/login" element={<LoginPage />} />

              {/* 🔒 Rotas protegidas */}
              <Route
                path="/*"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<HomePage />} />

                <Route path="users" element={<UserList />} />
                <Route path="roles" element={<RoleList />} />

                {/* 🚦 Rota padrão */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Route>
            </Routes>
          </AuthProvider>
        </NotificationsProvider>
      </DialogsProvider>
    </ColorModeProvider>
  );
}
