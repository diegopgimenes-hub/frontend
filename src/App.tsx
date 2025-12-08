import { Navigate, Outlet, Route, Routes } from "react-router-dom";

import DashboardPage from "@/components/dashboard/DashboardPage";
import AppLayout from "@/components/layout/AppLayout";

import EmployeeCreate from "@/components/employees/EmployeeCreate";
import EmployeeEdit from "@/components/employees/EmployeeEdit";
import EmployeeList from "@/components/employees/EmployeeList";
import EmployeeShow from "@/components/employees/EmployeeShow";

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
                {/* 🏠 Dashboard */}
                <Route index element={<DashboardPage />} />

                {/* 👥 Funcionários */}
                <Route path="employees" element={<Outlet />}>
                  <Route index element={<EmployeeList />} />
                  <Route path="new" element={<EmployeeCreate />} />
                  <Route path=":id" element={<EmployeeShow />} />
                  <Route path=":id/edit" element={<EmployeeEdit />} />
                </Route>

                {/* 👤 Usuários */}
                <Route path="users" element={<Outlet />}>
                  <Route index element={<UserList />} />
                </Route>

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
