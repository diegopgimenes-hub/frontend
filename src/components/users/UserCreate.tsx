import PageContainer from "@/components/common/PageContainer";
import AddIcon from "@mui/icons-material/Add";
import { Box } from "@mui/material";
import UserForm from "./UserForm";

export default function UserCreate() {
  // 🔹 Força a desmontagem completa do formulário ao acessar a rota
  return (
    <PageContainer
      key={window.location.pathname} // força o React a recriar o componente ao trocar de rota
      title="Novo Usuário"
      icon={<AddIcon />}
      breadcrumbs={[{ title: "Usuários", path: "/users" }, { title: "Novo" }]}
    >
      <Box sx={{ maxWidth: 600, mx: "auto", mt: 2 }}>
        {/* 🔑 Formulário completamente isolado — sempre novo */}
        <UserForm key="user-form-create" />
      </Box>
    </PageContainer>
  );
}
