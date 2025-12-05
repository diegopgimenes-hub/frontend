import { Navigate, Route, Routes } from "react-router-dom";

import DashboardPage from "@/components/dashboard/DashboardPage";
import AppLayout from "@/components/layout/AppLayout";

import EmployeeCreate from "@/components/employees/EmployeeCreate";
import EmployeeEdit from "@/components/employees/EmployeeEdit";
import EmployeeList from "@/components/employees/EmployeeList";
import EmployeeShow from "@/components/employees/EmployeeShow";

import UserCreate from "@/components/users/UserCreate";
import UserEdit from "@/components/users/UserEdit";
import UserList from "@/components/users/UserList";
import UserShow from "@/components/users/UserShow";

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
              {/* 🔓 Rota pública de login */}
              <Route path="/login" element={<LoginPage />} />

              {/* 🔒 Rotas protegidas com layout principal */}
              <Route
                path="/*"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                {/* Página inicial (dashboard) */}
                <Route index element={<DashboardPage />} />

                {/* Employees CRUD */}
                <Route path="employees">
                  <Route index element={<EmployeeList />} />
                  <Route path="new" element={<EmployeeCreate />} />
                  <Route path=":id" element={<EmployeeShow />} />
                  <Route path=":id/edit" element={<EmployeeEdit />} />
                </Route>

                {/* Users CRUD */}
                <Route path="users">
                  <Route index element={<UserList />} />
                  <Route path="new" element={<UserCreate />} />
                  <Route path=":id" element={<UserShow />} />
                  <Route path=":id/edit" element={<UserEdit />} />
                </Route>
              </Route>

              {/* Redireciona rotas desconhecidas */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AuthProvider>
        </NotificationsProvider>
      </DialogsProvider>
    </ColorModeProvider>
  );
}
