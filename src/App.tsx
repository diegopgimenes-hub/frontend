import { Navigate, Outlet, Route, Routes, useParams } from "react-router-dom";

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

// 🔹 Wrapper para garantir key dinâmica por ID na edição de usuários
function UserEditWrapper() {
  const { id } = useParams();
  return <UserEdit key={`user-edit-${id}`} />;
}

export default function App() {
  return (
    <ColorModeProvider>
      <DialogsProvider>
        <NotificationsProvider>
          <AuthProvider>
            <Routes>
              {/* 🔐 Login público */}
              <Route path="/login" element={<LoginPage />} />

              {/* 🔐 Rotas protegidas */}
              <Route
                path="/*"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                {/* 📊 Página inicial (dashboard) */}
                <Route index element={<DashboardPage />} />

                {/* 👥 Funcionários (CRUD completo) */}
                <Route path="employees" element={<Outlet />}>
                  <Route index element={<EmployeeList />} />
                  <Route path="new" element={<EmployeeCreate />} />
                  <Route path=":id" element={<EmployeeShow />} />
                  <Route path=":id/edit" element={<EmployeeEdit />} />
                </Route>

                {/* 👤 Usuários (com isolamento entre criar/editar) */}
                <Route path="users" element={<Outlet />}>
                  <Route index element={<UserList />} />
                  <Route path="new" element={<UserCreate key="user-create" />} />
                  <Route path=":id" element={<UserShow />} />
                  <Route path=":id/edit" element={<UserEditWrapper />} />
                </Route>

                {/* 🚦 Redirecionamento padrão */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Route>
            </Routes>
          </AuthProvider>
        </NotificationsProvider>
      </DialogsProvider>
    </ColorModeProvider>
  );
}
